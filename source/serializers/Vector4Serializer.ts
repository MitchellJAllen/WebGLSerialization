class Vector4Serializer implements Serializer<Vector4> {
	private componentSerializer: Serializer<number>;
	private componentSize: number;

	public constructor(componentSerializer: Serializer<number>) {
		this.componentSerializer = componentSerializer;
		this.componentSize = componentSerializer.getByteLength();
	}

	public read(dataView: DataView, byteOffset: number): Vector4 {
		let x = this.componentSerializer.read(dataView, byteOffset);
		byteOffset += this.componentSize;

		let y = this.componentSerializer.read(dataView, byteOffset);
		byteOffset += this.componentSize;

		let z = this.componentSerializer.read(dataView, byteOffset);
		byteOffset += this.componentSize;

		let w = this.componentSerializer.read(dataView, byteOffset);

		return new Vector4(x, y, z, w);
	}

	public write(dataView: DataView, byteOffset: number, value: Vector4): void {
		this.componentSerializer.write(dataView, byteOffset, value.x);
		byteOffset += this.componentSize;

		this.componentSerializer.write(dataView, byteOffset, value.y);
		byteOffset += this.componentSize;

		this.componentSerializer.write(dataView, byteOffset, value.z);
		byteOffset += this.componentSize;

		this.componentSerializer.write(dataView, byteOffset, value.w);
	}

	public getByteLength(): number {
		return 4 * this.componentSize;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		let attributeDescriptions = (
			this.componentSerializer.getAttributeDescriptions()
		);

		// change size for Vector4
		attributeDescriptions[0].size = 4;

		return attributeDescriptions;
	}
}
