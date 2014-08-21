Quintus.ActionPlatformerPlayer = function(Q) {

  Q.Sprite.extend("Player", {
    init: function(p) {
      this._super(p, {
        sheet: "player",
        jumpSpeed: -300,
        speed: 150,
      });
      this.add("2d, platformerControls");
      var that = this;

      this.on("jump", function(){
        //make sure the player is not jumping already
        if(!that.p.isJumping && that.p.vy < 0) {
          //if the player is on the ground and goes up, it triggers 'isJumping'
          that.p.isJumping = true;
          Q.audio.play("jump.mp3");
        }
      });
      //when player hits the ground again, the player is no longer 'isJumping'
      this.on("bump.bottom", function(){
        that.p.isJumping = false;
      });
    },
    damage: function(){
      Q.stageScene("level");
    }
  });
};