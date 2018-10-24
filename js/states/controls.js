class Dpad {
	static preload(game) {
		game.load.image('stick_bot', "sprites/stick/bot.png");
		game.load.image('stick_top', "sprites/stick/top.png");
	}

	constructor(obj){
		this.game = obj;

		this.stickBot;
		this.stickTop;

		this.x;
		this.y;

		this.stickWidth = GAME_HEIGHT/5;
		this.stickHeight = GAME_HEIGHT/5;
	}

	debugOn(){
		this.stickTop.debugShowBody = true;
		this.stickBot.debugShowBody = true;
		this.dragger.debugShowBody = true;
	}

	create(){
		this.x = GAME_WIDTH - ((GAME_WIDTH/20)*18);
		this.y = (GAME_HEIGHT/14)*12;


		this.stickBot = this.game.physics.add.image(this.x, this.y, 'stick_bot')
						.setDisplaySize(this.stickWidth, this.stickHeight);

		this.stickTop = this.game.physics.add.image(this.x, this.y, 'stick_top')
						.setDisplaySize(this.stickWidth, this.stickHeight);

		this.dragger = this.game.physics.add.image(this.x, this.y, 'stick_top')
						.setDisplaySize(this.stickWidth, this.stickHeight).setTint(3);

		this.dragger.origin = this.dragger.getCenter();

		this.stickTop.debugShowBody = false;
		this.stickBot.debugShowBody = false;
		this.dragger.debugShowBody = false;

		this.stickBot.setScrollFactor(0);
		this.stickTop.setScrollFactor(0);
		this.dragger.setScrollFactor(0);

		this.dragger.setInteractive();
		this.game.input.setDraggable(this.dragger);

		this.dragger.isBeingDragged = true;

		this.dragger.bot = this.stickBot;
		this.dragger.top = this.stickTop;

		this.dragger.getCenter().reset();

		this.stickTop.checkDistance = function(){
			return Phaser.Math.Distance.Between(this.bot.body.center.x,
												this.bot.body.center.y,
												this.body.center.x,
												this.body.center.y);

		}

		//console.log(this.stickTop.bot);

		//отпускание 

		//events for drag  drag  dragstart  dragend

		this.stickTop.on('dragstart', function () {
			this.isBeingDragged = true;
			//this for gameObject
	    });

		//нажатие
		this.stickTop.on('dragend', function () {
			this.isBeingDragged = false;
	    });

	    this.stickTop.on('drag', function (pointer, dragX, dragY) {
	    	
	    });

	    
		//Относится ко всем инпутам

		this.game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
	        gameObject.x = dragX;
	        gameObject.y = dragY;
	        

	        console.log(gameObject.getCenter().lengthSq());
	        //console.log(gameObject.getCenter().subtract(gameObject.origin));
    	});

    	this.game.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {

    	});

    	this.game.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
	        gameObject.setPosition(gameObject.origin.x, gameObject.origin.y);
	        gameObject.top.setPosition(gameObject.origin.x, gameObject.origin.y);
    	});

		this.stickBot.setImmovable(true);
	}

	update(){

	}
}




const GetValue = Phaser.Utils.Objects.GetValue;
const Key = Phaser.Input.Keyboard.Key;
const GetDist = Phaser.Math.Distance.Between;
const GetAngle = Phaser.Math.Angle.Between;
const RadToDeg = Phaser.Math.RadToDeg;
const MathWrap = Phaser.Math.Wrap;

class VectorToCursorKeys {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        if (this.start == undefined) {
            this.start = {};
        }
        if (this.end == undefined) {
            this.end = {};
        }
        this.noKeyDown = GetValue(o, 'noKeyDown', true);
        if (this.cursorKeys == undefined) {
            this.cursorKeys = {
                up: new Key(),
                down: new Key(),
                left: new Key(),
                right: new Key()
            }
        }

        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'dir', '8dir'));
        this.setDistanceThreshold(GetValue(o, 'forceMin', 16));

        var startX = GetValue(o, "start.x", null);
        var startY = GetValue(o, "start.y", null);
        var endX = GetValue(o, "end.x", null);
        var endY = GetValue(o, "end.y", null);
        this.setVector(startX, startY, endX, endY);
        return this;
    }

    toJSON() {
        return {
            enable: this.enable,
            dir: this.dirMode,
            forceMin: this.forceMin,

            noKeyDown: this.noKeyDown,
            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            }
        };
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        } else {
            e = !!e;
        }
        if (e === this.enable) {
            return;
        }
        if (e === false) {
            this.cleanVector();
        }
        this.enable = e;
    }

    setDistanceThreshold(d) {
        if (d < 0) {
            d = 0;
        }
        this.forceMin = d;
        return this;
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];

        if (!key.enabled) {
            return;
        }

        var isUp = !isDown;
        key.isDown = isDown;
        key.isUp = isUp;
        if (isDown) {
            this.noKeyDown = false;
        }
    }

    getKeyState(keyName) {
        return this.cursorKeys[keyName];
    }

    cleanVector() {
        this.start.x = 0;
        this.start.y = 0;
        this.end.x = 0;
        this.end.y = 0;
        this.noKeyDown = true;
        for (var keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }

        return this;
    }

    setVector(x0, y0, x1, y1) {
        this.cleanVector();
        if (!this.enable) {
            return this;
        }
        if (x0 === null) {
            return this;
        }

        this.start.x = x0;
        this.start.y = y0;
        this.end.x = x1;
        this.end.y = y1;
        if (this.force < this.forceMin) {
            return this;
        }

        var angle = (this.angle + 360) % 360;
        switch (this.dirMode) {
            case 0: // up & down
                var keyName = (angle < 180) ? 'down' : 'up';
                this.setKeyState(keyName, true);
                break;
            case 1: // left & right
                var keyName = ((angle > 90) && (angle <= 270)) ? 'left' : 'right';
                this.setKeyState(keyName, true);
                break;
            case 2: // 4 dir
                var keyName =
                    ((angle > 45) && (angle <= 135)) ? 'down' :
                    ((angle > 135) && (angle <= 225)) ? 'left' :
                    ((angle > 225) && (angle <= 315)) ? 'up' :
                    'right';
                this.setKeyState(keyName, true);
                break;
            case 3: // 8 dir
                if ((angle > 22.5) && (angle <= 67.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('right', true);
                } else if ((angle > 67.5) && (angle <= 112.5)) {
                    this.setKeyState('down', true);
                } else if ((angle > 112.5) && (angle <= 157.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('left', true);
                } else if ((angle > 157.5) && (angle <= 202.5)) {
                    this.setKeyState('left', true);
                } else if ((angle > 202.5) && (angle <= 247.5)) {
                    this.setKeyState('left', true);
                    this.setKeyState('up', true);
                } else if ((angle > 247.5) && (angle <= 292.5)) {
                    this.setKeyState('up', true);
                } else if ((angle > 292.5) && (angle <= 337.5)) {
                    this.setKeyState('up', true);
                    this.setKeyState('right', true);
                } else {
                    this.setKeyState('right', true);
                }
                break;
        }

        return this;
    }

    get forceX() {
        return this.end.x - this.start.x;
    }

    get forceY() {
        return this.end.y - this.start.y;
    }

    get force() {
        return GetDist(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get rotation() {
        return GetAngle(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get angle() {
        return RadToDeg(this.rotation);; // -180 ~ 180
    }

    get octant() {
        var octant = 0;
        if (this.rightKeyDown) {
            octant = (this.downKeyDown) ? 45 : 0;
        } else if (this.downKeyDown) {
            octant = (this.leftKeyDown) ? 135 : 90;
        } else if (this.leftKeyDown) {
            octant = (this.upKeyDown) ? 225 : 180;
        } else if (this.upKeyDown) {
            octant = (this.rightKeyDown) ? 315 : 270;
        }
        return octant;
    }

    get upKeyDown() {
        return this.cursorKeys.up.isDown;
    }

    get downKeyDown() {
        return this.cursorKeys.down.isDown;
    }

    get leftKeyDown() {
        return this.cursorKeys.left.isDown;
    }

    get rightKeyDown() {
        return this.cursorKeys.right.isDown;
    }

    get anyKeyDown() {
        return !this.noKeyDown;
    }
}

/** @private */
const DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
};




const EE = Phaser.Events.EventEmitter;
const CircleClass = Phaser.Geom.Circle;
const CircleContains = Phaser.Geom.Circle.Contains;

class TouchCursor extends VectorToCursorKeys {
    constructor(gameObject, config) {
        super(config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        this.events = new EE();
        this.scene = gameObject.scene;
        this.gameObject = gameObject;
        this.radius = GetValue(config, 'radius', 100);
        gameObject.setInteractive(new CircleClass(gameObject.displayOriginX, gameObject.displayOriginY, this.radius), CircleContains);
        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.pointer = undefined;

        return this;
    }

    toJSON() {
        var o = super.toJSON();
        o.radius = this.radius;

        return o;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onKeyDownStart, this);
        this.gameObject.on('pointerover', this.onKeyDownStart, this);

        this.scene.input.on('pointermove', this.onKeyDown, this);
        this.scene.input.on('pointerup', this.onKeyUp, this);

        this.gameObject.on('destroy', this.destroy, this);
    }

    shutdown() {
        this.scene.input.off('pointermove', this.onKeyDown, this);
        this.scene.input.off('pointerup', this.onKeyUp, this);
        // gameObject events will be removed when this gameObject destroyed 

        this.events.destroy();

        this.pointer = undefined;
        this.scene = undefined;
        this.gameObject = undefined;
        this.events = undefined;
    }

    destroy() {
        this.shutdown();
    }

    onKeyDownStart(pointer) {
        if ((!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.onKeyDown(pointer);
    }

    onKeyDown(pointer) {
        if (this.pointer !== pointer) {
            return;
        }

        var p0 = this.gameObject,
            p1 = pointer;
        this.setVector(p0.x, p0.y, p1.x, p1.y);
        this.events.emit('update');
    }

    onKeyUp(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
        this.cleanVector();
        this.events.emit('update');
    }

    on() {
        var ee = this.events;
        ee.on.apply(ee, arguments);
        return this;
    }

    once() {
        var ee = this.events;
        ee.once.apply(ee, arguments);
        return this;
    }

}


class VirtualJoyStick {
    constructor(scene, config) {
        this.scene = scene;
        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
        this.radius = GetValue(config, 'radius', 100);

        this.addBase(GetValue(config, 'base', undefined), config);
        this.addThumb(GetValue(config, 'thumb', undefined));

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        this.base.setPosition(x, y);
        this.thumb.setPosition(x, y);

        if (GetValue(config, 'fixed', true)) {
            this.setScrollFactor(0);
        }

        this.boot();
    }

    createCursorKeys() {
        return this.touchCursor.createCursorKeys();
    }

    get forceX() {
        return this.touchCursor.forceX;
    }

    get forceY() {
        return this.touchCursor.forceY;
    }

    get force() {
        return this.touchCursor.force;
    }

    get rotation() {
        return this.touchCursor.rotation;
    }

    get angle() {
        return this.touchCursor.angle; // -180 ~ 180
    }

    get up() {
        return this.touchCursor.upKeyDown;
    }

    get down() {
        return this.touchCursor.downKeyDown;
    }

    get left() {
        return this.touchCursor.leftKeyDown;
    }

    get right() {
        return this.touchCursor.rightKeyDown;
    }

    get noKey() {
        return this.touchCursor.noKeyDown;
    }

    get pointerX() {
        return this.touchCursor.end.x;
    }

    get pointerY() {
        return this.touchCursor.end.y;
    }

    get pointer() {
        return this.touchCursor.pointer;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    set x(x) {
        this.base.x = x;
    }

    set y(y) {
        this.base.y = y;
    }

    get x() {
        return this.base.x;
    }

    get y() {
        return this.base.y;
    }

    setVisible(visible) {
        this.visible = visible;
    }

    toggleVisible() {
        this.visible = !this.visible;
    }

    get visible() {
        return this.base.visible;
    }

    set visible(visible) {
        this.base.visible = visible;
        this.thumb.visible = visible;
    }

    setEnable(value) {
        this.enable = value;
        return this;
    }

    toggleEnabl() {
        this.enable = !this.enable;
    }

    get enable() {
        return this.touchCursor.enable;
    }

    set enable(value) {
        this.touchCursor.setEnable(value);
    }

    on() {
        var ee = this.touchCursor.events;
        ee.on.apply(ee, arguments);
        return this;
    }

    once() {
        var ee = this.touchCursor.events;
        ee.once.apply(ee, arguments);
        return this;
    }

    setVisible(visible) {
        this.visible = visible;
        return this;
    }

    addBase(gameObject, config) {
        if (this.base) {
            this.base.destroy();
            // Also destroy touchCursor behavior
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, this.radius)
                .setStrokeStyle(3, 0x0000ff);
        }
        this.touchCursor = new TouchCursor(gameObject, config)
        this.base = gameObject;
        return this;
    }

    addThumb(gameObject) {
        if (this.thumb) {
            this.thumb.destroy();
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, 40)
                .setStrokeStyle(3, 0x00ff00);
        }
        this.thumb = gameObject;
        return this;
    }

    setScrollFactor(scrollFactor) {
        this.base.setScrollFactor(scrollFactor);
        this.thumb.setScrollFactor(scrollFactor);
    }

    boot() {
        this.touchCursor.on('update', this.update, this);
    }

    destroy() {
        this.base.destroy(); // Also destroy touchCursor behavior
        this.thumb.destroy();

        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
    }

    update() {
        var touchCursor = this.touchCursor;
        if (touchCursor.anyKeyDown) {
            if (touchCursor.force > this.radius) {
                var rad = touchCursor.rotation;
                this.thumb.x = touchCursor.start.x + (Math.cos(rad) * this.radius);
                this.thumb.y = touchCursor.start.y + (Math.sin(rad) * this.radius);
            } else {
                this.thumb.x = touchCursor.end.x;
                this.thumb.y = touchCursor.end.y;
            }
        } else {
            this.thumb.x = this.base.x;
            this.thumb.y = this.base.y;
        }
        return this;
    }


}