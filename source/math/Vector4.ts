class Vector4 extends Vector {
	public constructor(
		public x: number,
		public y: number,
		public z: number,
		public w: number
	) {
		super();
	}

	// implemented methods

	public add(vector: Vector4): Vector4 {
		return new Vector4(
			this.x + vector.x, this.y + vector.y, this.z + vector.z,
			this.w + vector.w
		);
	}

	public scale(scalar: number): Vector4 {
		return new Vector4(
			this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar
		);
	}

	public dot(vector: Vector4): number {
		return (
			this.x * vector.x + this.y * vector.y + this.z * vector.z +
			this.w * vector.w
		);
	}

	public toString(): string {
		return `<${this.x}, ${this.y}, ${this.z}, ${this.w}>`;
	}

	// covariant signatures

	public subtract(vector: Vector4): Vector4 {
		return super.subtract(vector) as Vector4;
	}

	public normalize(): Vector4 {
		return super.normalize() as Vector4;
	}

	// static methods

	public static randomUnit(): Vector4 {
		return new Vector4(
			Vector.randomGauss(), Vector.randomGauss(), Vector.randomGauss(),
			Vector.randomGauss()
		).normalize();
	}
}
