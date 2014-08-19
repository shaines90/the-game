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
        this._super(p, {vx: -50, defaultDirection: "left"});
        this.add("2d, aiBounce, commonEnemy");
    }
  });

};