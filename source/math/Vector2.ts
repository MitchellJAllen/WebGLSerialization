class Vector2 extends Vector {
	public constructor(
		public x: number,
		public y: number
	) {
		super();
	}

	// implemented methods

	public add(vector: Vector2): Vector2 {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

	public scale(scalar: number): Vector2 {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	public dot(vector: Vector2): number {
		return (this.x * vector.x + this.y * vector.y);
	}

	public toString(): string {
		return `<${this.x}, ${this.y}>`;
	}

	// covariant signatures

	public subtract(vector: Vector2): Vector2 {
		return super.subtract(vector) as Vector2;
	}

	public normalize(): Vector2 {
		return super.normalize() as Vector2;
	}

	// static methods

	public static randomUnit(): Vector2 {
		return new Vector2(
			Vector.randomGauss(), Vector.randomGauss()
		).normalize();
	}
}
