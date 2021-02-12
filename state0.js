var demo = {};
var centerX = 1600 / 2;
var centerY = 1200 / 2;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('cat', 'assets/cat.png');
    },
    create: function(){
        game.stage.backgroundColor = '#cc66ff';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addNumListeners();

        var cat = game.add.sprite(centerX, centerY, 'cat');
        cat.anchor.setTo(0.5, 0.5);
    },
    update: function(){

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