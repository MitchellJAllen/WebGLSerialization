abstract class IntegerSerializer<Type> implements Serializer<Type> {
	protected isNormalized: boolean;
	protected isSigned: boolean;

	public constructor(isNormalized: boolean, isSigned: boolean) {
		this.isNormalized = isNormalized;
		this.isSigned = isSigned;
	}

	public abstract read(dataView: DataView, byteOffset: number): Type;

	public abstract write(
		dataView: DataView, byteOffset: number, value: Type
	): void;

	public abstract getByteLength(): number;

	public abstract getAttributeDescriptions(): AttributeDescription[];

	protected uintToFloat(value: number, bits: number): number {
		value = Math.trunc(value);
		bits = Math.trunc(bits);

		let bitValueCount = 2 ** (bits);

		return (value / (bitValueCount - 1));
	}

	protected floatToUint(value: number, bits: number): number {
		bits = Math.trunc(bits);

		let binCount = 2 ** (bits + 1) - 2;

		let binId = Math.trunc(
			Math.max(0, Math.min(binCount - 1, value * binCount))
		);

		return Math.trunc((binId + 1) / 2);
	}

	protected intToFloat(value: number, bits: number): number {
		value = Math.trunc(value);
		bits = Math.trunc(bits);

		let bitValueCount = 2 ** (bits);
		let halfValueCount = 2 ** (bits - 1);

		let shiftedValue = (value + halfValueCount) % bitValueCount;
		let intValue = shiftedValue - halfValueCount;

		return Math.max(-1.0, intValue / (halfValueCount - 1));
	}

	protected floatToInt(value: number, bits: number): number {
		bits = Math.trunc(bits);

		let binCount = 2 ** (bits + 1) - 4;
		let halfBinCount = 2 ** (bits) - 2;

		let binId = Math.trunc(
			Math.max(0, Math.min(binCount - 1, (value / 2 + 0.5) * binCount))
		);

		let shuffledBinId = (binId + halfBinCount + 1) % binCount;

		shuffledBinId += Math.trunc(4 * Number(shuffledBinId > halfBinCount));

		return Math.trunc(shuffledBinId / 2);
	}
}
