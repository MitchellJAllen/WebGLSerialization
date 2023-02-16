class ByteSerializer extends IntegerSerializer<number> {
	public constructor(isNormalized: boolean, isSigned: boolean) {
		super(isNormalized, isSigned);
	}

	public read(dataView: DataView, byteOffset: number): number {
		let value = dataView.getUint8(byteOffset);

		if (this.isNormalized) {
			if (this.isSigned) {
				value = this.intToFloat(value, 8);
			}
			else {
				value = this.uintToFloat(value, 8);
			}
		}
		else if (this.isSigned) {
			// handle non-normalized, signed reads
			value = dataView.getInt8(byteOffset);
		}

		return value;
	}

	public write(dataView: DataView, byteOffset: number, value: number): void {
		if (this.isNormalized) {
			if (this.isSigned) {
				value = this.floatToInt(value, 8);
			}
			else {
				value = this.floatToUint(value, 8);
			}
		}

		dataView.setUint8(byteOffset, value);
	}

	public getByteLength(): number {
		return 1;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		return [
			new AttributeDescription(
				true, this.isNormalized, this.isSigned, 1, 8, 0
			)
		];
	}
}
