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
		value |= 0;
		bits |= 0;

		let bitValueCount = 1 << bits;

		return (value / (bitValueCount - 1));
	}

	protected floatToUint(value: number, bits: number): number {
		bits |= 0;

		let binCount = (2 << bits) - 2;

		let binId = Math.max(0, Math.min(binCount - 1, value * binCount)) | 0;

		return ((binId + 1) / 2 | 0);
	}

	protected intToFloat(value: number, bits: number): number {
		value |= 0;
		bits |= 0;

		let bitValueCount = 1 << bits;
		let halfValueCount = 1 << (bits - 1);

		let shiftedValue = (value + halfValueCount) % bitValueCount;
		let intValue = shiftedValue - halfValueCount;

		return Math.max(-1.0, intValue / (halfValueCount - 1));
	}

	protected floatToInt(value: number, bits: number): number {
		bits |= 0;

		let binCount = (2 << bits) - 4;
		let halfBinCount = (1 << bits) - 2;

		let binId = Math.max(0, Math.min(binCount - 1,
			(value / 2 + 0.5) * binCount
		)) | 0;

		let shuffledBinId = (binId + halfBinCount + 1) % binCount;

		shuffledBinId += 4 * Number(shuffledBinId > halfBinCount) | 0;

		return (shuffledBinId / 2 | 0);
	}
}
