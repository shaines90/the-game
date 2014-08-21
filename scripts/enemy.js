Quintus.ActionPlatformerEnemy = function(Q) {

  Q.component("commonEnemy", {
    added: function() {
      var entity = this.entity;
      //enemy hits player left, right or top
      entity.on("bump.left, bump.right, bump.bottom", function(collision){
        if(collision.obj.isA("Player")) {
      //stop theme music
          Q.audio.stop('themeSong.mp3')
      //death music
          Q.audio.play('kill-enemy.mp3');
      //message saying you died
          Q.stageScene("endGame",1, { label: "You Died" });
      //damage player on hit
          collision.obj.damage();
      //set score to 0
          Q.state.set("score",0);
          Q.state.get("score");
        }
      });
      entity.on("bump.top", function(collision){
        if(collision.obj.isA("Player")) {
          //player lands on top of enemy
          //make the player jump
          collision.obj.p.vy = -100;
          //play sound when enemy dies
          Q.audio.play('kill-enemy.mp3');
          //kill enemy
          this.destroy();
          //add 50 to the score
          Q.state.inc("score",50);
          console.log("your score has increased by 50");
          Q.state.get("score");
        }
      });
    }
  });

  Q.Sprite.extend("GroundEnemy", {
    init: function(p) {
      //sets the enemies velocity and direction
      this._super(p, {vx: -50, defaultDirection: "left"});
      //add common enemy and collision elements
      this.add("2d, aiBounce, commonEnemy");
    },
    step: function(dt) {
      //finds the direction - will be either 1 or -1
      var dirX = this.p.vx / Math.abs(this.p.vx);
      //find the ground under the enemy
      var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      //finds the ground next to the enemy
      var nextElement = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      //checks the next tile
      var nextTile;

      //locates the next tile
      if(nextElement instanceof Q.TileLayer) {
        nextTile = true;
      }

      //if we are on the ground and there is a cliff
      if(!nextTile && ground) {
        if(this.p.vx > 0){
          if(this.p.defaultDirection == "right") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        else {
          if(this.p.defaultDirection == "left") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        this.p.vx = -this.p.vx;
      }
    }
  });

  Q.Sprite.extend("VerticalEnemy", {
    init: function(p) {
      this._super(p, {vy: -100, rangeY: 40, gravity: 0 });
      this.add("2d, commonEnemy");

      //finds the enemies current y value
      this.p.initialY = this.p.y;
      //finds the enemies initial velocity
      this.p.initialVy = this.p.vy;
      //finds the direction - will be either 1 or -1
      this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);

      //listen for hitting top or bottom to change direction
      this.on("bump.top, bump.bottom",function(collision) {
        that.p.vy = -Math.abs(that.p.initialVy) * that.p.vyDirection;
        that.p.vyDirection = that.p.vy/Math.abs(that.p.vy);
      });

    },
    //compare direction & range - then flip movement and direction of enemy
    step: function(dt) {
      if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
        this.p.vy = -this.p.vy;
        this.p.vyDirection *= -1;
      }
      else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
        this.p.vy = -this.p.vy;
        this.p.vyDirection *= -1;
      }
    }
  });


};
