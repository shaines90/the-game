leaderBoard = [];
result = 'XXX';
gameWidth = 820;
gameHeight = 480;

window.addEventListener("load",function() {
  //give lives and score on load
  result = prompt("Enter your name");

  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, TMX, Audio, Anim, UI")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: gameWidth,   //to fit devices with a screne resolution of 1280 x 720
      height: gameHeight,
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
      stage.add("viewport").follow(player);

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
      Q.state.reset({ score: 0, lives: 3, die: false });
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
      var styling = new Q.UI.Container({x: Q.width/2, y: 50, fill: "rgba(0,0,0,0.5)"});
      var container = stage.insert(styling);

      var label = container.insert(new Q.UI.Text({x:10, y: 0, color: "white",
                                                       label: stage.options.label }));
      container.insert(new Q.UI.Text({x:10, y: 30, label: "Leaderboard", color: "white"  }));

      container.insert(new Q.UI.Text({x:-80, y: 60, label: "#", color: "white" }));
      container.insert(new Q.UI.Text({x:0, y: 60, label: "Name", color: "white" }));
      container.insert(new Q.UI.Text({x:80, y: 60, label: "Score", color: "white" }));

      leaderBoard.push({"name": result, "marks": Q.state.get("score").toString()});

      var yPos = 60;
      for (index in leaderBoard) {
        var person = leaderBoard[index];
        var posNumber = parseInt(index) + 1;
        var pos = posNumber.toString();
        var marks = person.marks.toString();

        yPos = 60 + (posNumber * 25);

        container.insert(new Q.UI.Text({x:-80, y: yPos, label: pos, color: "white"  }));
        container.insert(new Q.UI.Text({x:0, y: yPos, label: person.name, color: "white"  }));
        container.insert(new Q.UI.Text({x:100, y: yPos, label: marks, color: "white"  }));
      }

      var button = container.insert(new Q.UI.Button({ x: 0, y: yPos + 70, fill: "#CCCCCC", color: "white" ,
                                                      label: "Play Again" }))

      // When the button is clicked, clear all the stages and restart the game.
      button.on("click",function() {
        Q.clearStages();
        Q.state.set({ score: 0 });
        Q.state.set({die: false});
        Q.stageScene('level');
      });

      // Expand the container to visibily fit it's contents
      container.fit(20);
    });
});






