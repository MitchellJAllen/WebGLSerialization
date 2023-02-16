class Complex extends Vector2 {
	public constructor(real: number, imag: number) {
		super(real, imag);
	}

	// member aliases

	get real(): number {
		return this.x;
	}

	set real(scalar: number) {
		this.x = scalar;
	}

	get imag(): number {
		return this.y;
	}

	set imag(scalar: number) {
		this.y = scalar;
	}

	// override methods

	public add(complex: Complex): Complex;
	public add(vector: Vector2): Complex;
	public add(vector: Vector2): Complex {
		return new Complex(this.real + vector.x, this.imag + vector.y);
	}

	public scale(scalar: number): Complex {
		return new Complex(this.real * scalar, this.imag * scalar);
	}

	public dot(complex: Complex): number;
	public dot(vector: Vector2): number;
	public dot(vector: Vector2): number {
		return (this.real * vector.x + this.imag * vector.y);
	}

	// covariant signatures

	public subtract(complex: Complex): Complex;
	public subtract(vector: Vector2): Complex;
	public subtract(vector: Vector2): Complex {
		return super.subtract(vector) as Complex;
	}

	public normalize(): Complex {
		return super.normalize() as Complex;
	}

	// override methods

	public toString(): string {
		return `(${this.real} + ${this.imag}i)`;
	}

	// unique methods

	public multiply(complex: Complex): Complex {
		return new Complex(
			this.real * complex.real - this.imag * complex.imag,
			this.real * complex.imag + this.imag * complex.real
		);
	}
}
