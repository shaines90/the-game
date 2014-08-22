window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, TMX, Audio, Anim, UI")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 320,   //to fit devices with a screne resolution of 1280 x 720
      height: 180,
      scaleToFit: true,
      maximize: "touch"
    }).controls().touch();

    Q.enableSound();
    Q.setImageSmoothing(false);

    //define scene
    Q.scene("level", function(stage){
      var player;
      Q.stageTMX("big_level.tmx", stage);

      player = Q("Player").first();
      stage.add("viewport").follow(player, {x: true, y: true});
    });

    //load assets
    Q.loadTMX("big_level.tmx, sprites.json, sprites.png, kill-enemy.mp3, jump.mp3, coin.mp3, themeSong.mp3", function(){
      Q.compileSheets("sprites.png", "sprites.json");
      Q.stageScene("level");
      Q.audio.play('themeSong.mp3',{ loop: true });
    }, {
      progressCallback: function(loaded,total) {
        var element = document.getElementById("loading_progress");
        element.style.width = Math.floor(loaded/total*100) + "%";
      }
    });

    //give lives and score on load
    Q.state.reset({ score: 0, lives: 3 });
    Q.UI.Text.extend("Score",{
      init: function(p) {
        this._super({
          label: "score: 0",
          x: 0,
          y: 0
        });

        Q.state.on("change.score",this,"score");
      },

      score: function(score) {
        this.p.label = "score: " + score;
      }
    });


    //mute music on .stopMusic button
    document.getElementById('stopMusicButton').onclick = function() {
      Q.audio.stop('themeSong.mp3');
    };

    document.getElementById('startMusicButton').onclick = function() {
      Q.audio.play('themeSong.mp3',{ loop: true });
    };

    //gameover screen overlay
    Q.scene('endGame',function(stage) {
      var styling = new Q.UI.Container({x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"});
      var container = stage.insert(styling);

      var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                      label: "Play Again" }))
      var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                       label: stage.options.label }));

      // When the button is clicked, clear all the stages and restart the game.
      button.on("click",function() {
        Q.clearStages();
        Q.stageScene('level');
      });

      // Expand the container to visibily fit it's contents
      container.fit(20);
    });
});






