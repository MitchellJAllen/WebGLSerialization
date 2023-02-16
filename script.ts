// introduce console.log to pure ES6 environment

declare class Console {
	public log(...args: any[]): void;
}

declare var console: Console;

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
