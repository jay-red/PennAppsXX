var canvas = document.getElementById( "canvas" );

sprite = {};
sprite.width = 68;
sprite.height = 9;
sprite.image = new Image();
sprite.image.src = "src/fire/Fireball_68x9.png";
sprite.frames = (sprite.image.height / sprite.height) * (sprite.image.width / sprite.width);
sprite.frame = 0;
sprite.time = 1000 / 30;
sprite.lastUpdate = -1;
sprite.lastTicks = 0;
sprite.update = function( ticks ) {
	if( sprite.lastUpdate == -1 ) {
		sprite.lastUpdate = ticks;
	}
	sprite.lastTicks += ticks - sprite.lastUpdate;
	while( sprite.lastTicks > sprite.time ) {
		sprite.frame = ( sprite.frame + 1 ) % sprite.frames;
		sprite.lastTicks -= sprite.time;
	}
	sprite.lastUpdate = ticks;
}

canvas.width = sprite.width;
canvas.height = sprite.height;

var ctx = canvas.getContext( "2d" );

function gameLoop( ticks ) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	sprite.update( ticks );
	ctx.drawImage( sprite.image, ( sprite.frame % ( sprite.image.width / sprite.width ) * sprite.width ), Math.floor( sprite.frame / ( sprite.image.width / sprite.width ) ) * sprite.height, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height );
	window.requestAnimationFrame( gameLoop );
}

sprite.image.addEventListener( "load", function() {
	window.requestAnimationFrame( gameLoop );
});