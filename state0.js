var demo = {};
var centerX = 1600 / 2;
var centerY = 1200 / 2;
var cat;
var speed = 10;
var dX = 0;
var dY = 0;

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('cat', 'assets/catSheet.png', 68, 63);
        game.load.image('storeBG', 'assets/storebackground.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#cc66ff';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addNumListeners();
        game.world.setBounds(0, 0, 2083, 1200);
        var treeBG = game.add.sprite(0,0, 'storeBG');
        cat = game.add.sprite(centerX, centerY, 'cat');
        cat.anchor.setTo(0.5, 0.5);
        game.physics.enable(cat);
        cat.body.collideWorldBounds = true;
        cat.animations.add('walk', [0,1,2,3]);
        game.camera.follow(cat);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
    },
    update: function(){
        dX = 0;
        dY = 0;
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            dX += 1;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            dX -= 1;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            dY -= 1;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            dY += 1;
        }
        cat.x += dX * speed;
        if(dX != 0) {
            cat.scale.setTo(1 * dX, 1);
            cat.animations.play('walk', 15, true);
        }
        else {
            cat.animations.stop('walk');
            cat.frame = 0;
        }
        cat.y += dY * speed;
        if(cat.y < 1110) {cat.y = 1110}
    }
}

function changeState(i, stateNum) {
    game.state.start('state' + stateNum);
}

function addNumListener(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addNumListeners() {
    addNumListener(Phaser.Keyboard.ZERO, changeState, 0);
    addNumListener(Phaser.Keyboard.ONE, changeState, 1);
    addNumListener(Phaser.Keyboard.TWO, changeState, 2);
}