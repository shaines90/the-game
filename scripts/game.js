leaderBoard = [{"name": "Harry", "marks": 1999}, {"name": "Sophia", "marks": 1888}, {"name": "Nick", "marks": 1777}];

window.addEventListener("load",function() {
  //give lives and score on load

  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, TMX, Audio, Anim, UI")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 820,   //to fit devices with a screne resolution of 1280 x 720
      height: 480,
      maximize: "touch"
    }).controls().touch();

    Q.enableSound();
    Q.setImageSmoothing(false);

    // Q.UI.Text.extend("Score",{
    //   init: function(p) {
    //     this._super({
    //       label: "score: 0",
    //       x: 35,
    //       y: Q.height,
    //       color: "black"
    //     });
    //   },

    //   score: function(score) {
    //     this.p.label = "score: " + score;
    //   }
    // });

    //define scene
    Q.scene("level", function(stage){
      var player;
      Q.stageTMX("big_level.tmx", stage);

      player = Q("Player").first();
      stage.add("viewport").follow(player, {x: true, y: true});
      // score = stage.insert(new Q.Score);

      // Q.state.on("change.score", function(score) {
      //   console.log("lala");
      //   score.score(score);
      // });
    });

    //load assets
    Q.loadTMX("big_level.tmx, sprites.json, sprites.png, kill-enemy.mp3, jump.mp3, coin.mp3, themeSong.mp3", function(){
      Q.compileSheets("sprites.png", "sprites.json");
      Q.stageScene("level");
      Q.audio.play('themeSong.mp3',{ loop: true });
      Q.state.reset({ score: 0, lives: 3 });
    }, {
      progressCallback: function(loaded,total) {
        var element = document.getElementById("loading_progress");
        element.style.width = Math.floor(loaded/total*100) + "%";
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

      var label = container.insert(new Q.UI.Text({x:10, y: 0,
                                                       label: stage.options.label }));
      container.insert(new Q.UI.Text({x:10, y: 30, label: "Leader Board" }));

      container.insert(new Q.UI.Text({x:-80, y: 60, label: "Pos" }));
      container.insert(new Q.UI.Text({x:0, y: 60, label: "Name" }));
      container.insert(new Q.UI.Text({x:80, y: 60, label: "Marks" }));

      var yPos = 60;
      for (index in leaderBoard) {
        var person = leaderBoard[index];
        var posNumber = parseInt(index) + 1;
        var pos = posNumber.toString();
        var marks = person.marks.toString();

        yPos = 60 + (posNumber * 20);

        container.insert(new Q.UI.Text({x:-80, y: yPos, label: pos }));
        container.insert(new Q.UI.Text({x:0, y: yPos, label: person.name }));
        container.insert(new Q.UI.Text({x:80, y: yPos, label: marks }));
      }

      var button = container.insert(new Q.UI.Button({ x: 0, y: yPos + 50, fill: "#CCCCCC",
                                                      label: "Play Again" }))

      // When the button is clicked, clear all the stages and restart the game.
      button.on("click",function() {
        Q.clearStages();
        Q.stageScene('level');
      });

      // Expand the container to visibily fit it's contents
      container.fit(20);
    });
});






