class Vector3Serializer implements Serializer<Vector3> {
	private componentSerializer: Serializer<number>;
	private componentSize: number;

	public constructor(componentSerializer: Serializer<number>) {
		this.componentSerializer = componentSerializer;
		this.componentSize = componentSerializer.getByteLength();
	}

	public read(dataView: DataView, byteOffset: number): Vector3 {
		let x = this.componentSerializer.read(dataView, byteOffset);
		byteOffset += this.componentSize;

		let y = this.componentSerializer.read(dataView, byteOffset);
		byteOffset += this.componentSize;

		let z = this.componentSerializer.read(dataView, byteOffset);

		return new Vector3(x, y, z);
	}

	public write(dataView: DataView, byteOffset: number, value: Vector3): void {
		this.componentSerializer.write(dataView, byteOffset, value.x);
		byteOffset += this.componentSize;

		this.componentSerializer.write(dataView, byteOffset, value.y);
		byteOffset += this.componentSize;

		this.componentSerializer.write(dataView, byteOffset, value.z);
	}

	public getByteLength(): number {
		return 3 * this.componentSize;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		let attributeDescriptions = (
			this.componentSerializer.getAttributeDescriptions()
		);

		// change size for Vector3
		attributeDescriptions[0].size = 3;

		return attributeDescriptions;
	}
}
