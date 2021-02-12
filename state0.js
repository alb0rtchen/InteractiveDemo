var demo = {};
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){

    },
    create: function(){
        game.stage.backgroundColor = '#cc66ff';

        addNumListeners();
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