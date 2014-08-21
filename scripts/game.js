window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, TMX, Audio, Anim")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 320,   //to fit devices with a screne resolution of 1280 x 720
      height: 180,
      scaleToFit: true
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



    //mute music on .stopMusic button
    // button.on("click",function() {
    //   Q.audio.stop('themeSong.mp3');

    // Q.scene('endGame',function(stage) {
    //   var container = stage.insert(new Q.UI.Container({
    //     x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    //   }));

    //   var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
    //                                                   label: "Play Again" }))
    //   var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
    //                                                    label: stage.options.label }));
    //   // When the button is clicked, clear all the stages
    //   // and restart the game.
    //   button.on("click",function() {
    //     Q.clearStages();
    //     Q.stageScene('level1');
    //   });

    //   // Expand the container to visibily fit it's contents
    //   container.fit(20);
    // });
});






