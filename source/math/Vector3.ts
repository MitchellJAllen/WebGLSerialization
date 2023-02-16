class Vector3 extends Vector {
	public constructor(
		public x: number,
		public y: number,
		public z: number
	) {
		super();
	}

	// implemented methods

	public add(vector: Vector3): Vector3 {
		return new Vector3(
			this.x + vector.x, this.y + vector.y, this.z + vector.z
		);
	}

	public scale(scalar: number): Vector3 {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
	}

	public dot(vector: Vector3): number {
		return (this.x * vector.x + this.y * vector.y + this.z * vector.z);
	}

	public toString(): string {
		return `<${this.x}, ${this.y}, ${this.z}>`;
	}

	// covariant signatures

	public subtract(vector: Vector3): Vector3 {
		return super.subtract(vector) as Vector3;
	}

	public normalize(): Vector3 {
		return super.normalize() as Vector3;
	}

	// unique methods

	public cross(vector: Vector3): Vector3 {
		return new Vector3(
			this.y * vector.z - this.z * vector.y,
			this.z * vector.x - this.x * vector.z,
			this.x * vector.y - this.y * vector.x
		);
	}

	// static methods

	public static randomUnit(): Vector3 {
		return new Vector3(
			Vector.randomGauss(), Vector.randomGauss(), Vector.randomGauss()
		).normalize();
	}
}
