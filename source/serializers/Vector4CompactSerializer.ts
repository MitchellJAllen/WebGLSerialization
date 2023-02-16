class Vector4CompactSerializer extends IntegerSerializer<Vector4> {
	public constructor(isNormalized: boolean, isSigned: boolean) {
		super(isNormalized, isSigned);
	}

	public read(dataView: DataView, byteOffset: number): Vector4 {
		let bits = dataView.getUint32(byteOffset, true);
		let valueMask = 0x3FF;

		let x = (bits >>> 0) & valueMask;
		let y = (bits >>> 10) & valueMask;
		let z = (bits >>> 20) & valueMask;
		let w = bits >>> 30;

		if (this.isNormalized) {
			if (this.isSigned) {
				x = this.intToFloat(x, 10);
				y = this.intToFloat(y, 10);
				z = this.intToFloat(z, 10);
				w = this.intToFloat(w, 2);
			}
			else {
				x = this.uintToFloat(x, 10);
				y = this.uintToFloat(y, 10);
				z = this.uintToFloat(z, 10);
				w = this.uintToFloat(w, 2);
			}
		}
		else if (this.isSigned) {
			// handle non-normalized, signed reads
			if (x >= 512) {
				x -= 1024;
			}

			if (y >= 512) {
				y -= 1024;
			}

			if (z >= 512) {
				z -= 1024;
			}

			if (w >= 2) {
				w -= 4;
			}
		}

		return new Vector4(x, y, z, w);
	}

	public write(dataView: DataView, byteOffset: number, value: Vector4): void {
		let x = value.x;
		let y = value.y;
		let z = value.z;
		let w = value.w;

		if (this.isNormalized) {
			if (this.isSigned) {
				x = this.floatToInt(x, 10);
				y = this.floatToInt(y, 10);
				z = this.floatToInt(z, 10);
				w = this.floatToInt(w, 2);
			}
			else {
				x = this.floatToUint(x, 10);
				y = this.floatToUint(y, 10);
				z = this.floatToUint(z, 10);
				w = this.floatToUint(w, 2);
			}
		}

		let bits = (x << 0) | (y << 10) | (z << 20) | (w << 30);

		dataView.setUint32(byteOffset, bits, true);
	}

	public getByteLength(): number {
		return 4;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		return [
			new AttributeDescription(
				true, this.isNormalized, this.isSigned, 4, 10, 0
			)
		];
	}
}
