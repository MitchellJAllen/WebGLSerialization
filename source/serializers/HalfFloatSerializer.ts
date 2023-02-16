class HalfFloatSerializer implements Serializer<number> {
	public read(dataView: DataView, byteOffset: number): number {
		return this.halfToFloat(dataView.getUint16(byteOffset, true));
	}

	public write(dataView: DataView, byteOffset: number, value: number): void {
		dataView.setUint16(byteOffset, this.floatToHalf(value), true);
	}

	public getByteLength(): number {
		return 2;
	}

	public getAttributeDescriptions(): AttributeDescription[] {
		return [
			new AttributeDescription(false, false, true, 1, 16, 0)
		];
	}

	protected halfToFloat(bits: number): number {
		let sign = (bits & 0x8000) >>> 15;
		let exponent = (bits & 0x7C00) >>> 10;
		let fraction = bits & 0x03FF;

		let signValue = 1;

		if (sign == 1) {
			signValue = -1;
		}

		// handle NaN and Infinity
		if (exponent == 31) {
			if (fraction != 0) {
				return NaN;
			}

			return signValue * Infinity;
		}

		let normalizedFraction = fraction / (1 << 10);

		// handle zero and subnormal numbers
		if (exponent == 0) {
			if (fraction == 0) {
				return signValue * 0;
			}

			return signValue * normalizedFraction / (1 << 14);
		}

		return signValue * (1 + normalizedFraction) * 2 ** (exponent - 15);
	}

	// see: // https://stackoverflow.com/questions/32633585/how-do-you-convert-to-half-floats-in-javascript
	protected floatToHalf(value: number): number {
		let bitsWrite = new Float32Array([value]);
		let inputBits = new Uint32Array(bitsWrite.buffer)[0];

		// start with sign from input
		let outputBits = (inputBits >>> 16) & 0x8000;

		let exponent = (inputBits >>> 23) & 0xFF;
		let fraction = (inputBits >>> 12) & 0x7FF;

		// too small for 16-bit representation
		if (exponent < 103) {
			return outputBits;
		}

		// NaN, Infinity, or too big for 16-bit representation
		if (exponent > 142) {
			// set maximum exponent
			outputBits |= 0x7C00;

			// NaN or Infinity, look for non-zero fraction bits
			if (exponent == 255) {
				// handle NaN
				if ((inputBits & 0x007FFFFF) != 0) {
					outputBits |= 0x0200;
				}
			}

			return outputBits;
		}

		// subnormal numbers possible in 16-bit representation
		if (exponent < 113) {
			fraction |= 0x0800;

			let term = (fraction >>> (114 - exponent));
			term += ((fraction >>> (113 - exponent)) & 1);

			outputBits |= term;

			return outputBits;
		}

		outputBits |= ((exponent - 112) << 10) | (fraction >>> 1);
		outputBits += fraction & 1;

		return outputBits;
	}
}
