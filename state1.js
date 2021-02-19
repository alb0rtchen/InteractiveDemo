var cannon;
var bullets;
var velocity = 1250;
var nextFire = 0;
var fireRate = 300;
var bullet;
var prevBullet;
var enemyGroup;
var jackpotGroup;
var jackpotChance = 0.1;

demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('cannon', 'assets/kittycannonSheet.png', 132, 90);
        game.load.image('bullet', 'assets/bullet.png');
    },
    create: function(){
        game.stage.backgroundColor = '#80ff80';
        addNumListeners();
        game.world.setBounds(0, 0, 1600, 1200);

        cannon = game.add.sprite(centerX, centerY, 'cannon');
        cannon.anchor.setTo(0.5);
        cannon.animations.add('shoot', [0,1]);

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('anchor.y', 0.5);
    
        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 3; i++) {
          enemyGroup.create(1300, 350 * i + 100, 'cat');
        }
        enemyGroup.setAll('anchor.y', 0.5);
        enemyGroup.setAll('anchor.x', 0.5);
        enemyGroup.setAll('scale.x', 0.4);
        enemyGroup.setAll('scale.y', 0.4);

        jackpotGroup = game.add.group();
        jackpotGroup.enableBody = true;
        jackpotGroup.physicsBodyType = Phaser.Physics.ARCADE;
        jackpotGroup.create(200, centerY, 'cat');

        scoreText = game.add.text(16, 16, 'Score: ' + score, {fontSize: '32px', fill: '#000'});
    },
    update: function(){
        cannon.rotation = game.physics.arcade.angleToPointer(cannon);
        this.spriteRotation(cannon);
        if(game.input.activePointer.isDown) {
            this.fire();
        }
        game.physics.arcade.overlap(jackpotGroup, bullets, this.hitEnemy);
        game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup);
    },
    fire: function() {
        if(game.time.now > nextFire) {
            nextFire = game.time.now + fireRate;
            if(bullet != null) {
                prevBullet = bullet;
            }
            bullet = bullets.getFirstDead();
            bullet.reset(cannon.x, cannon.y);
      
            game.physics.arcade.moveToPointer(bullet, velocity);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet);
            this.spriteRotation(bullet);

            cannon.animations.play('shoot', 15, false);
        }
    },
    hitEnemy: function(e) {
        console.log('hit');
        e.kill();
        if(prevBullet != null) {
            prevBullet.kill();
        }
        else {
            bullet.kill();
        }
        score += 10;
        scoreText.text = 'Score: ' + score;
    },
    hitGroup: function(e) {
        if(prevBullet != null) {
            prevBullet.kill();
        }
        else {
            bullet.kill();
        }
        e.kill();
        score += 1;
        scoreText.text = 'Score: ' + score;
        var randX, randY;
        randX = game.world.randomX;
        randY = game.world.randomY;
        if(randX < 64) {randX = 64}
        if(randX > game.world.width - 64) {randX = game.world.width - 64}
        if(randY < 64) {randY = 64}
        if(randY > game.world.height - 64) {randY = game.world.height - 64}
        enemyGroup.create(randX, randY, 'cat');
        enemyGroup.setAll('anchor.y', 0.5);
        enemyGroup.setAll('anchor.x', 0.5);
        enemyGroup.setAll('scale.x', 0.4);
        enemyGroup.setAll('scale.y', 0.4);
        var roll = Math.random();
        console.log(roll);
        if(roll <= jackpotChance) {
            randX = game.world.randomX;
            randY = game.world.randomY;
            if(randX < 64) {randX = 64}
            if(randX > game.world.width - 64) {randX = game.world.width - 64}
            if(randY < 64) {randY = 64}
            if(randY > game.world.height - 64) {randY = game.world.height - 64}
            jackpotGroup.create(randX, randY, 'cat');
        }
    },
    spriteRotation: function(obj) {
        if(Math.abs(obj.rotation) > 1.5) {
            obj.scale.setTo(1, -1);
        }
        else {
            obj.scale.setTo(1, 1);
        }
    },
}