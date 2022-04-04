/*
Money Maker

A simple clicker/idle game made in js mostly.
State: Not playable

Current Version: t0.0
Time spend on this Project: 8h
*/


//Array of Game Data
var gameData = {
    //----------
    //Basic Game values
    money: 1000000000000000000.0,
    moneyPerClick: 1.0,
    moneyPerClickCost: 10.0,
    //----------
    //Prestige values
    resetCounter: 0.0,
    nextResetCost: 1000000000000000000.0,
    currentPrestigeBonus: 0.0,
    //----------
    //Time
    lastTick: Date.now(),
    //----------
    //
}

//Smart Text Setter
function updateText(id, content) {
    document.getElementById(id).innerHTML = content;
}

//Click Function
function makeMoney() {
    gameData.money += gameData.moneyPerClick;
    updateText("balance", format(gameData.money) + " Money in Account");
    updateText("scroll-text", "Money in Account!")
}

//First Generator Upgrade
function buyMoneyPerClick() {
    if (gameData.money >= gameData.moneyPerClickCost) {
        gameData.money -= gameData.moneyPerClickCost;
        gameData.moneyPerClick += 1;
        gameData.moneyPerClickCost = gameData.moneyPerClickCost * 1.35;
        updateText("balance", format(gameData.money) + " Money in Account");
        updateText("perClickUpgrade", "Current Printer Count: " + format(gameData.moneyPerClick) + " | Cost: " + format(gameData.moneyPerClickCost) + " Money");
        updateText("scroll-text", "Printer added!")
    }
}

//Prestige Upgrade
function getPrestige() {
    if (gameData.money >= gameData.nextResetCost) {
        //Set Prestige Bonus, Counter and next reset cost
        gameData.currentPrestigeBonus += 2;
        gameData.resetCounter += 1;
        gameData.nextResetCost = gameData.nextResetCost * 2;
        //Reset other values
        gameData.money = 0;
        gameData.moneyPerClick = 1;
        gameData.moneyPerClickCost = 10;
        //Update Texts
        updateText("balance", format(gameData.money) + " Money in Account");
        updateText("prestigeUpgrade", "Reset Counter: " + format(gameData.resetCounter));
        updateText("nextPrestige", "Next Reset available at: " + format(gameData.nextResetCost))
        updateText("currentPrestigeBonus", "Current Bonus: " + format(gameData.resetCounter) + "%")
        updateText("scroll-text", "Prestige incremented, Game Reset!")
    }
}

//This executes the main loop later,
var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now();
    if (gameData.resetCounter >= 1) {
        gameData.money += ((gameData.moneyPerClick * (currentPrestigeBonus / 100)) * (diff / 1000));
    } else {
        gameData.money += gameData.moneyPerClick * (diff / 1000);
    }
    updateText("balance", format(gameData.money) + " Money in Account");
    updateText("perClickUpgrade", "Current Printer Count: " + format(gameData.moneyPerClick) + " | Cost: " + format(gameData.moneyPerClickCost) + " Money");
    updateText("prestigeUpgrade", "Reset Counter: " + format(gameData.resetCounter));
    updateText("nextPrestige", "Next Reset available at: " + format(gameData.nextResetCost));
    updateText("currentPrestigeBonus", "Current Bonus: " + format(gameData.currentPrestigeBonus) + "%");
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

//Number Formatter
var format = function(number) {
    if (typeof number !== "number") {
        return 0;
    }

    var prefixes = [
        { magnitude: 1e24, label: 'Y' },
        { magnitude: 1e21, label: 'Z' },
        { magnitude: 1e18, label: 'E' },
        { magnitude: 1e15, label: 'P' },
        { magnitude: 1e12, label: 'T' },
        { magnitude: 1e9, label: 'B' },
        { magnitude: 1e6, label: 'M' },
        { magnitude: 1e3, label: 'k' }
    ];

    var abs = Math.abs(number);
    for (var i = 0; i < prefixes.length; i++) {
        if (abs >= prefixes[i].magnitude) {
            return (number / prefixes[i].magnitude).toFixed(1) + prefixes[i].label;
        }
    }
    return number;
}

//Load the game
var saveGame = JSON.parse(localStorage.getItem("moneyMakerSave"))
if (saveGame !== null) {
    //Set Values if save includes them
    if (typeof saveGame.money !== "undefined") gameData.money = saveGame.money;
    if (typeof saveGame.moneyPerClick !== "undefined") gameData.moneyPerClick = saveGame.moneyPerClick;
    if (typeof saveGame.moneyPerClickCost !== "undefined") gameData.moneyPerClickCost = saveGame.moneyPerClickCost;
    if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
    if (typeof saveGame.resetCounter !== "undefined") gameData.resetCounter = saveGame.resetCounter;
    if (typeof saveGame.nextResetCost !== "undefined") gameData.nextResetCost = saveGame.nextResetCost;
    if (typeof saveGame.currentPrestigeBonus !== "undefined") gameData.currentPrestigeBonus = saveGame.currentPrestigeBonus;
}

//Delete save file
function deleteSave() {
    localStorage.removeItem("moneyMakerSave")
    window.location.reload();
}