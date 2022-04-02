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
    updateText("balance", format(gameData.money, "scientific") + " Money made");
}

function buyMoneyPerClick() {
    if (gameData.money >= gameData.moneyPerClickCost) {
        gameData.money -= gameData.moneyPerClickCost;
        gameData.moneyPerClick += 1;
        gameData.moneyPerClickCost = (gameData.moneyPerClickCost * 1.5);
        updateText("balance", format(gameData.money, "scientific") + " Money made");
        updateText("upgradeButton", "Grow another Finger (Current Count: " + format(gameData.moneyPerClick, "scientific") + ") Cost: " + format(gameData.moneyPerClickCost, "scientific"))
    }
}

//This executes the main loop later,
var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now();
    gameData.money += gameData.moneyPerClick * (diff / 1000);
    updateText("balance", format(gameData.money, "scientific") + " Money made");
}, 1000)

//This saves the game every 15sec
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("moneyMakerSave", JSON.stringify(gameData))
}, 15000)

function format(number, type) {
    let exponent = Math.floor(Math.log10(number));
    let mantissa = number / Math.pow(10, exponent);
    if (exponent < 3) return number.toFixed(1);
    if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent;
    if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3);
}

//Set Values if save doesn't include them
if (typeof saveGame.money !== "undefined") gameData.money = saveGame.money;
if (typeof saveGame.moneyPerClick !== "undefined") gameData.moneyPerClick = saveGame.moneyPerClick;
if (typeof saveGame.moneyPerClickCost !== "undefined") gameData.money = saveGame.moneyPerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;