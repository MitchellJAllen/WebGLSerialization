class AttributeDescription {
	public constructor(
		public isInteger: boolean,
		public isNormalized: boolean,
		public isSigned: boolean,
		public size: number,
		public bitsPerComponent: 8 | 10 | 16 | 32,
		public offset: number
	) {
	}
}
