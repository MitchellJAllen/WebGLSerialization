abstract class Vector {
	// methods to implement in subclasses

	public abstract add(vector: Vector): Vector;

	public abstract scale(scalar: number): Vector;

	public abstract dot(vector: Vector): number;

	public abstract toString(): string;

	// methods that need covariant type signatures in subclasses

	public subtract(vector: Vector): Vector {
		return this.add(vector.scale(-1));
	}

	public normalize(): Vector {
		return this.scale(1.0 / this.length());
	}

	// methods that are fully implemented

	public length(): number {
		return Math.sqrt(this.dot(this));
	}

	// static methods for subclasses

	// see: https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
	protected static randomGauss(): number {
		let u1 = Math.random();
		let u2 = Math.random();

		return (Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2));
	}
}
