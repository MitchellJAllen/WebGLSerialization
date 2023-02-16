class ShortSerializer extends IntegerSerializer<number> {
	public constructor(isNormalized: boolean, isSigned: boolean) {
		super(isNormalized, isSigned);
	}

	public read(dataView: DataView, byteOffset: number): number {
		let value = dataView.getUint16(byteOffset, true);

		if (this.isNormalized) {
			if (this.isSigned) {
				value = this.intToFloat(value, 16);
			}
			else {
				value = this.uintToFloat(value, 16);
			}
		}
		else if (this.isSigned) {
			// handle non-normalized, signed reads
			value = dataView.getInt16(byteOffset, true);
		}

		return value;
	}

	public write(dataView: DataView, byteOffset: number, value: number): void {
		if (this.isNormalized) {
			if (this.isSigned) {
				value = this.floatToInt(value, 16);
			}
			else {
				value = this.floatToUint(value, 16);
			}
		}

		dataView.setUint16(byteOffset, value, true);
	}

	public getByteLength(): number {
		return 2;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		return [
			new AttributeDescription(
				true, this.isNormalized, this.isSigned, 1, 16, 0
			)
		];
	}
}
