class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score = 0;
    }
    // Get the count of the player
    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        });

    }
    // Update the count of the player
    updateCount(count) {
        var databaseRef = database.ref('/').update({
            playerCount: count
        });
        if (databaseRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
    // Update Player Information
    update() {
        var playerIndex = "allPlayerInfo/players/player" + this.index;
        var obj = this;
        var playerIndexRef = database.ref(playerIndex).update({
            name: obj.name,
            distance: obj.distance,
        });
        if (playerIndexRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
    updateScores() {
        var obj = this;
        var playerIndex = "allPlayerInfo/playerScores/player" + this.index;
        var playerIndexRef = database.ref(playerIndex).update({
            score: obj.score
        });
        if (playerIndexRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
    // Get Player Information
    static getPlayerInfo() {
        var playerInfoRef = database.ref('allPlayerInfo/players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        });
        if (playerInfoRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
    getPlayerScores() {
        var playerInfoRef = database.ref('allPlayerInfo/playerScores');
        playerInfoRef.on("value", (data) => {
            allPlayerScores = data.val();
        });
        if (playerInfoRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
}
