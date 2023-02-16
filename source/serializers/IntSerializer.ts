class IntSerializer extends IntegerSerializer<number> {
	public constructor(isNormalized: boolean, isSigned: boolean) {
		super(isNormalized, isSigned);
	}

	public read(dataView: DataView, byteOffset: number): number {
		let value = dataView.getUint32(byteOffset, true);

		if (this.isNormalized) {
			// TODO: handle normalization properly
			value = value;
		}
		else if (this.isSigned) {
			// handle non-normalized, signed reads
			value = dataView.getInt32(byteOffset, true);
		}

		return value;
	}

	public write(dataView: DataView, byteOffset: number, value: number): void {
		if (this.isNormalized) {
			// TODO: handle normalization properly
			value = value;
		}

		dataView.setUint32(byteOffset, value, true);
	}

	public getByteLength(): number {
		return 4;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		return [
			new AttributeDescription(
				true, this.isNormalized, this.isSigned, 1, 32, 0
			)
		];
	}
}
