class CompositeEntry<BaseType, EntryType> {
	public constructor(
		public serializer: Serializer<EntryType>,
		public readLambda: (value: BaseType, readValue: EntryType) => void,
		public writeLambda: (value: BaseType) => EntryType
	) {
	}
}
