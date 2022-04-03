//Array of Game Data
var gameData = {
    money: 0,
    moneyPerClick: 1,
    moneyPerClickCost: 10,
    resetCounter: 0,
    nextResetCost: 1000000000000000000.0,
    //----------
    //Time
    lastTick: Date.now(),
    //----------
    //Setting value
    exponentRule: "scientific"
}

//Settings
function setScientific() {
    gameData.exponentRule = "scientific"
    updateText("scroll-text", "Scientific Notation enabled!")
    updateText("perClickUpgrade", "Current Printer Count: " + format(gameData.moneyPerClick, gameData.exponentRule) + " | Cost: " + format(gameData.moneyPerClickCost, gameData.exponentRule) + " Money");
}

function setEngineering() {
    gameData.exponentRule = "engineering"
    updateText("scroll-text", "Engineering Notation enabled!")
    updateText("perClickUpgrade", "Current Printer Count: " + format(gameData.moneyPerClick, gameData.exponentRule) + " | Cost: " + format(gameData.moneyPerClickCost, gameData.exponentRule) + " Money");
}

//Smart Text Setter
function updateText(id, content) {
    document.getElementById(id).innerHTML = content;
}

//Click Function
function makeMoney() {
    gameData.money += gameData.moneyPerClick;
    updateText("balance", format(gameData.money, gameData.exponentRule) + " Money made");
    updateText("scroll-text", "Money made!")
}

//First Generator Upgrade
function buyMoneyPerClick() {
    if (gameData.money >= gameData.moneyPerClickCost) {
        gameData.money -= gameData.moneyPerClickCost;
        gameData.moneyPerClick += 1;
        gameData.moneyPerClickCost = gameData.moneyPerClickCost * 1.35;
        updateText("balance", format(gameData.money, gameData.exponentRule) + " Money made");
        updateText("perClickUpgrade", "Current Printer Count: " + format(gameData.moneyPerClick, gameData.exponentRule) + " | Cost: " + format(gameData.moneyPerClickCost, gameData.exponentRule) + " Money");
        updateText("scroll-text", "Printer added!")
    }
}

//This executes the main loop later,
var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now();
    gameData.money += gameData.moneyPerClick * (diff / 1000);
    updateText("balance", format(gameData.money, gameData.exponentRule) + " Money made");
    updateText("perClickUpgrade", "Current Printer Count: " + format(gameData.moneyPerClick, gameData.exponentRule) + " | Cost: " + format(gameData.moneyPerClickCost, gameData.exponentRule) + " Money");
    updateText("nextBoost", "Next Reset available at: " + format(gameData.nextResetCost, gameData.exponentRule))
}, 1000)

//This saves the game every 15sec
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("moneyMakerSave", JSON.stringify(gameData))
    updateText("scroll-text", "Game Saved!")
}, 15000)

function saveGameButton() {
    localStorage.setItem("moneyMakerSave", JSON.stringify(gameData))
    updateText("scroll-text", "Game Saved!")
}

function format(number, string) {
    let exponent = Math.floor(Math.log10(number));
    let mantissa = number / Math.pow(10, exponent);
    if (exponent < 3) return number.toFixed(1);
    if (string == "scientific") return mantissa.toFixed(2) + "e" + exponent;
    if (string == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3);
}

//Load the game
var saveGame = JSON.parse(localStorage.getItem("moneyMakerSave"))
if (saveGame !== null) {
    //Set Values if save includes them
    if (typeof saveGame.money !== "undefined") gameData.money = saveGame.money;
    if (typeof saveGame.moneyPerClick !== "undefined") gameData.moneyPerClick = saveGame.moneyPerClick;
    if (typeof saveGame.moneyPerClickCost !== "undefined") gameData.money = saveGame.moneyPerClickCost;
    if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
    gameData = saveGame;
}

//Delete save file
function deleteSave() {
    localStorage.removeItem("moneyMakerSave")
    window.location.reload();
}