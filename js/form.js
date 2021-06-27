class Form {
    constructor() {
        if (!deviceNotCompatible) {
            this.input = createInput("Name");
            this.button = createButton("Play");
            this.greeting = createElement("h2");
            this.title = createElement("h2");
            this.reset = createButton("Reset");
        }
    }
    display() {
        if (!deviceNotCompatible) {
            this.title.html("FRUIT CATCHER");
            this.title.position(250, 50);
            this.title.style("font-size", "70px");
            this.title.style("color", "skyblue");
            this.input.position(400, 400);
            this.input.attribute("maxlength", "7");
            this.input.style("width", "200px");
            this.input.style("height", "20px");
            this.input.style("background", "lavender");
            this.button.position(400, 500);
            this.button.style("width", "200px");
            this.button.style("height", "40px");
            this.button.style("background", "lightpink");
            this.reset.position(900, 660);
            this.reset.style("width", "100px");
            this.reset.style("height", "30px");
            this.reset.style("background", "lightpink");
            this.button.mousePressed(() => {
                this.input.hide();
                this.button.hide();
                player.name = this.input.value();
                playerCount += 1;
                player.index = playerCount;
                player.update();
                player.updateCount(playerCount);
                player.updateScores();
                this.greeting.html("Hello " + player.name)
                this.greeting.position(300, 250);
                this.greeting.style("color", "white");
                this.greeting.style("font-size", "100px");
            });
            this.reset.mousePressed(() => {
                resetGame();
            });
        }
    }
    hide() {
        if (formObj.greeting !== undefined) {
            this.greeting.hide();
            this.button.hide();
            this.input.hide();
            this.title.hide();
        }
    }
}