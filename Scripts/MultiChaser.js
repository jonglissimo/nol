script.addIntParameter("Num", "", 1, 1, 100);
script.addFloatParameter("Speed", "", 1, 0, 5);
script.addFloatParameter("Size", "", .2, 0, 1);
script.addColorParameter("Color", "", 0xffff00ff);
script.addColorParameter("Color2", "", 0xff00ffff);
script.addColorParameter("BG Color", "", 0x000000ff);
script.addBoolParameter("Double", "", false);
script.addBoolParameter("Expand", "", false);
script.addBoolParameter("Invert Odds", "", false);
script.addBoolParameter("Invert Evens", "", false);


function updateColors(colours, id, resolution, time, params, prop)//, num, speed, size, color, color2, pingPong, double)
{
	var t = time * params.speed;
	var ct = Math.cos(t * Math.PI) * .5 + .5;
	if (params.double) ct = ct * ct;


	var relId = params.expand ? id % params.num : id;
	var relStart = relId * 1.0 / params.num;
	var relEnd = (relId + 1.0) / params.num;

	var inv = (params.invertOdds && relId % 2 == 1) || (params.invertEvens && relId % 2 == 0);

	for (var i = 0; i < resolution; i++) {
		var p = (relStart + (i * 1.0 / resolution) * (relEnd - relStart)) % Math.max(params.num - 1, 1);

		var val1 = Math.min(Math.max((Math.max(1 - Math.abs(p - ct) / params.size, 0) - .5) * 2 + .5, 0), 1);
		var val2 = Math.min(Math.max((Math.max(1 - Math.abs(p - (1 - ct)) / params.size, 0) - .5) * 2 + .5, 0), 1);

		var bg = Math.max(1 - (val1*params.color[3] + val2*params.color2[3]), 0);

		colours.set(inv ? resolution - 1 - i : i,
			Math.min(params.bgColor[0] * bg + params.color[0] * val1 + params.color2[0] * val2, 1),
			Math.min(params.bgColor[1] * bg + params.color[1] * val1 + params.color2[1] * val2, 1),
			Math.min(params.bgColor[2] * bg + params.color[2] * val1 + params.color2[2] * val2, 1)
		);
	}

}