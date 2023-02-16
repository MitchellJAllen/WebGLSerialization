class FloatSerializer implements Serializer<number> {
	public read(dataView: DataView, byteOffset: number): number {
		return dataView.getFloat32(byteOffset, true);
	}

	public write(dataView: DataView, byteOffset: number, value: number): void {
		dataView.setFloat32(byteOffset, value, true);
	}

	public getByteLength(): number {
		return 4;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		return [
			new AttributeDescription(false, false, true, 1, 32, 0)
		];
	}
}
