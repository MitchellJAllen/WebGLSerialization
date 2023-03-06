abstract class CompositeSerializer<Type> implements Serializer<Type> {
	private entries: CompositeEntry<Type, any>[];
	private typeConstructor: new () => Type;

	public constructor(typeConstructor: new () => Type) {
		this.entries = [];
		this.typeConstructor = typeConstructor;
	}

	protected addCompositeEntry(entry: CompositeEntry<Type, any>): void {
		this.entries.push(entry);
	}

	public read(dataView: DataView, byteOffset: number): Type {
		let value = new this.typeConstructor();

		for (let entry of this.entries) {
			let readValue = entry.serializer.read(dataView, byteOffset);

			entry.readLambda(value, readValue);

			byteOffset += entry.serializer.getByteLength();
		}

		return value;
	}

	public write(dataView: DataView, byteOffset: number, value: Type): void {
		for (let entry of this.entries) {
			let writeValue = entry.writeLambda(value);

			entry.serializer.write(dataView, byteOffset, writeValue);

			byteOffset += entry.serializer.getByteLength();
		}
	}

	public getByteLength(): number {
		let byteLength = 0;

		for (let entry of this.entries) {
			byteLength += entry.serializer.getByteLength();
		}

		return byteLength;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		let descriptions: AttributeDescription[] = [];

		for (let entry of this.entries) {
			descriptions = descriptions.concat(
				entry.serializer.getAttributeDescriptions()
			);
		}

		return descriptions;
	}
}
