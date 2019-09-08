// game.js

/*
	MODULE_CONTROL
*/
/* CONTROLS */
var PRESSED = {};
PRESSED.left = false;
PRESSED.right = false;
PRESSED.up = false;
PRESSED.down = false;
PRESSED.space = false;
PRESSED.w = false;
PRESSED.a = false;
PRESSED.s = false;
PRESSED.d = false;
PRESSED.lBracket = false;
PRESSED.rBracket = false;

function pressHandler( code, pressed ) {
	switch( code ) {
		case 87:
			PRESSED.w = pressed
			break;
		case 83:
			PRESSED.s = pressed;
			break;
		case 65:
			PRESSED.a = pressed;
			break;
		case 68:
			PRESSED.d = pressed;
			break;
		case 38:
			PRESSED.up = pressed;
			break;
		case 40:
			PRESSED.down = pressed;
			break;
		case 37:
			PRESSED.left = pressed;
			break;
		case 39:
			PRESSED.right = pressed;
			break;
		case 32:
			PRESSED.space = pressed;
			break;
		case 219:
			PRESSED.lBracket = pressed;
			break;
		case 221:
			PRESSED.rBracket = pressed;
			break;
		default:
			break;
	}
}

function keyDownHandler( e ) {
	pressHandler( e.keyCode, true );
	e.preventDefault();
}

function keyUpHandler( e ) {
	pressHandler( e.keyCode, false );
	e.preventDefault();
}

document.addEventListener( "keydown", keyDownHandler, false );
document.addEventListener( "keyup", keyUpHandler, false );

/*
	MODULE_MAP
*/

var MAP = [],
	MAP_WIDTH = 100,
	MAP_HEIGHT = 64,
	TILESIZE = 32;

for( var y = 0; y < MAP_HEIGHT; y++ ) {
	var row = [];
	for( var x = 0; x < MAP_WIDTH; x++ ) {
		if( y == 56 - 1 ) {
			row.push( 1 );
		} else {
			if( y > 55 ) {
				row.push( 3 );
			} else if( y == 0 || x == 0 || x == MAP_WIDTH - 1 ) {
				row.push( 2 );
			} else {
				row.push( 0 );
			}
		}
	}
	MAP.push( row );
}

/*
	MODULE_IMAGE
*/

// IMAGE_BACKGROUND
var img_bg = new Image();
img_bg.src = "assets/background.png";

var TILES = [];

TILES.push({});
TILES.push( { image: img_bg, width: 32, height: 32, x: 32, y: 32 } );
TILES.push( { image: img_bg, width: 32, height: 32, x: 128, y: 64 } );
TILES.push( { image: img_bg, width: 32, height: 32, x: 32, y: 64 } );

// IMAGE_P1
var img_idleR_p1 = new Image();
img_idleR_p1.src = "assets/idleR_p1.png";

var img_idleL_p1 = new Image();
img_idleL_p1.src = "assets/idleL_p1.png";

var img_runR_p1 = new Image();
img_runR_p1.src = "assets/runR_p1.png";

var img_runL_p1 = new Image();
img_runL_p1.src = "assets/runL_p1.png";

var img_flapR_p1 = new Image();
img_flapR_p1.src = "assets/flapR_p1.png";

var img_flapL_p1 = new Image();
img_flapL_p1.src = "assets/flapL_p1.png";

var img_glideR_p1 = new Image();
img_glideR_p1.src = "assets/glideR_p1.png";

var img_glideL_p1 = new Image();
img_glideL_p1.src = "assets/glideL_p1.png";

var img_deathR_p1 = new Image();
img_deathR_p1.src = "assets/deathR_p1.png";

var img_deathL_p1 = new Image();
img_deathL_p1.src = "assets/deathL_p1.png";

// IMAGE_ICEBALL
var img_iceballN = new Image();
img_iceballN.src = "assets/iceballN.png";

var img_iceballE = new Image();
img_iceballE.src = "assets/iceballE.png";

var img_iceballS = new Image();
img_iceballS.src = "assets/iceballS.png";

var img_iceballW = new Image();
img_iceballW.src = "assets/iceballW.png";

// IMAGE_FIREBALL
var img_fireballN = new Image();
img_fireballN.src = "assets/fireballN.png";

var img_fireballE = new Image();
img_fireballE.src = "assets/fireballE.png";

var img_fireballS = new Image();
img_fireballS.src = "assets/fireballS.png";

var img_fireballW = new Image();
img_fireballW.src = "assets/fireballW.png";

// IMAGE_HEALTHBALL
var img_healthballN = new Image();
img_healthballN.src = "assets/healthballN.png";

var img_healthballE = new Image();
img_healthballE.src = "assets/healthballE.png";

var img_healthballS = new Image();
img_healthballS.src = "assets/healthballS.png";

var img_healthballW = new Image();
img_healthballW.src = "assets/healthballW.png";

// IMAGE_BOSS
var img_bossR = new Image();
img_bossR.src = "assets/blackhandR.png";

var img_bossL = new Image();
img_bossL.src = "assets/blackhandL.png";

var img_emptybar = new Image();
img_emptybar.src = "assets/emptybar.png";

var img_beginbar = new Image();
img_beginbar.src = "assets/beginbar.png";

var img_midbar = new Image();
img_midbar.src = "assets/midbar.png";

var img_endbar = new Image();
img_endbar.src = "assets/endbar.png";

var img_heart = new Image();
img_heart.src = "assets/heart.png";

var img_healing = new Image();
img_healing.src = "assets/healing.png";

var img_ice = new Image();
img_ice.src = "assets/ice.png";


/* MODULE_ANIMATION */
function animReset( anim ) {
	anim.left = false;
	anim.frame = 0;
	anim.x = 0;
	anim.y = 0;
	anim.last = -1;
	anim.ticks = 0;
	anim.increment = 1;
	anim.done = false;
}

var anim_idle_p1 = {};
anim_idle_p1.images = [ img_idleL_p1, img_idleR_p1 ];
anim_idle_p1.image = img_idleR_p1;
anim_idle_p1.frames = 4;
anim_idle_p1.offsets = [[0, 0], [0, 0]];
anim_idle_p1.offset = [0, 0];
anim_idle_p1.hitboxes = [[[8, 6], [27, 6], [27, 32], [8, 32]], [[5, 6], [24, 6], [24, 32], [5, 32]]];
anim_idle_p1.hitbox = [[5, 6], [24, 6], [24, 32], [5, 32]];
anim_idle_p1.width = 32;
anim_idle_p1.height = 32;
anim_idle_p1.fps = 1000 / 10;
anim_idle_p1.reset = function() {
	animReset( this );
}
anim_idle_p1.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = this.frame + this.increment;
		if( this.frame == this.frames ) {
			this.increment = -1;
			this.frame -= 2;
		} else if( this.frame == -1 ) {
			this.frame = 1;
			this.increment = 1;
		}
	}
	this.x = this.frame * this.width;
	this.last = ticks;
}
anim_idle_p1.reset();

var anim_run_p1 = {};
anim_run_p1.images = [ img_runL_p1, img_runR_p1 ];
anim_run_p1.image = img_runR_p1;
anim_run_p1.frames = 6;
anim_run_p1.offsets = [[0, 0], [0, 0]];
anim_run_p1.offset = [0, 0];
anim_run_p1.hitboxes = [[[8, 6], [27, 6], [27, 32], [8, 32]], [[5, 6], [24, 6], [24, 32], [5, 32]]];
anim_run_p1.hitbox = [[5, 6], [24, 6], [24, 32], [5, 32]];
anim_run_p1.width = 32;
anim_run_p1.height = 32;
anim_run_p1.fps = 1000 / 20;
anim_run_p1.reset = function() {
	animReset( this );
}
anim_run_p1.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = ( this.frame + this.increment ) % this.frames;
	}
	this.x = this.frame * this.width;
	this.last = ticks;
}

var anim_flap_p1 = {};
anim_flap_p1.images = [ img_flapL_p1, img_flapR_p1 ];
anim_flap_p1.image = img_flapR_p1;
anim_flap_p1.frames = 4;
anim_flap_p1.offsets = [[-8, -3], [-30, -3]];
anim_flap_p1.offset = [-30, -3];
anim_flap_p1.hitboxes = [[[8, 6], [27, 6], [27, 32], [8, 32]], [[5, 6], [24, 6], [24, 32], [5, 32]]];
anim_flap_p1.hitbox = [[6, 6], [24, 6], [24, 32], [6, 32]];
anim_flap_p1.width = 70;
anim_flap_p1.height = 50;
anim_flap_p1.fps = 1000 / 24;
anim_flap_p1.reset = function() {
	animReset( this );
}
anim_flap_p1.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = this.frame + this.increment;
		if( this.frame == this.frames ) {
			this.increment = -1;
			this.frame = 2;
		} else if( this.frame == 0 ) {
			this.done = true;
		}
	}
	this.x = this.frame * this.width;
	this.last = ticks;
}

var anim_glide_p1 = {};
anim_glide_p1.images = [ img_glideL_p1, img_glideR_p1 ];
anim_glide_p1.image = img_glideR_p1;
anim_glide_p1.frames = 4;
anim_glide_p1.offsets = [[-8, -3], [-30, -3]];
anim_glide_p1.offset = [-30, -3];
anim_glide_p1.hitboxes = [[[8, 6], [27, 6], [27, 32], [8, 32]], [[5, 6], [24, 6], [24, 32], [5, 32]]];
anim_glide_p1.hitbox = [[6, 6], [24, 6], [24, 32], [6, 32]];
anim_glide_p1.width = 70;
anim_glide_p1.height = 50;
anim_glide_p1.fps = 1000 / 15;
anim_glide_p1.reset = function() {
	animReset( this );
}
anim_glide_p1.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = this.frame + this.increment;
		if( this.frame == this.frames ) {
			this.increment = -1;
			this.frame = 2;
		} else if( this.frame == -1 ) {
			this.frame = 1;
			this.increment = 1;
		}
	}
	this.x = this.frame * this.width;
	this.last = ticks;
}

var anim_death_p1 = {};
anim_death_p1.images = [ img_deathL_p1, img_deathR_p1 ];
anim_death_p1.image = img_deathR_p1;
anim_death_p1.frames = 8;
anim_death_p1.offsets = [[0, 0], [0, 0]];
anim_death_p1.offset = [0, 0];
anim_death_p1.hitboxes = [[[8, 6], [27, 6], [27, 32], [8, 32]], [[5, 6], [24, 6], [24, 32], [5, 32]]];
anim_death_p1.hitbox = [[5, 6], [24, 6], [24, 32], [5, 32]];
anim_death_p1.width = 32;
anim_death_p1.height = 32;
anim_death_p1.fps = 1000 / 20;
anim_death_p1.reset = function() {
	animReset( this );
}
anim_death_p1.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = ( this.frame + this.increment );
		if( this.frame == this.frames ) {
			this.done = true;
		}
	}
	if( this.left ) {
		this.x = ( this.image.width - ( ( this.frame + 1 ) * this.width ) );
	} else {
		this.x = this.frame * this.width;
	}
	this.last = ticks;
}

var anim_death_boss = {};
anim_death_boss.images = [ img_bossL, img_bossR ];
anim_death_boss.image = img_bossR;
anim_death_boss.frames = 14;
anim_death_boss.offsets = [[0, 0], [0, 0]];
anim_death_boss.offset = [0, 0];
anim_death_boss.hitboxes = [[[8, 6], [27, 6], [27, 32], [8, 32]], [[5, 6], [24, 6], [24, 32], [5, 32]]];
anim_death_boss.hitbox = [[5, 6], [24, 6], [24, 32], [5, 32]];
anim_death_boss.width = 240;
anim_death_boss.height = 240;
anim_death_boss.fps = 1000 / 10;
anim_death_boss.reset = function() {
	this.left = false;
	this.frame = 14;
	this.x = 0;
	this.y = 0;
	this.last = -1;
	this.ticks = 0;
	this.increment = -1;
	this.done = false;
}
anim_death_boss.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = ( this.frame + this.increment );
		if( this.frame == -1 ) {
			this.done = true;
		}
	}
	if( this.left ) {
		this.x = ( 9 - ( ( this.frame - 1 + 20 ) % 10 ) ) * this.width;
	} else {
		this.x = ( ( this.frame - 1 + 20 ) % 10 ) * this.width;
	}
	this.y = Math.floor( ( this.frame - 1 + 20 ) / 10 ) * this.height;
	this.last = ticks;
}

var anim_rise_boss = {};
anim_rise_boss.images = [ img_bossL, img_bossR ];
anim_rise_boss.image = img_bossR;
anim_rise_boss.frames = 14;
anim_rise_boss.offsets = [[0, 0], [0, 0]];
anim_rise_boss.offset = [0, 0];
anim_rise_boss.hitboxes = [[[8, 6], [27, 6], [27, 32], [8, 32]], [[5, 6], [24, 6], [24, 32], [5, 32]]];
anim_rise_boss.hitbox = [[5, 6], [24, 6], [24, 32], [5, 32]];
anim_rise_boss.width = 240;
anim_rise_boss.height = 240;
anim_rise_boss.fps = 1000 / 10;
anim_rise_boss.reset = function() {
	animReset( this );
}
anim_rise_boss.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = ( this.frame + this.increment );
		if( this.frame == this.frames ) {
			this.done = true;
		}
	}
	if( this.left ) {
		this.x = ( 9 - ( ( this.frame + 20 ) % 10 ) ) * this.width;
	} else {
		this.x = ( ( this.frame + 20 ) % 10 ) * this.width;
	}
	this.y = Math.floor( ( this.frame + 20 ) / 10 ) * this.height;
	this.last = ticks;
}

var anim_strike_boss = {};
anim_strike_boss.images = [ img_bossL, img_bossR ];
anim_strike_boss.image = img_bossR;
anim_strike_boss.frames = 20;
anim_strike_boss.offsets = [[0, 0], [0, 0]];
anim_strike_boss.offset = [0, 0];
anim_strike_boss.hitboxes = [[[92, 85], [136, 85], [136, 172], [92, 172]], [[104, 85], [148, 85], [148, 172], [104, 172]]];
anim_strike_boss.hitbox = [[5, 6], [24, 6], [24, 32], [5, 32]];
anim_strike_boss.width = 240;
anim_strike_boss.height = 240;
anim_strike_boss.fps = 1000 / 10;
anim_strike_boss.reset = function() {
	animReset( this );
}
anim_strike_boss.reset();
anim_strike_boss.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = ( this.frame + this.increment );
		if( this.frame == this.frames ) {
			this.done = true;
		}
	}
	if( this.left ) {
		this.x = ( ( 9 - ( this.frame ) % 10 ) ) * this.width;
	} else {
		this.x = ( ( this.frame ) % 10 ) * this.width;
	}
	this.y = Math.floor( ( this.frame ) / 10 ) * this.height;
	this.last = ticks;
}

var anim_hover_boss = {};
anim_hover_boss.images = [ img_bossL, img_bossR ];
anim_hover_boss.image = img_bossR;
anim_hover_boss.frames = 5;
anim_hover_boss.offsets = [[0, 0], [0, 0]];
anim_hover_boss.offset = [0, 0];
anim_hover_boss.hitboxes = [[[92, 75], [136, 75], [136, 172], [92, 172]], [[104, 75], [148, 75], [148, 172], [104, 172]]];
anim_hover_boss.hitbox = [[5, 6], [24, 6], [24, 32], [5, 32]];
anim_hover_boss.width = 240;
anim_hover_boss.height = 240;
anim_hover_boss.fps = 1000 / 10;
anim_hover_boss.reset = function() {
	animReset( this );
}

anim_hover_boss.update = function( ticks ) {
	if( this.left ) {
		this.image = this.images[ 0 ];
		this.offset = this.offsets[ 0 ];
		this.hitbox = this.hitboxes[ 0 ];
	} else {
		this.image = this.images[ 1 ];
		this.offset = this.offsets[ 1 ];
		this.hitbox = this.hitboxes[ 0 ];
	}
	if( this.last == -1 ) {
		this.last = ticks;
	}
	this.ticks += ( ticks - this.last );
	while( this.ticks > this.fps ) {
		this.ticks -= this.fps;
		this.frame = ( this.frame + this.increment ) % this.frames;
	}
	this.y = Math.floor( ( this.frame + 41 ) / 10 ) * this.height;
	if( this.left ) {
		this.x = ( ( 48 - this.frame ) % 10 ) * this.width;
	} else {
		this.x = ( ( this.frame + 41 ) % 10 ) * this.width;
	}
	this.last = ticks;
}

/* MODULE_ENTITY_PROJECTILE */
var HEALTHBALL_SPEED = 7,
	HEALTHBALL_SPEEDS = [[0, -HEALTHBALL_SPEED], [HEALTHBALL_SPEED, 0], [0, HEALTHBALL_SPEED], [-HEALTHBALL_SPEED, 0]],
	HEALTHBALL_IMAGES = [ img_healthballN, img_healthballE, img_healthballS, img_healthballW ],
	HEALTHBALL_OFFSETS = [[-4.5, -20], [-48, -4.5], [-4.5, -48], [-20, -4.5]],
	HEALTHBALL_HITBOX0 = [[-4.5, -19], [4.5, -19], [4.5, 0], [-4.5, 0]],
	HEALTHBALL_HITBOX1 = [[0, -4.5], [19, -4.5], [19, 4.5], [0, 4.5]],
	HEALTHBALL_HITBOX2 = [[-4.5, 0], [4.5, 0], [4.5, 19], [-4.5, 19]],
	HEALTHBALL_HITBOX3 = [[-19, -4.5], [0, -4.5], [0, 4.5], [-19, 4.5]],
	HEALTHBALL_HITBOXES = [HEALTHBALL_HITBOX0, HEALTHBALL_HITBOX1, HEALTHBALL_HITBOX2, HEALTHBALL_HITBOX3],
	HEALTHBALL_SIZES = [[9, 65], [65, 9]],
	HEALTHBALL_FRAMES = 60,
	HEALTHBALL_FPS = 1000 / 40,
	HEALTHBALL_TIMEOUT = 2000,
	HEALTHBALL_HEALING = 1,
	HEALTHBALL_DAMAGE = 1;

var ICEBALL_SPEED = 7,
	ICEBALL_SPEEDS = [[0, -ICEBALL_SPEED], [ICEBALL_SPEED, 0], [0, ICEBALL_SPEED], [-ICEBALL_SPEED, 0]],
	ICEBALL_IMAGES = [ img_iceballN, img_iceballE, img_iceballS, img_iceballW ],
	ICEBALL_OFFSETS = [[-4.5, -20], [-64, -4.5], [-4.5, -64], [-20, -4.5]],
	ICEBALL_HITBOX0 = [[-4.5, -18], [4.5, -18], [4.5, 22], [-4.5, 22]],
	ICEBALL_HITBOX1 = [[-22, -4.5], [18, -4.5], [18, 4.5], [-22, -4.5]],
	ICEBALL_HITBOX2 = [[-4.5, -22], [4.5, -22], [4.5, 18], [-4.5, 18]],
	ICEBALL_HITBOX3 = [[-18, -4.5], [22, -4.5], [22, 4.5], [-18, -4.5]],
	ICEBALL_HITBOXES = [ICEBALL_HITBOX0, ICEBALL_HITBOX1, ICEBALL_HITBOX2, ICEBALL_HITBOX3],
	ICEBALL_SIZES = [[9, 84], [84, 9]],
	ICEBALL_FRAMES = 60,
	ICEBALL_FPS = 1000 / 40,
	ICEBALL_TIMEOUT = 2000,
	ICEBALL_DAMAGE = 5;

var entities_pProjs = [];

function createHealthball( x, y, direction ) {
	var entity_healthball = {};
	var anim_healthball = {};
	anim_healthball.image = HEALTHBALL_IMAGES[ direction ];
	anim_healthball.width = HEALTHBALL_SIZES[ direction % 2 ][ 0 ];
	anim_healthball.height = HEALTHBALL_SIZES[ direction % 2 ][ 1 ];
	anim_healthball.frames = HEALTHBALL_FRAMES;
	anim_healthball.offset = HEALTHBALL_OFFSETS[ direction ];
	anim_healthball.fps = HEALTHBALL_FPS;
	anim_healthball.reset = function() {
		animReset( this );
	}
	anim_healthball.update = function( ticks ) {
		if( this.last == -1 ) {
			this.last = ticks;
		}
		this.ticks += ( ticks - this.last );
		while( this.ticks > this.fps ) {
			this.ticks -= this.fps;
			this.frame = ( this.frame + this.increment ) % this.frames;
		}
		this.x = ( this.frame % ( this.image.width / this.width ) ) * this.width;
		this.y = Math.floor( this.frame / ( this.image.width / this.width ) ) * this.height;
		this.last = ticks;
	}
	entity_healthball.animations = { "default": anim_healthball };
	entity_healthball.anim = "default";
	entity_healthball.x = x;
	entity_healthball.y = y;
	entity_healthball.dx = FIREBALL_SPEEDS[ direction ][ 0 ];
	entity_healthball.dy = FIREBALL_SPEEDS[ direction ][ 1 ];
	entity_healthball.active = true;
	entity_healthball.total = 0;
	entity_healthball.damage = HEALTHBALL_DAMAGE;
	entity_healthball.effect = function( p ) {
		for( var i = 0; i < entities_player.length; i++ ) {
			entities_player[ i ].health += HEALTHBALL_HEALING;
		}
	}
	entity_healthball.calcHitboxes = function() {
		this.ul = [ HEALTHBALL_HITBOXES[ direction ][ 0 ][ 0 ] + this.x, HEALTHBALL_HITBOXES[ direction ][ 0 ][ 1 ] + this.y ];
		this.ur = [ HEALTHBALL_HITBOXES[ direction ][ 1 ][ 0 ] + this.x, HEALTHBALL_HITBOXES[ direction ][ 1 ][ 1 ] + this.y ];
		this.br = [ HEALTHBALL_HITBOXES[ direction ][ 2 ][ 0 ] + this.x, HEALTHBALL_HITBOXES[ direction ][ 2 ][ 1 ] + this.y ];
		this.bl = [ HEALTHBALL_HITBOXES[ direction ][ 3 ][ 0 ] + this.x, HEALTHBALL_HITBOXES[ direction ][ 3 ][ 1 ] + this.y ];
	}
	entity_healthball.last = -1;
	anim_healthball.reset();
	entity_healthball.calcHitboxes();
	entity_healthball.update = function( ticks ) {
		if( this.last == -1 ) this.last = ticks;
		anim_healthball.update( ticks );
		this.x += this.dx;
		this.y += this.dy;
		this.total += ticks - this.last;
		if( this.total >= HEALTHBALL_TIMEOUT ) this.active = false;
		this.calcHitboxes();
		this.last = ticks;
	}
	return entity_healthball;
}

function createIceball( x, y, direction ) {
	var entity_iceball = {};
	var anim_iceball = {};
	anim_iceball.image = ICEBALL_IMAGES[ direction ];
	anim_iceball.width = ICEBALL_SIZES[ direction % 2 ][ 0 ];
	anim_iceball.height = ICEBALL_SIZES[ direction % 2 ][ 1 ];
	anim_iceball.frames = ICEBALL_FRAMES;
	anim_iceball.offset = ICEBALL_OFFSETS[ direction ];
	anim_iceball.fps = ICEBALL_FPS;
	anim_iceball.reset = function() {
		animReset( this );
	}
	anim_iceball.update = function( ticks ) {
		if( this.last == -1 ) {
			this.last = ticks;
		}
		this.ticks += ( ticks - this.last );
		while( this.ticks > this.fps ) {
			this.ticks -= this.fps;
			this.frame = ( this.frame + this.increment ) % this.frames;
		}
		this.x = ( this.frame % ( this.image.width / this.width ) ) * this.width;
		this.y = Math.floor( this.frame / ( this.image.width / this.width ) ) * this.height;
		this.last = ticks;
	}
	entity_iceball.animations = { "default": anim_iceball };
	entity_iceball.anim = "default";
	entity_iceball.x = x;
	entity_iceball.y = y;
	entity_iceball.dx = ICEBALL_SPEEDS[ direction ][ 0 ];
	entity_iceball.dy = ICEBALL_SPEEDS[ direction ][ 1 ];
	entity_iceball.active = true;
	entity_iceball.total = 0;
	entity_iceball.damage = ICEBALL_DAMAGE;
	entity_iceball.effect = function( p ) {

	}
	entity_iceball.calcHitboxes = function() {
		this.ul = [ ICEBALL_HITBOXES[ direction ][ 0 ][ 0 ] + this.x, ICEBALL_HITBOXES[ direction ][ 0 ][ 1 ] + this.y ];
		this.ur = [ ICEBALL_HITBOXES[ direction ][ 1 ][ 0 ] + this.x, ICEBALL_HITBOXES[ direction ][ 1 ][ 1 ] + this.y ];
		this.br = [ ICEBALL_HITBOXES[ direction ][ 2 ][ 0 ] + this.x, ICEBALL_HITBOXES[ direction ][ 2 ][ 1 ] + this.y ];
		this.bl = [ ICEBALL_HITBOXES[ direction ][ 3 ][ 0 ] + this.x, ICEBALL_HITBOXES[ direction ][ 3 ][ 1 ] + this.y ];
	}
	entity_iceball.last = -1;
	anim_iceball.reset();
	entity_iceball.calcHitboxes();
	entity_iceball.update = function( ticks ) {
		if( this.last == -1 ) this.last = ticks;
		anim_iceball.update( ticks );
		this.x += this.dx;
		this.y += this.dy;
		this.total += ticks - this.last;
		if( this.total >= ICEBALL_TIMEOUT ) this.active = false;
		this.calcHitboxes();
		this.last = ticks;
	}
	return entity_iceball;
}

var FIREBALL_SPEED = 3,
	FIREBALL_SPEEDS = [[0, -FIREBALL_SPEED], [FIREBALL_SPEED, 0], [0, FIREBALL_SPEED], [-FIREBALL_SPEED, 0]],
	FIREBALL_IMAGES = [ img_fireballN, img_fireballE, img_fireballS, img_fireballW ],
	FIREBALL_OFFSETS = [[-4.5, -20], [-48, -4.5], [-4.5, -48], [-20, -4.5]],
	FIREBALL_HITBOX0 = [[-4.5, -19], [4.5, -19], [4.5, 0], [-4.5, 0]],
	FIREBALL_HITBOX1 = [[0, -4.5], [19, -4.5], [19, 4.5], [0, 4.5]],
	FIREBALL_HITBOX2 = [[-4.5, 0], [4.5, 0], [4.5, 19], [-4.5, 19]],
	FIREBALL_HITBOX3 = [[-19, -4.5], [0, -4.5], [0, 4.5], [-19, 4.5]],
	FIREBALL_HITBOXES = [FIREBALL_HITBOX0, FIREBALL_HITBOX1, FIREBALL_HITBOX2, FIREBALL_HITBOX3],
	FIREBALL_SIZES = [[9, 68], [68, 9]],
	FIREBALL_FRAMES = 60,
	FIREBALL_FPS = 1000 / 40,
	FIREBALL_TIMEOUT = 10000;

var entities_bProjs = [];

function createFireball( x, y, direction ) {
	var entity_fireball = {};
	var anim_fireball = {};
	anim_fireball.image = FIREBALL_IMAGES[ direction ];
	anim_fireball.width = FIREBALL_SIZES[ direction % 2 ][ 0 ];
	anim_fireball.height = FIREBALL_SIZES[ direction % 2 ][ 1 ];
	anim_fireball.frames = FIREBALL_FRAMES;
	anim_fireball.offset = FIREBALL_OFFSETS[ direction ];
	anim_fireball.fps = FIREBALL_FPS;
	anim_fireball.reset = function() {
		animReset( this );
	}
	anim_fireball.update = function( ticks ) {
		if( this.last == -1 ) {
			this.last = ticks;
		}
		this.ticks += ( ticks - this.last );
		while( this.ticks > this.fps ) {
			this.ticks -= this.fps;
			this.frame = ( this.frame + this.increment ) % this.frames;
		}
		this.x = ( this.frame % ( this.image.width / this.width ) ) * this.width;
		this.y = Math.floor( this.frame / ( this.image.width / this.width ) ) * this.height;
		this.last = ticks;
	}
	entity_fireball.animations = { "default": anim_fireball };
	entity_fireball.anim = "default";
	entity_fireball.paused = true
	entity_fireball.x = x;
	entity_fireball.y = y;
	entity_fireball.dx = FIREBALL_SPEEDS[ direction ][ 0 ];
	entity_fireball.dy = FIREBALL_SPEEDS[ direction ][ 1 ];
	entity_fireball.active = true;
	entity_fireball.total = 0;
	entity_fireball.calcHitboxes = function() {
		this.ul = [ FIREBALL_HITBOXES[ direction ][ 0 ][ 0 ] + this.x, FIREBALL_HITBOXES[ direction ][ 0 ][ 1 ] + this.y ];
		this.ur = [ FIREBALL_HITBOXES[ direction ][ 1 ][ 0 ] + this.x, FIREBALL_HITBOXES[ direction ][ 1 ][ 1 ] + this.y ];
		this.br = [ FIREBALL_HITBOXES[ direction ][ 2 ][ 0 ] + this.x, FIREBALL_HITBOXES[ direction ][ 2 ][ 1 ] + this.y ];
		this.bl = [ FIREBALL_HITBOXES[ direction ][ 3 ][ 0 ] + this.x, FIREBALL_HITBOXES[ direction ][ 3 ][ 1 ] + this.y ];
	}
	entity_fireball.last = -1;
	entity_fireball.effect = function( p ) {}
	anim_fireball.reset();
	entity_fireball.calcHitboxes();
	entity_fireball.update = function( ticks ) {
		if( this.last == -1 ) this.last = ticks;
		anim_fireball.update( ticks );
		if( !this.paused ) {
			this.x += this.dx;
			this.y += this.dy;
			this.total += ticks - this.last;
		}
		if( this.total >= FIREBALL_TIMEOUT ) this.active = false;
		this.calcHitboxes();
		this.last = ticks;
	}
	return entity_fireball;
}

/* MODULE_ENTITY_PLAYER */
var MOVEMENT_SPEED = 5,
	COOLDOWN = 200;

var entities_player = [];

entity_p1 = {};
entity_p1.animations = { "idle": anim_idle_p1, "run": anim_run_p1, "flap": anim_flap_p1, "glide": anim_glide_p1, "death": anim_death_p1 };
entity_p1.anim = "";
entity_p1.lastAnim = "";
entity_p1.x = TILESIZE * 2;
entity_p1.y = ( MAP_HEIGHT - 12 ) * TILESIZE;
entity_p1.dx = 0;
entity_p1.dy = 0;
entity_p1.left = false;
entity_p1.jumping = true;
entity_p1.falling = true;
entity_p1.flapping = false;
entity_p1.flying = false;
entity_p1.last = -1;
entity_p1.health = 200;
entity_p1.ul = [0, 0];
entity_p1.ur = [0, 0];
entity_p1.br = [0, 0];
entity_p1.bl = [0, 0];
entity_p1.lastAttack = 0;
entity_p1.keytimes = {};
entity_p1.keytimes.lBracket = 0;
entity_p1.keytimes.rBracket = 0;
entity_p1.potion = 0;
entity_p1.potions = [ "ice", "healing" ];
entity_p1.calcHitboxes = function() {
	this.ul = [ this.animations[ this.anim ].hitbox[ 0 ][ 0 ], this.animations[ this.anim ].hitbox[ 0 ][ 1 ] ];
	this.ur = [ this.animations[ this.anim ].hitbox[ 1 ][ 0 ], this.animations[ this.anim ].hitbox[ 1 ][ 1 ] ];
	this.br = [ this.animations[ this.anim ].hitbox[ 2 ][ 0 ], this.animations[ this.anim ].hitbox[ 2 ][ 1 ] ];
	this.bl = [ this.animations[ this.anim ].hitbox[ 3 ][ 0 ], this.animations[ this.anim ].hitbox[ 3 ][ 1 ] ];
	this.ul[ 0 ] += this.x;
	this.ul[ 1 ] += this.y;
	this.ur[ 0 ] += this.x;
	this.ur[ 1 ] += this.y;
	this.br[ 0 ] += this.x;
	this.br[ 1 ] += this.y;
	this.bl[ 0 ] += this.x;
	this.bl[ 1 ] += this.y;
}
entity_p1.update = function( ticks ) {
	if( this.last == -1 ) {
		this.last = ticks;
	}
	if( this.health > 0 ) {
		this.anim = "run";
		if( !PRESSED.lBracket ) {
			this.keytimes.lBracket += ticks - this.last;
		} else {
			if( this.keytimes.lBracket > 0 ) {
				this.keytimes.lBracket = 0;
				this.potion = ( this.potion - 1 );
				if( this.potion < 0 ) {
					this.potion = this.potions.length - 1;
				}
			}
		}
		if( !PRESSED.rBracket ) {
			this.keytimes.rBracket += ticks - this.last;
		} else {
			if( this.keytimes.rBracket > 0 ) {
				this.keytimes.rBracket = 0;
				this.potion = ( this.potion + 1 ) % this.potions.length;
			}
		}
		if( PRESSED.right ) {
			this.dx = MOVEMENT_SPEED;
			this.left = false;
		} else if( PRESSED.left ) {
			this.dx = -MOVEMENT_SPEED;
			this.left = true;
		} else {
			this.dx = 0;
			this.anim = "idle";
		}
		if( this.flapping ) {
			this.anim = "flap";
		} else if( this.flying ) {
			this.anim = "glide";
		}
		if( this.flapping && this.animations[ this.anim ].done ) {
			this.flapping = false;
			this.animations[ this.anim ].reset();
		}
		if( PRESSED.space ) {
			if( !this.jumping ) {
				console.log( "jump" );
				this.dy = -8;
				this.jumping = true;
			} else if( !this.falling && !this.flapping ) {
				this.dy = -7;
				this.flapping = true;
				this.flying = true;
				this.anim = "flap";
			}
		}
		this.x += this.dx;
		this.y += this.dy;
		this.dy += ( ticks - this.last ) * 0.025;
		this.lastAttack += ( ticks - this.last );
		if( this.dy >= 9 ) {
			this.dy = 9;
		}
		if( !this.flying && this.jumping && this.dy <= 0) {
			this.falling = true;
		} else if( !this.flying && this.jumping && this.dy >= 0 ) {
			this.falling = false;
		}
		if( this.lastAttack >= COOLDOWN ) {
			att = createIceball;
			console.log( this.potions[ this.potion ] );
			switch( this.potions[ this.potion ] ) {
				case "healing":
					att = createHealthball;
					break;
				default:
					att = createIceball;
					break;
			}
			if( PRESSED.w ) {
				entities_pProjs.push( att( this.x + 16, this.y + 16, 0 ) );
				this.lastAttack = 0;
			} else if( PRESSED.d ) {
				entities_pProjs.push( att( this.x + 16, this.y + 16, 1 ) );
				this.lastAttack = 0;
			} else if( PRESSED.s ) {
				entities_pProjs.push( att( this.x + 16, this.y + 16, 2 ) );
				this.lastAttack = 0;
			} else if( PRESSED.a ) {
				entities_pProjs.push( att( this.x + 16, this.y + 16, 3 ) );
				this.lastAttack = 0;
			} 
		}
	} else {
		this.anim = "death";
		if( this.animations[ "death" ].done ) {
			console.log( "dead" );
		}
	}
	if( this.anim != this.lastAnim ) {
		this.animations[ this.anim ].reset();
	}
	this.animations[ this.anim ].left = this.left;
	this.animations[ this.anim ].update( ticks );
	this.calcHitboxes();
	this.lastAnim = this.anim;
	this.last = ticks;
}

entities_player.push( entity_p1 );

/*
	MODULE_ENTITY_BOSS
*/

var HOMING_TIME = 1000,
	HOMING_ACCEL = 0.001,
	TELEPORT_RADIUS = 300,
	BOSS_MAX = 1000;

entities_bosses = [];

entity_boss = {};
entity_boss.animations = { "rise": anim_rise_boss, "strike": anim_strike_boss, "hover": anim_hover_boss, "death": anim_death_boss };
entity_boss.anim = "";
entity_boss.lastAnim = "";
entity_boss.x = TILESIZE * 2;
entity_boss.y = ( MAP_HEIGHT - 12 ) * TILESIZE;
entity_boss.dx = 0;
entity_boss.dy = 0;
entity_boss.left = true;
entity_boss.jumping = true;
entity_boss.falling = true;
entity_boss.flapping = false;
entity_boss.flying = false;
entity_boss.last = -1;
entity_boss.ul = [0, 0];
entity_boss.ur = [0, 0];
entity_boss.br = [0, 0];
entity_boss.bl = [0, 0];
entity_boss.lastAttack = 0;
entity_boss.alpha = 1;
entity_boss.dAlpha = 0;
entity_boss.speed = 2;
entity_boss.health = BOSS_MAX;
entity_boss.calcHitboxes = function() {
	this.ul = [ this.animations[ this.anim ].hitbox[ 0 ][ 0 ], this.animations[ this.anim ].hitbox[ 0 ][ 1 ] ];
	this.ur = [ this.animations[ this.anim ].hitbox[ 1 ][ 0 ], this.animations[ this.anim ].hitbox[ 1 ][ 1 ] ];
	this.br = [ this.animations[ this.anim ].hitbox[ 2 ][ 0 ], this.animations[ this.anim ].hitbox[ 2 ][ 1 ] ];
	this.bl = [ this.animations[ this.anim ].hitbox[ 3 ][ 0 ], this.animations[ this.anim ].hitbox[ 3 ][ 1 ] ];
	this.ul[ 0 ] += this.x;
	this.ul[ 1 ] += this.y;
	this.ur[ 0 ] += this.x;
	this.ur[ 1 ] += this.y;
	this.br[ 0 ] += this.x;
	this.br[ 1 ] += this.y;
	this.bl[ 0 ] += this.x;
	this.bl[ 1 ] += this.y;
}
entity_boss.update = function( ticks ) {
	if( this.health > 0 ) {
		p1 = entities_player[ 0 ];
		if( this.last == -1 ) {
			this.last = ticks;
			this.anim = "rise";
			this.animations[ "rise" ].reset();
			this.animations[ "death" ].reset();
			this.x = p1.x + 300;
			this.y = p1.y - 100;
		}
		if( entities_bProjs.length > 0 ) {
			this.speed = 1;
		} else {
			this.speed = 2;
		}
		if( this.x + 100 < p1.x ) {
			this.dx = this.speed; 
			this.left = false;
		} else {
			this.dx = -this.speed;
			this.left = true;
		}

		if( this.y + 100 < p1.y ) {
			this.dy = this.speed; 
		} else {
			this.dy = -this.speed;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.homingTimer += ticks - this.last;
		if( this.anim == "rise" && this.animations[ "rise" ].done ) {
			this.anim = "hover";
			this.animations[ "hover" ].reset();
		} else if( this.anim != "rise" ) {
			if( this.alpha == 1 ) {
				p.calcHitboxes();
			} else {
				this.ul = this.ur = this.br = this.bl [0, 0];
			}
		}
		if( this.anim == "hover" && entities_bProjs.length == 0 ) {
			if( this.alpha == 1 ) {
				if( Math.floor( Math.random() * 100 ) == 0 ) {
					this.anim = "strike";
					this.animations[ "strike" ].reset();
					for( var i = 0; i < 20; i++ ) {
						entities_bProjs.push( createFireball( p1.x - 1000 + i * 100, p1.y - 150, 2 ) );
						entities_bProjs.push( createFireball( p1.x - 1010 + i * 100, p1.y + 150, 0 ) );
					}
					for( var i = 0; i < 20; i++ ) {
						entities_bProjs.push( createFireball( p1.x - 1010 + i * 100, p1.y - 600, 2 ) );
						entities_bProjs.push( createFireball( p1.x - 1000 + i * 100, p1.y + 600, 0 ) );
					}
					for( var i = 0; i < 20; i++ ) {
						entities_bProjs.push( createFireball( p1.x - 1000 + i * 100, p1.y - 1050, 2 ) );
						entities_bProjs.push( createFireball( p1.x - 1010 + i * 100, p1.y + 1050, 0 ) );
					}
					for( var i = 0; i < 20; i++ ) {
						entities_bProjs.push( createFireball( p1.x - 300, p1.y - 990 + i * 100, 1 ) );
						entities_bProjs.push( createFireball( p1.x + 300, p1.y - 1000 + i * 100, 3 ) );
					}
					for( var i = 0; i < 20; i++ ) {
						entities_bProjs.push( createFireball( p1.x - 750, p1.y - 1000 + i * 100, 1 ) );
						entities_bProjs.push( createFireball( p1.x + 750, p1.y - 990 + i * 100, 3 ) );
					}
					for( var i = 0; i < 20; i++ ) {
						entities_bProjs.push( createFireball( p1.x - 1200, p1.y - 990 + i * 100, 1 ) );
						entities_bProjs.push( createFireball( p1.x + 1200, p1.y - 1000 + i * 100, 3 ) );
					}
				} else if( Math.floor( Math.random() * 100 ) == 0 ) {
					this.dAlpha = -0.01;
				}
			}
			this.alpha += this.dAlpha;
			if( this.alpha < 0 ) {
				this.dAlpha = 0.01;
				this.alpha = 0;
				angle = Math.floor( Math.random() * 360 );
				this.x = p1.x + ( TELEPORT_RADIUS * Math.cos( angle / 180 * Math.PI ) ) - 120;
				this.y = p1.y + ( TELEPORT_RADIUS * Math.sin( angle / 180 * Math.PI ) ) - 120;
			} else if( this.alpha >= 1 ) {
				this.dAlpha = 0;
				this.alpha = 1;
			}
		}
		if( this.anim == "strike" ) {
			if( this.animations[ "strike" ].done ) {
				this.anim = "hover";
				this.animations[ "hover" ].reset();
			} else if( this.animations[ "strike" ].frame == 13 ) {
				for( var i = 0; i < entities_bProjs.length; i++ ) {
					entities_bProjs[ i ].paused = false;
				}
			}
		}
	} else {
		this.anim = "death";
		if( this.animations[ "death" ].done ) {
			this.x = this.y = -9999;
		}
	}

	this.animations[ this.anim ].left = this.left;
	this.animations[ this.anim ].update( ticks );
}

entities_bosses.push( entity_boss );

/*
	MODULE_PHYSICS
*/

function tileAt( x, y ) {
	return MAP[ Math.floor( y / TILESIZE ) ][ Math.floor( x / TILESIZE ) ];
}

function terrainCollision( p ) {
	if( p.ul[ 0 ] < 0 ) {
		p.x -= p.ul[ 0 ];
		p.x = Math.floor( p.x );
		p.dx = 0;
		p.calcHitboxes();
	}
	if( p.ul[ 1 ] < 0 ) {
		p.y -= p.ul[ 1 ];
		p.y = Math.Round( p.y );
		p.dy = 0;
		p.calcHitboxes();
	}
	if( p.br[ 1 ] > ( MAP_HEIGHT ) * TILESIZE ) {
		p.y -= p.br[ 1 ] - ( ( MAP_HEIGHT ) * TILESIZE );
		p.y = Math.floor( p.y );
		p.jumping = false;
		p.falling = false;
		p.flapping = false;
		p.flying = false;
		p.dy = 0;
		p.calcHitboxes();
	}
	if( p.br[ 0 ] > ( MAP_WIDTH ) * TILESIZE ) {
		p.x -= p.br[ 0 ] - ( ( MAP_WIDTH ) * TILESIZE );
		p.x = Math.floor( p.x );
		p.dx = 0;
		p.calcHitboxes();
	}
	if( p.dy < 0 ) {
		if( tileAt( p.ul[ 0 ], p.ul[ 1 ] ) != 0 && tileAt( p.bl[ 0 ], p.bl[ 1 ] ) == 0 ||
			tileAt( p.ur[ 0 ], p.ur[ 1 ] ) != 0 && tileAt( p.br[ 0 ], p.br[ 1 ] ) == 0 && p.ul[ 0 ] % TILESIZE ) {
			p.y = ( Math.floor( p.ul[ 1 ] / TILESIZE ) + 1 ) * TILESIZE;
			p.dy = 0;
			p.calcHitboxes();
		}
	} else if( p.dy > 0 ) {
		if( tileAt( p.bl[ 0 ], p.bl[ 1 ] ) != 0 && tileAt( p.ul[ 0 ], p.ul[ 1 ] ) == 0 ||
			tileAt( p.br[ 0 ], p.br[ 1 ] ) != 0 && tileAt( p.ur[ 0 ], p.ur[ 1 ] ) == 0 && p.ul[ 0 ] % TILESIZE ) {
			p.y = Math.floor( p.ul[ 1 ] / TILESIZE ) * TILESIZE;
			p.dy = 0;
			p.jumping = false;
			p.falling = false;
			p.flapping = false;
			p.flying = false;
			p.calcHitboxes();
		}
	}
	if( p.dx < 0 ) {
		if( tileAt( p.ul[ 0 ], p.ul[ 1 ] ) != 0 && tileAt( p.ur[ 0 ], p.ur[ 1 ] ) == 0 ||
			tileAt( p.bl[ 0 ], p.bl[ 1 ] ) != 0 && tileAt( p.br[ 0 ], p.br[ 1 ] ) == 0 && p.ul[ 1 ] % TILESIZE ) {
			p.x -= p.ul[ 0 ] - ( Math.floor( p.ul[ 0 ] / TILESIZE ) + 1 ) * TILESIZE;
			p.dx = 0;
			p.calcHitboxes();
		}
	} else if( p.dx > 0 ) {
		if( tileAt( p.ur[ 0 ], p.ur[ 1 ] ) != 0 && tileAt( p.ul[ 0 ], p.ul[ 1 ] ) == 0 ||
			tileAt( p.br[ 0 ], p.br[ 1 ] ) != 0 && tileAt( p.bl[ 0 ], p.bl[ 1 ] ) == 0 && p.ul[ 1 ] % TILESIZE ) {
			p.x -= p.ul[ 0 ] - ( Math.floor( p.ul[ 0 ] / TILESIZE ) * TILESIZE );
			p.dx = 0;
			p.calcHitboxes();
		}
	}
}

function updatePhysics( ticks ) {
	// Update all the entities
	for( var i = 0; i < entities_pProjs.length; i++ ) {
		p = entities_pProjs[ i ];
		p.update( ticks );
	}
	for( var i = 0; i < entities_bProjs.length; i++ ) {
		p = entities_bProjs[ i ];
		p.update( ticks );
	}
	for( var i = 0; i < entities_player.length; i++ ) {
		p = entities_player[ i ];
		p.update( ticks );
	}
	for( var i = 0; i < entities_bosses.length; i++ ) {
		p = entities_bosses[ i ];
		p.update( ticks );
	}
	for( var i = 0; i < entities_player.length; i++ ) {
		p = entities_player[ i ];
		terrainCollision( p );
	}
	for( var i = entities_pProjs.length - 1; i >= 0; i-- ) {
		p = entities_pProjs[ i ];
		terrainCollision( p );
		if( p.dx == 0 && p.dy == 0 ) {
			p.active = false;
		} else {
			pl = entities_bosses[ 0 ];
			if( p.ul[ 0 ] >= pl.ul[ 0 ] && p.ul[ 0 ] <= pl.br[ 0 ] ) {
				if( p.ul[ 1 ] >= pl.ul[ 1 ] && p.ul[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					pl.health -= p.damage;
					p.effect( pl );
				}
			} else if( p.ur[ 0 ] >= pl.ul[ 0 ] && p.ur[ 0 ] <= pl.br[ 0 ] ) {
				if( p.ur[ 1 ] >= pl.ul[ 1 ] && p.ur[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					pl.health -= p.damage;
					p.effect( pl );
				}
			} else if( p.bl[ 0 ] >= pl.ul[ 0 ] && p.bl[ 0 ] <= pl.br[ 0 ] ) {
				if( p.bl[ 1 ] >= pl.ul[ 1 ] && p.bl[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					pl.health -= p.damage;
					p.effect( pl );
				}
			} else if( p.br[ 0 ] >= pl.ul[ 0 ] && p.br[ 0 ] <= pl.br[ 0 ] ) {
				if( p.br[ 1 ] >= pl.ul[ 1 ] && p.br[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					pl.health -= p.damage;
					p.effect( pl );
				}
			} 
		}
	}
	for( var i = entities_pProjs.length - 1; i >= 0; i-- ) {
		p = entities_pProjs[ i ];
		if( !p.active ) entities_pProjs.splice( i, 1 );
	}
	for( var i = entities_bProjs.length - 1; i >= 0; i-- ) {
		p = entities_bProjs[ i ];
		for( var j = 0; j < entities_player.length; j++ ) {
			pl = entities_player[ j ];
			if( p.ul[ 0 ] >= pl.ul[ 0 ] && p.ul[ 0 ] <= pl.br[ 0 ] ) {
				if( p.ul[ 1 ] >= pl.ul[ 1 ] && p.ul[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					p1.health -= ( 15 + Math.floor( Math.random() * 5 ) ) * ( ( Math.floor( Math.random * 4 ) == 0 ? 2 : 1 ) );
				}
			} else if( p.ur[ 0 ] >= pl.ul[ 0 ] && p.ur[ 0 ] <= pl.br[ 0 ] ) {
				if( p.ur[ 1 ] >= pl.ul[ 1 ] && p.ur[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					p1.health -= ( 15 + Math.floor( Math.random() * 5 ) ) * ( ( Math.floor( Math.random * 4 ) == 0 ? 2 : 1 ) );
				}
			} else if( p.bl[ 0 ] >= pl.ul[ 0 ] && p.bl[ 0 ] <= pl.br[ 0 ] ) {
				if( p.bl[ 1 ] >= pl.ul[ 1 ] && p.bl[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					p1.health -= ( 15 + Math.floor( Math.random() * 5 ) ) * ( ( Math.floor( Math.random * 4 ) == 0 ? 2 : 1 ) );
				}
			} else if( p.br[ 0 ] >= pl.ul[ 0 ] && p.br[ 0 ] <= pl.br[ 0 ] ) {
				if( p.br[ 1 ] >= pl.ul[ 1 ] && p.br[ 1 ] <= pl.br[ 1 ] ) {
					p.active = false;
					p1.health -= ( 15 + Math.floor( Math.random() * 5 ) ) * ( ( Math.floor( Math.random * 4 ) == 0 ? 2 : 1 ) );
				}
			} 
		}
	}
	for( var i = entities_bProjs.length - 1; i >= 0; i-- ) {
		p = entities_bProjs[ i ];
		if( !p.active ) entities_bProjs.splice( i, 1 );
	}
	for( var i = entities_player.length - 1; i >= 0; i-- ) {
		p = entities_player[ i ];
		for( var j = 0; j < entities_bosses.length; j++ ) {
			pl = entities_bosses[ j ];
			if( p.ul[ 0 ] >= pl.ul[ 0 ] && p.ul[ 0 ] <= pl.br[ 0 ] ) {
				if( p.ul[ 1 ] >= pl.ul[ 1 ] && p.ul[ 1 ] <= pl.br[ 1 ] ) {
					p.health = 0;
				}
			} else if( p.ur[ 0 ] >= pl.ul[ 0 ] && p.ur[ 0 ] <= pl.br[ 0 ] ) {
				if( p.ur[ 1 ] >= pl.ul[ 1 ] && p.ur[ 1 ] <= pl.br[ 1 ] ) {
					p.health = 0;
				}
			} else if( p.bl[ 0 ] >= pl.ul[ 0 ] && p.bl[ 0 ] <= pl.br[ 0 ] ) {
				if( p.bl[ 1 ] >= pl.ul[ 1 ] && p.bl[ 1 ] <= pl.br[ 1 ] ) {
					p.health = 0;
				}
			} else if( p.br[ 0 ] >= pl.ul[ 0 ] && p.br[ 0 ] <= pl.br[ 0 ] ) {
				if( p.br[ 1 ] >= pl.ul[ 1 ] && p.br[ 1 ] <= pl.br[ 1 ] ) {
					p.health = 0;
				}
			} 
		}
	}
}

/*
	MODULE_ENVIRONMENT
*/

var mapCanvas = document.createElement( "canvas" );

mapCanvas.width = MAP_WIDTH * TILESIZE;
mapCanvas.height = MAP_HEIGHT * TILESIZE;

var mapCtx = mapCanvas.getContext( "2d" );

map = {};
map.updated = false;
map.update = function( ticks ) {
	this.updated = false;
}
map.render = function() {
	var tid = 0,
		tile = null;
	for( var y = 0; y < MAP_HEIGHT; y++ ) {
		for( var x = 0; x < MAP_WIDTH; x++ ) {
			tid = MAP[ y ][ x ];
			if( tid != 0 ) {
				tile = TILES[ tid ];
				mapCtx.drawImage( tile.image, tile.x, tile.y, tile.width, tile.height, x * TILESIZE, y * TILESIZE, tile.width, tile.height );
			}
		}
	}
}

map.render();

/*
	MODULE_VIEWPORT
*/
var VP_WIDTH = 20,
	VP_HEIGHT = 11.25,
	VP_OFFSET = [ ( VP_WIDTH * TILESIZE / 2 ), ( VP_HEIGHT * TILESIZE / 2 ) ];

var vpCanvas = document.getElementById( "viewport" );

vpCanvas.width = VP_WIDTH * TILESIZE;
vpCanvas.height = VP_HEIGHT * TILESIZE;

var vpCtx = vpCanvas.getContext( "2d" ),
	deathTime = -1;

function gameLoop( ticks ) {
	vpCanvas.width = VP_WIDTH * TILESIZE;
	vpCanvas.height = VP_HEIGHT * TILESIZE;
	var a, p;
	vpCtx.clearRect( 0, 0, vpCanvas.width, vpCanvas.height );
	updatePhysics( ticks );
	p1 = entities_player[ 0 ];
	if( p1.x < ( VP_WIDTH * TILESIZE / 2 ) ) {
		VP_OFFSET[ 0 ] = p1.x;
	} else if( ( MAP_WIDTH * TILESIZE - p1.x ) < ( VP_WIDTH * TILESIZE / 2 ) ) {
		VP_OFFSET[ 0 ] = VP_WIDTH * TILESIZE - ( MAP_WIDTH * TILESIZE - p1.x );
	} else {
		VP_OFFSET[ 0 ] = ( VP_WIDTH * TILESIZE / 2 );
	}
	vpCtx.drawImage( mapCanvas, p1.x - VP_OFFSET[ 0 ], p1.y - VP_OFFSET[ 1 ], vpCanvas.width, vpCanvas.height, 0, 0, vpCanvas.width, vpCanvas.height );
	for( var i = 0; i < entities_player.length; i++ ) {
		p = entities_player[ i ];
		a = p.animations[ p.anim ];
		vpCtx.drawImage( a.image, a.x, a.y, a.width, a.height, VP_OFFSET[ 0 ] + a.offset[ 0 ], VP_OFFSET[ 1 ]  + a.offset[ 1 ], a.width, a.height );
	}
	for( var i = 0; i < entities_bosses.length; i++ ) {
		p = entities_bosses[ i ];
		a = p.animations[ p.anim ];
		if( p.alpha < 1 ) {
			vpCtx.save();
			vpCtx.globalAlpha = p.alpha;
		}
		vpCtx.drawImage( a.image, a.x, a.y, a.width, a.height, p.x - p1.x + a.offset[ 0 ] + VP_OFFSET[ 0 ], p.y - p1.y + a.offset[ 1 ] + VP_OFFSET[ 1 ], a.width, a.height );
		if( p.alpha < 1 ) vpCtx.restore();
	}
	for( var i = 0; i < entities_bProjs.length; i++ ) {
		p = entities_bProjs[ i ];
		a = p.animations[ p.anim ];
		vpCtx.drawImage( a.image, a.x, a.y, a.width, a.height, p.x - p1.x + a.offset[ 0 ] + VP_OFFSET[ 0 ], p.y - p1.y + a.offset[ 1 ] + VP_OFFSET[ 1 ], a.width, a.height );
	}
	for( var i = 0; i < entities_pProjs.length; i++ ) {
		p = entities_pProjs[ i ];
		a = p.animations[ p.anim ];
		vpCtx.drawImage( a.image, a.x, a.y, a.width, a.height, p.x - p1.x + a.offset[ 0 ] + VP_OFFSET[ 0 ], p.y - p1.y + a.offset[ 1 ] + VP_OFFSET[ 1 ], a.width, a.height );
	}
	vpCtx.drawImage( img_emptybar, 0, 0, 192, 30, vpCanvas.width - 192 - 4, vpCanvas.height - 30 - 4, 192, 30 );	
	w = Math.floor( img_midbar.width * ( entity_boss.health / BOSS_MAX ) );
	if( w > 0 ) {
		vpCtx.drawImage( img_beginbar, 0, 0, 9, 12, vpCanvas.width - 28, vpCanvas.height - 31, 9, 12 );
		vpCtx.drawImage( img_midbar, 0, 0, w, 12, vpCanvas.width - 28 - w, vpCanvas.height - 31, w, 12 );
		vpCtx.drawImage( img_endbar, 0, 0, 9, 12, vpCanvas.width - 28 - w - 9, vpCanvas.height - 31, 9, 12 );
	} else if( w > 9 ){
		vpCtx.drawImage( img_beginbar, 0, 0, 9, 12, vpCanvas.width - 28, vpCanvas.height - 31, 9, 12 );
		vpCtx.drawImage( img_endbar, -w, 0, 9 + w, 12, vpCanvas.width - 28 - ( w + 9 ), vpCanvas.height - 31, 9 + w, 12 );
	} else if( w > 18 ) {
		vpCtx.drawImage( img_beginbar, 0, 0, 9 + 9 + w, 12, vpCanvas.width - 28, vpCanvas.height - 31, 9 + 9 + w, 12 );
	}
	hearts = p1.health;
	for( var i = 0; i < 2 && hearts > 0; i++ ) {
		for( var j = 0; j < 10 && hearts > 0; j++ ) {
			if( ( hearts / 10 ) < 1 ) {
				vpCtx.save();
				vpCtx.globalAlpha = hearts / 10;
				vpCtx.drawImage( img_heart, 0, 0, 15, 13, 6 + j * ( 15 + 4 ), 6 + i * ( 13 + 4 ), 15, 13 );
				vpCtx.restore();
				hearts = 0;
			} else {
				vpCtx.drawImage( img_heart, 0, 0, 15, 13, 6 + j * ( 15 + 4 ), 6 + i * ( 13 + 4 ), 15, 13 );
			}
			hearts -= 10;
		}
	}
	img = img_ice;
	switch( p1.potions[ p1.potion ] ) {
		case "healing":
			img = img_healing;
			break;
		default:
			img = img_ice;
			break;
	}
	vpCtx.drawImage( img, 0, 0, 32, 32, 195, 6, 32, 32 );
	if( entity_boss.health <= 0 ) {
		if( deathTime == -1 ) deathTime = ticks;
		vpCtx.save();
		vpCtx.globalAlpha = Math.min( 1, ( ticks - deathTime ) / 1000 );
		vpCtx.font = '80px BitFont';
		vpCtx.textAlign = 'center';
		vpCtx.fillStyle = 'white';
		vpCtx.fillText( "You Won", vpCanvas.width / 2, vpCanvas.height / 2 - 20 );
		vpCtx.lineWidth = 5;
		vpCtx.strokeStyle = 'You Won';
		vpCtx.strokeText( "You Won", vpCanvas.width / 2, vpCanvas.height / 2 - 20 );
		vpCtx.restore();
		if( Math.min( 1, ( ticks - deathTime ) / 1000 ) == 1 ) {
			vpCtx.save();
			vpCtx.globalAlpha = Math.min( 1, ( ticks - deathTime - 1000 ) / 1000 );
			vpCtx.font = '30px BitFont';
			vpCtx.textAlign = 'center';
			vpCtx.fillStyle = 'white';
			vpCtx.fillText( "Press Any Key to Restart", vpCanvas.width / 2, vpCanvas.height / 2 + 80 );
			vpCtx.lineWidth = 3;
			vpCtx.strokeStyle = 'black';
			vpCtx.strokeText( "Press Any Key to Restart", vpCanvas.width / 2, vpCanvas.height / 2 + 80 );
			vpCtx.restore();
			if( Math.min( 1, ( ticks - deathTime - 1000 ) / 1000 ) == 1 ) {
				document.addEventListener( "keydown", function() {
					document.location.reload();
				}, false );
			}	
		}
	} else if( p1.health <= 0 ) {
		if( deathTime == -1 ) deathTime = ticks;
		vpCtx.save();
		vpCtx.globalAlpha = Math.min( 1, ( ticks - deathTime ) / 1000 );
		vpCtx.font = '80px BitFont';
		vpCtx.textAlign = 'center';
		vpCtx.fillStyle = 'white';
		vpCtx.fillText( "Game Over", vpCanvas.width / 2, vpCanvas.height / 2 - 20 );
		vpCtx.lineWidth = 5;
		vpCtx.strokeStyle = 'black';
		vpCtx.strokeText( "Game Over", vpCanvas.width / 2, vpCanvas.height / 2 - 20 );
		vpCtx.restore();
		if( Math.min( 1, ( ticks - deathTime ) / 1000 ) == 1 ) {
			vpCtx.save();
			vpCtx.globalAlpha = Math.min( 1, ( ticks - deathTime - 1000 ) / 1000 );
			vpCtx.font = '30px BitFont';
			vpCtx.textAlign = 'center';
			vpCtx.fillStyle = 'white';
			vpCtx.fillText( "Press Any Key to Restart", vpCanvas.width / 2, vpCanvas.height / 2 + 80 );
			vpCtx.lineWidth = 3;
			vpCtx.strokeStyle = 'black';
			vpCtx.strokeText( "Press Any Key to Restart", vpCanvas.width / 2, vpCanvas.height / 2 + 80 );
			vpCtx.restore();
			if( Math.min( 1, ( ticks - deathTime - 1000 ) / 1000 ) == 1 ) {
				document.addEventListener( "keydown", function() {
					document.location.reload();
				}, false );
			}	
		}
	}
	window.requestAnimationFrame( gameLoop );
}

window.requestAnimationFrame( gameLoop );