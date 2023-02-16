class DataBuffer<Type> {
	private serializer: Serializer<Type>;
	private length: number;
	private data: DataView;

	public constructor(length: number, serializer: Serializer<Type>) {
		this.length = length;
		this.serializer = serializer;

		this.data = new DataView(
			new ArrayBuffer(length * serializer.getByteLength())
		);
	}

	public get(index: number): Type {
		let byteOffset = index * this.serializer.getByteLength();

		return this.serializer.read(this.data, byteOffset);
	}

	public set(index: number, value: Type): void {
		let byteOffset = index * this.serializer.getByteLength();

		this.serializer.write(this.data, byteOffset, value);
	}

	public getLength(): number {
		return this.length;
	}

	public getBuffer(): ArrayBuffer {
		return this.data.buffer;
	}
}
