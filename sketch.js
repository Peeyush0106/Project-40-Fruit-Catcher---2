/*                                              
                                                        |   |
                                                        |---| |--| | |  __
                                                        |   | |--| | | |  |
                                                        |   | |___ | | |__|
*/

// Initial Variable Declaration
var database;
var back_img;
var gameState = 0;
var playerCount = 0;
var allPlayers, allPlayerScores;

var player, formObj, game;
var player1, player2;
var players;
var fruits = [];
var caughtFruits = [];
var cuahgtFruitsGoUp;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;

var edges;

var edgeLeft, edgeRight, edgeDown;

var x, buttons;

var moveLeft, moveRight;
var gameExited, deviceNotCompatible;

// Preload of Images in the program
function preload() {
    back_img = loadImage("images/jungle.jpg");
    player_img = loadImage("images/basket2.png");
    fruit1_img = loadImage("images/apple2.png");
    fruit2_img = loadImage("images/banana2.png");
    fruit3_img = loadImage("images/melon2.png");
    fruit4_img = loadImage("images/orange2.png");
    fruit5_img = loadImage("images/pineapple2.png");
}

// Initial setup of the game
function setup() {
    createCanvas(1000, 600);

    // Game Essential Database Setup
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
    buttons = [];

    // Edges
    edgeLeft = createSprite(1025, canvas.height / 2, 50, canvas.height);
    edgeRight = createSprite(-25, canvas.height / 2, 50, canvas.height);
    edgeDown = createSprite(canvas.width / 2, 700, canvas.width, 50);

    edges = [edgeLeft, edgeRight, edgeDown];

    // Game External Variables
    x1 = 730;
    x2 = 840;
    game.createPlayButtons();
}

// Continuous game script run
function draw() {
    // Internet speed is enough for database loads
    if (firebase !== undefined && database !== undefined && !deviceNotCompatible) {
        // Background
        background(back_img);

        buttons[0].style("background-color", "blue");
        buttons[1].style("background-color", "blue");

        // Setting Game Types
        if (playerCount === 2) {
            game.update(1);
        }
        if (gameState === 1) {
            clear();
            game.play();
        }
        if (gameState === 2) {
            game.end();
        }

        // Moving of Baskets
        if (moveLeft === true) {
            moveLeftSide();
        }
        if (keyWentUp(LEFT_ARROW) || keyWentUp(UP_ARROW)) {
            moveLeft = false;
        }
        if (moveRight === true) {
            moveRightSide();
        }
        if (keyWentUp(RIGHT_ARROW) || keyWentUp(DOWN_ARROW)) {
            moveRight = false;
        }
    }
    // Internet speed is low.
    if (firebase === undefined || database === undefined) {
        alert("Seems like your internet speed is not quite good");
    }
    if (deviceNotCompatible && formObj && formObj.greeting !== undefined) {
        formObj.hide();
        formObj.reset.hide();
    }
}

// Move baskets
// Left
function moveLeftSide() {
    moveRight = false;
    player.distance += 10
    player.update();
    var button = buttons[0];
    button.style("background-color", "#3e8e41");
}
// Right
function moveRightSide() {
    moveLeft = false;
    player.distance -= 10
    player.update();
    var button = buttons[1];
    button.style("background-color", "#3e8e41");
}

// When the buttons were released.
function mouseReleased() {
    moveLeft = false;
    moveRight = false;
}

function resetGame() {
    player.updateCount(0);
    game.update(0);
    database.ref("allPlayerInfo").remove();
    clear();
    location.reload();
}