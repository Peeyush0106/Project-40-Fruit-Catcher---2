class Game {
    constructor() {
    }
    // Get the state of the game
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
        if (gameState === 1) {
            clear();
            text("Try playing again later... Player limit has reached. Oher players are playing.", 10, 300);
        }
    }
    // Update the game state to the database
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    // Start the game and show the formObj
    async start() {
        console.log("Game start");
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            formObj = new Form()
            formObj.display();
        }
        // Create Players
        ////////////////////////////////////////////////////////////////////////
        /**/ player1 = createSprite(200, 500);                                //
        /**/ player1.addImage("player1", player_img);                         //
        /**/ player2 = createSprite(800, 500);                                //
        /**/ player2.addImage("player2", player_img);                         //
        /**/ players = [player1, player2];                                    //
        /**/ for (var i in players) {                                         //
        /**/     var playerObj = players[i];                                  //
        /**/     playerObj.bounceOff(edges[0]);                               //
        /**/     playerObj.bounceOff(edges[1]);                               //
        }                                                                     //
        ////////////////////////////////////////////////////////////////////////
    }
    // When the players are playing the game
    play() {
        // Hide formObj
        formObj.hide();

        //Get player information
        Player.getPlayerInfo();
        player.updateScores();
        player.getPlayerScores();

        // Show the background as it clears with the clear() function
        image(back_img, 0, 0, 1000, 800);

        // SHow play buttons
        for (var m in buttons) {
            var button = buttons[m];
            button.show();
        }

        if (gameExited) {
            clear();
            alert("The other player has exited the game, try waiting for another one and refresh the page...");
            gameExited = false;
        }

        // Create Fruits
        ////////////////////////////////////////////////////////////////////////
        /**/if (frameCount % 30 === 0) {                                      //
        /**/    var fruit = createSprite(random(100, 900), -100, 100, 100);   //
        /**/    fruit.velocityY = 6;                                          //
        /**/    var rand = Math.round(random(1, 5));                          //
        /**/                                                                  //
        /**/switch (rand) {                                                   //
        /**/   case 1: fruit.addImage("fruit1", fruit1_img);                  //
        /**/   break;                                                         //
        /**/   case 2: fruit.addImage("fruit1", fruit2_img);                  //
        /**/   break;                                                         //
        /**/   case 3: fruit.addImage("fruit1", fruit3_img);                  //
        /**/   break;                                                         //
        /**/   case 4: fruit.addImage("fruit1", fruit4_img);                  //
        /**/   break;                                                         //
        /**/   case 5: fruit.addImage("fruit1", fruit5_img);                  //
        /**/   break;                                                         //
            }                                                                 //
        /**/    fruits.push(fruit);                                           //
        }                                                                     //
        ////////////////////////////////////////////////////////////////////////

        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();

        // When the fruit is touching the basket, we will collect it.
        for (var l in fruits) {
            var fruitLocal = fruits[l];
            if (fruitLocal.isTouching(players[player.index - 1])) {
                player.score += 1;
                fruitLocal.destroy();
            }
            if (fruitLocal.isTouching(edges[2])) {
                fruitLocal.destroy();
            }
        }
        for (var plr in allPlayers) {
            index = index + 1;
            x = 500 - allPlayers[plr].distance;
            y = 500;
            players[index - 1].x = x;
            players[index - 1].y = y;
            fill("black");
            textSize(25);
            text(allPlayers[plr].name, x - 25, y + 25);
            fill("white");
            if (allPlayerScores !== undefined
                && allPlayerScores.player1 !== undefined
                && allPlayerScores.player1.score !== undefined
                && allPlayerScores.player2 !== undefined
                && allPlayerScores.player2.score !== undefined) {
                text(allPlayers.player1.name + ": " + allPlayerScores.player1.score, 20, 50);
                text(allPlayers.player2.name + ": " + allPlayerScores.player2.score, 20, 100);
            }
        }
        for (var k in players) {
            var playerObj = players[k];
            if (!(playerObj.isTouching(edges[0])) && !(playerObj.isTouching(edges[1])) && player.index !== null) {
                if (keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW)) {
                    moveRight = true;
                }
                if (keyIsDown(LEFT_ARROW) || keyIsDown(DOWN_ARROW)) {
                    moveLeft = true;
                }
            }
        }
    }
    createPlayButtons() {
        function isTouchDevice() {
            return typeof window.ontouchstart !== 'undefined';
        }
        if (isTouchDevice() === true) {
            alert("Device not compatible");
            deviceNotCompatible = true;
            document.getElementById("not-compatible-device-txt").style.display = "block";
        }
        else {
            this.createNonTouchPlayButtons();
        }
    }
    // Also check style.css for knowing the styles added to these buttons
    createNonTouchPlayButtons() {
        buttons.push(createButton("Left").attribute("class", "buttonsClass").position(x1, 500).mousePressed(() => {
            moveLeft = true;
        }).hide());

        buttons.push(createButton("Right").attribute("class", "buttonsClass").position(x2, 500).mousePressed(() => {
            moveRight = true;
        }).hide());
    }
}