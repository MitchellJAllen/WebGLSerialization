class IntSerializer extends IntegerSerializer<number> {
	public constructor(isNormalized: boolean, isSigned: boolean) {
		super(isNormalized, isSigned);
	}

	public read(dataView: DataView, byteOffset: number): number {
		let value = dataView.getUint32(byteOffset, true);

		if (this.isNormalized) {
			if (this.isSigned) {
				value = this.intToFloat(value, 32);
			}
			else {
				value = this.uintToFloat(value, 32);
			}
		}
		else if (this.isSigned) {
			// handle non-normalized, signed reads
			value = dataView.getInt32(byteOffset, true);
		}

		return value;
	}

	public write(dataView: DataView, byteOffset: number, value: number): void {
		if (this.isNormalized) {
			if (this.isSigned) {
				value = this.floatToInt(value, 32);
			}
			else {
				value = this.floatToUint(value, 32);
			}
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
