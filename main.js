var saveGame = localStorage.getItem('moneyMakerSave');

var gameData = {
    money: 0,
    moneyPerClick: 1,
    moneyPerClickCost: 10,
    startTime: 3,
    //----------
    lastTick: Date.now()
}

function updateText(id, content) {
    document.getElementById(id).innerHTML = content;
}

function makeMoney() {
    gameData.money += gameData.moneyPerClick;
    updateText("balance", gameData.money + " Money made");
}

function buyMoneyPerClick() {
    if (gameData.money >= gameData.moneyPerClickCost) {
        gameData.money -= gameData.moneyPerClickCost;
        gameData.moneyPerClick += 1;
        gameData.moneyPerClickCost = (gameData.moneyPerClickCost * 1.5);
        updateText("balance", gameData.money + " Money made");
        updateText("upgradeButton", "Grow another Finger (Current Count: " + gameData.moneyPerClick + ") Cost: " + gameData.moneyPerClickCost)
    }
}

//This executes the main loop later,
var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now();
    gameData.money += gameData.moneyPerClick * (diff / 1000);
    updateText("balance", gameData.money + " Money made");
}, 1000)

//This saves the game every 15sec
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("moneyMakerSave", JSON.stringify(gameData))
}, 15000)

function format(number, type) {
    let exponent = Math.floor(Math.log10(number));
    let matissa = number / Math.pow(10, exponent);
}

//Set Values if save doesn't include them
if (typeof saveGame.money !== "undefined") gameData.money = saveGame.money;
if (typeof saveGame.moneyPerClick !== "undefined") gameData.moneyPerClick = saveGame.moneyPerClick;
if (typeof saveGame.moneyPerClickCost !== "undefined") gameData.money = saveGame.moneyPerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;