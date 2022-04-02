var gameData = {
    money: 0,
    moneyPerClick: 1,
    moneyPerClickCost: 10,
    startTime: 3,
    //----------
    update: 1 //TODO: Increment each update
}

function makeMoney() {
    gameData.money += gameData.moneyPerClick
    document.getElementById("balance").innerHTML = gameData.money + " Money made";

}

function buyMoneyPerClick() {
    if (gameData.money >= gameData.moneyPerClickCost) {
        gameData.money -= gameData.moneyPerClickCost
        gameData.moneyPerClick += 1
        gameData.moneyPerClickCost *= 1.5
        document.getElementById("balance").innerHTML = gameData.money + " Money made";
        document.getElementById("perClickUpgrade").innerHTML = "Grow another Finger (Current Count:" + gameData.moneyPerClick + ") Cost: " + gameData.moneyPerClickCost;
    }
}


var mainGameLoop = window.setInterval(function() {
    makeMoney()
}, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("moneyMakerSave", JSON.stringify(gameData))
}, 15000)

var saveGame = JSON.parse(localStorage.getItem("moneyMakerSave"))
if (saveGame !== null) {
    if (saveGame.update == gameData.update) {
        gameData = saveGame
    }
    /*if (typeof saveGame.value !== "undefined")  gameData.value = saveGame.value;
     */
}