class Vector2Serializer implements Serializer<Vector2> {
	private componentSerializer: Serializer<number>;
	private componentSize: number;

	public constructor(componentSerializer: Serializer<number>) {
		this.componentSerializer = componentSerializer;
		this.componentSize = componentSerializer.getByteLength();
	}

	public read(dataView: DataView, byteOffset: number): Vector2 {
		let x = this.componentSerializer.read(dataView, byteOffset);
		byteOffset += this.componentSize;

		let y = this.componentSerializer.read(dataView, byteOffset);

		return new Vector2(x, y);
	}

	public write(dataView: DataView, byteOffset: number, value: Vector2): void {
		this.componentSerializer.write(dataView, byteOffset, value.x);
		byteOffset += this.componentSize;

		this.componentSerializer.write(dataView, byteOffset, value.y);
	}

	public getByteLength(): number {
		return 2 * this.componentSize;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		let attributeDescriptions = (
			this.componentSerializer.getAttributeDescriptions()
		);

		// change size for Vector2
		attributeDescriptions[0].size = 2;

		return attributeDescriptions;
	}
}
