var mainToast = $("#toastclick");


$(function () {

    gameInitialization();

    mainToast.on('click', function (e) {
        plusToastAnimation(e);

    });

    mainToast.on("click", mainToastLogic);
    mainToast.on("click", achievementHandling);
    mainToast.on("click", questClickHandling);

    $('#upgradesPanel').on("click", "div.upgrade", upgradeClick);

});

function gameUpdate() {
    totalAmmountInfo();
    currentAmmountInfo();
    clickValueInfo();
    toastsPsInfo();
    totalClicksInfo();

    resetQuestProduction();
    achievementToolTip(achiev1);
}

var msInterval = 1000;
var timer = { seconds: 0, minutes: 0, hours: 0 };

function myTimer() {
    if (timer.seconds == 60) {
        timer.minutes++;
        timer.seconds = 0;
    }
    if (timer.minutes == 60) {
        timer.hours++;
        timer.minutes = 00;
    }

    $("#timer").html("Time: " + timer.hours.toString() + 'h ' + timer.minutes.toString() + 'min ' + timer.seconds.toString() + 's');
}

var game = setInterval(function () {
    timer.seconds++;
    myTimer();
    currentAmmount += toastsPS;
    totalAmmount += toastsPS;
    questProductionCount += toastsPS;
    gameUpdate();

    achievementProductionShow(questProductionNeededAmmount);
    achievementUnlockedShow(achievementUnlockNeededAmmount);
    achievementClickShow(questClickCost);

    questProgress("#questBarClick", questClickPercentage);
    questProgress("#questBarProduction", questProductionPercentage);

    achievementDisplay(achiev1);

}, msInterval);