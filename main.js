var game = new Phaser.Game(1600, 1200, Phaser.AUTO);
var score = 0;
var scoreText;
game.state.add('state0',demo.state0);
game.state.add('state1',demo.state1);
game.state.start('state0');