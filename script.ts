// introduce console.log to pure ES6 environment

declare class Console {
	public log(...args: any[]): void;
}

declare var console: Console;

// quick test of CompositeSerializer

class Vertex {
	public position: Vector3;
	public normal: Vector3;
	public texCoord: Vector2;

	// need to support no-argument constructor for composite types
	public constructor(
		position?: Vector3, normal?: Vector3, texCoord?: Vector2
	) {
		this.position = position || new Vector3(0, 0, 0);
		this.normal = normal || new Vector3(0, 0, 0);
		this.texCoord = texCoord || new Vector2(0, 0);
	}
}

class VertexSerializer extends CompositeSerializer<Vertex> {
	public constructor() {
		// need to pass class/constructor for composite types
		super(Vertex);

		// position entry

		this.addCompositeEntry(new CompositeEntry(
			new Vector3Serializer(new FloatSerializer()),
			(value: Vertex, readValue: Vector3) => value.position = readValue,
			(value: Vertex) => value.position
		));

		// normal entry

		this.addCompositeEntry(new CompositeEntry(
			new Vector3Serializer(new FloatSerializer()),
			(value: Vertex, readValue: Vector3) => value.normal = readValue,
			(value: Vertex) => value.normal
		));

		// texCoord entry

		this.addCompositeEntry(new CompositeEntry(
			new Vector2Serializer(new FloatSerializer()),
			(value: Vertex, readValue: Vector2) => value.texCoord = readValue,
			(value: Vertex) => value.texCoord
		));
	}
}

// test function for debugging that runs once

function test(): void {
/*
	let a = new Vector3(1, 2, 3);
	let b = new Vector3(4, 5, 6);
	let c = a.cross(b);

	console.log(c);

	let serializer = new HalfFloatSerializer();
	let d = new DataBuffer<number>(serializer, 3);

	d.set(0, 1);
	d.set(1, 2);
	d.set(2, 3);

	console.log(d.get(1));
*/
	let a = new VertexSerializer();

	console.log(a.getAttributeDescriptions());
}

function getPositionData(): ArrayBuffer {
	let serializer = new Vector3Serializer(new FloatSerializer());
	let positionData = new DataBuffer<Vector3>(4, serializer);

	positionData.set(0, new Vector3(-1.0, +1.0, 0.0));
	positionData.set(1, new Vector3(-1.0, -1.0, 0.0));
	positionData.set(2, new Vector3(+1.0, -1.0, 0.0));
	positionData.set(3, new Vector3(+1.0, +1.0, 0.0));

	return positionData.getBuffer();
}

function getColorData(): ArrayBuffer {
	let serializer = new Vector3Serializer(new FloatSerializer());
	let colorData = new DataBuffer<Vector3>(16, serializer);

	let offsetVector = new Vector3(0.5, 0.5, 0.5);

	for (let index = 0; index < colorData.getLength(); index++) {
		let randomVector = Vector3.randomUnit().scale(0.5).add(offsetVector);

		colorData.set(index, randomVector);
	}

	return colorData.getBuffer();
}

function getIndexData(): ArrayBuffer {
	let serializer = new Vector3Serializer(new ShortSerializer(false, false));
	let indexData = new DataBuffer<Vector3>(2, serializer);

	indexData.set(0, new Vector3(0, 1, 2));
	indexData.set(1, new Vector3(0, 2, 3));

	return indexData.getBuffer();
}
