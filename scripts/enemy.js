Quintus.ActionPlatformerEnemy = function(Q) {

  Q.component("commonEnemy", {
    added: function() {
      var entity = this.entity;
      //enemy hits player left, right or top
      entity.on("bump.left, bump.right, bump.bottom", function(collision){
        if(collision.obj.isA("Player")) {
      //kill player
          console.log('You died!');
        }
      });
      entity.on("bump.top", function(collision){
        if(collision.obj.isA("Player")) {
          //player lands on top of enemy
          //make the player jump
          collision.obj.p.vy = -100;
          //kill enemy
          this.destroy();
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
      this.p.vyDirection = this.p.vy / Math.abs(this.p.vy);
    }
  });







};
