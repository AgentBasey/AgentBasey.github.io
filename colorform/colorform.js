(function () {
	const gradient = [
		[false, false, false],
		[false, false, false],
		[false, false, false],
		[false, false, false]
	];
	function updateGradient(select) {
		let corner;
		switch (select.className) {
			case "top left":
				corner = gradient[0];
				break;
			case "top right":
				corner = gradient[1];
				break;
			case "bottom left":
				corner = gradient[2];
				break;
			case "bottom right":
				corner = gradient[3];
				break;
		}
		switch (select.value) {
			case "Black":
				newCorner = [false, false, false];
				break;
			case "White":
				newCorner = [true, true, true];
				break;
			case "Red":
				newCorner = [true, false, false];
				break;
			case "Green":
				newCorner = [false, true, false];
				break;
			case "Blue":
				newCorner = [false, false, true];
				break;
			case "Cyan":
				newCorner = [false, true, true];
				break;
			case "Magenta":
				newCorner = [true, false, true];
				break;
			case "Yellow":
				newCorner = [true, true, false];
				break;
		}
		corner.forEach((e, i, a) => a[i] = newCorner[i]);
	}
	function drawGradient() {
		const c = document.getElementById("c");
		const ctx = c.getContext("2d");
		const id = ctx.createImageData(1,1);
		const d = id.data;
		d[3] = 255;
		const newGradient = [[], [], []];
		gradient.forEach(function (e, y) {
			e.forEach(function (v, x) {
				newGradient[x][y] = v;
			})
		});
		function asBin(a) {
			let result = 0;
			a.forEach((e, i) => result += e * Math.pow(2,i));
			return result
		}
		for (let y = 0; y < 256; y++) {
			for (let x = 0; x < 256; x++) {
				for (let i = 0; i < 3; i++) {
					switch (asBin(newGradient[i].slice())) {
						case 0:		//[false, false, false, false]
							d[i] = 0;
							break;
						case 1:		//[true, false, false, false]
							d[i] = Math.min(255 - x, 255 - y);
							break;
						case 2:		//[false, true, false, false]
							d[i] = Math.min(x, 255 - y);
							break;
						case 4:		//[false, false, true, false]
							d[i] = Math.min(255 - x, y);
							break;
						case 8:		//[false, false, false, true]
							d[i] = Math.min(x, y);
							break;
						case 3:		//[true, true, false, false]
							d[i] = 255 - y;
							break;
						case 5:		//[true, false, true, false]
							d[i] = 255 - x;
							break;
						case 9:		//[true, false, false, true]
							d[i] = Math.min(256 - x, 256 - y) + Math.min(x, y);
							break;
						case 6:		//[false, true, true, false]
							d[i] = Math.min(x, 256 - y) + Math.min(256 - x, y);
							break;
						case 10:		//[false, true, false, true]
							d[i] = x;
							break;
						case 12:		//[false, false, true, true]
							d[i] = y;
							break;
						case 7:		//[true, true, true, false]
							d[i] = Math.max(255 - x, 255 - y);
							break;
						case 11:		//[true, true, false, true]
							d[i] = Math.max(x, 255 - y);
							break;
						case 13:		//[true, false, true, true]:
							d[i] = Math.max(255 - x, y);
							break;
						case 14:		//[false, true, true, true]:
							d[i] = Math.max(x, y);
							break;
						case 15:		//[true, true, true, true]:
							d[i] = 255;
							break;
					}
				}
				ctx.putImageData(id, x, y);
			}
		}
	} drawGradient();
	document.querySelectorAll("select").forEach(function (select, i) {
		[
			"Black",
			"White",
			"Red",
			"Green",
			"Blue",
			"Cyan",
			"Magenta",
			"Yellow"
		].forEach(function (color) {
			const option = document.createElement("option");
			option.innerHTML = color;
			select.appendChild(option);
		});
		select.addEventListener("change", function (e) {
			updateGradient(e.target);
			drawGradient();
		});
	});
}());