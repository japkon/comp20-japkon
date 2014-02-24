function draw(){
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var sprite = new Image();
	sprite.addEventListener("load", function(){
		// Draw the tree
		ctx.drawImage(sprite, 4, 270, 75, 130, 125, 135, 175, 350);
		// Draw the bushes
		ctx.drawImage(sprite, 0, 710, 900, 130, 0, 375, 800, 150);
		// Draw the dirt
		ctx.drawImage(sprite, 0, 845, 900, 53, 0, 525, 800, 75);
		// Draw the dog
		ctx.drawImage(sprite, 63, 0, 60, 50, 300, 470, 150, 120);
		// Draw 5 birds
		ctx.drawImage(sprite, 37, 117, 40, 30, 550, 100, 60, 50);
		ctx.drawImage(sprite, 163, 150, 40, 35, 50, 200, 60, 50);
		ctx.drawImage(sprite, 336, 192, 38, 37, 400, 300, 60, 50);
		ctx.drawImage(sprite, 0, 152, 33, 41, 300, 100, 60, 50);
		ctx.drawImage(sprite, 211, 115, 37, 33, 670, 350, 60, 50)
	}, false)
	sprite.src = 'assets/duckhunt.png';
}