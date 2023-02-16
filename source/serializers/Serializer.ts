interface Serializer<Type> {
	read(dataView: DataView, byteOffset: number): Type;
	write(dataView: DataView, byteOffset: number, value: Type): void;

	getByteLength(): number;
	getAttributeDescriptions(): AttributeDescription[];
}
