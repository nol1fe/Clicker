var totalAmmount = 0;
var currentAmmount = 10000;

var toastsPS = 0;

var clickCount = 0;
var clickValue = 1;

var achievMultiplier = 1;
var achievMultiplierX = 2;

var questProductionNeededAmmount = 50;
var achievementUnlockNeededAmmount = 5000;

var mainToast = $("#toastclick");

var upgradeList = [];
var achievementList = [];

var msInterval = 1000;
var timer = { seconds: 0, minutes: 0, hours: 0 };

var questClickCount = 0;
var questClickPercentage = 0;
var questClickCost = 10;

var questProductionCount = 0;
var questProductionPercentage = 0;
var questProductionCost = 50;

$(function () {
    gameInitialization();

    mainToast.on('click', function (e) {
        plusToastAnimation(e);
      
    });

    mainToast.on("click", mainToastLogic);
    mainToast.on("click", questClickHandling);

    //$("#achievementsPanel").on("click", achievementMouseOver);

    $('#upgradesPanel').on("click", "div.upgrade", upgradeClick);
    $('#achievementsPanel').on("mouseover", "div", achievementGet);

});



setInterval(function () {
    timer.seconds++;
    myTimer();
    currentAmmount += toastsPS;
    totalAmmount += toastsPS;
    questProductionCount += toastsPS;
    gameUpdate();


    questProductionShowMessage(questProductionCost);
    questClickShowMessage(questClickCost);

    questProgress("#questBarClick", questClickPercentage);
    questProgress("#questBarProduction", questProductionPercentage);

}, msInterval);

function gameUpdate() {
    totalAmmountInfo();
    currentAmmountInfo();
    clickValueInfo();
    toastsPsInfo();
    totalClicksInfo();

    resetQuestProduction();

    achievementDisplay();
    toolTip(achievementSelected);

}



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



function mainToastLogic() {
    currentAmmount += clickValue;
    totalAmmount += clickValue;
    clickCount++;
    totalAmmountInfo();
    toastsPsInfo();
    totalClicksInfo();
    currentAmmountInfo();
}

function questClickHandling() {
    questClickCount++;
    resetQuestClick();

    questClickShowMessage(questClickCost);
    questProductionShowMessage(questProductionCost);

    questProgress("#questBarClick", questClickPercentage);
}


function resetQuestClick() {
    if ($("#questBarClick").attr("aria-valuenow") < 100) {
        questClickPercentage = (questClickCount / questClickCost) * 100;
        
    }
    else if ($("#questBarClick").attr("aria-valuenow") >= 100) {
        questClickCount = 0;
        questClickPercentage = 0;
    }

}


function resetQuestProduction() {
    if ($("#questBarProduction").attr("aria-valuenow") <= 100) {
        questProductionPercentage = (questProductionCount / questProductionCost) * 100;
    }
    else if (questProductionPercentage > 100) {
        questProductionPercentage = 0;
        questProductionCount = 0
    }
}


function questClickShowMessage(neededValueToDisplay) {
    if (questClickCount >= questClickCost) {
        clickValue *= 2;

        questClickCount = 0;

        if (questClickCost <= 100) {
            questClickCost += 30;
        }
        else {
            questClickCost += 200;
        }
        messageLeft("#f79422", "Congratulations! You have clicked " + toastIMGsmall + " " + clickCount + " times", "Your " + toastIMGsmall + " per click is doubled");
    }
}

function questProductionShowMessage(neededValueToDisplay) {
    if (questProductionCount >= questProductionCost) {
        toastsPS *= 2;
        messageLeft("green", "Congratulations! You have made " + totalAmmount + " " + toastIMGsmall, "Your total production of " + toastIMGsmall + " is doubled");
        questProductionCount = 0;

        if (questProductionCost <= 1000) {
            questProductionCost += 200;
        }
        else {
            questProductionCost *= 5;
        }
    }
}

var upgradeId;
function upgradeClick() {
    upgradeId = $(this).data("id");
    console.log("Id klikniete: " + upgradeId);
    var upgradeSelected = _.find(upgradeList, function (item) {
        return item.Id === upgradeId
    })

    console.log(upgradeSelected);
    
    if (currentAmmount >= upgradeSelected.Cost) {
        upgradeSelected.Level++;
        $("#upglevel" + upgradeSelected.Id).html("Level: " + upgradeSelected.Level)
        levelUpAnimation();

        if (upgradeSelected.UpgradeType == 0) {
            toastsPS += upgradeSelected.Value * achievMultiplier;
        }
        else if (upgradeSelected.UpgradeType == 1) {
            clickValue += upgradeSelected.Value * achievMultiplier;
        }
        currentAmmount = currentAmmount - upgradeSelected.Cost;

        messageTop("#5f87c6", "- " + upgradeSelected.Cost + " " + toastIMGsmall);

        upgradeSelected.Cost += upgradeSelected.Cost;
        currentAmmountInfo();
        if (upgradeSelected.UpgradeType == 0) {
            toastsPsInfo();
            $("#upgprofit" + upgradeSelected.Id).html('Produces: ' + (upgradeSelected.Value * achievMultiplier) + ' ' + toastIMGsmall + ' per second')
        }
        else if (upgradeSelected.UpgradeType == 1) {
            currentAmmountInfo();
            $("#upgprofit" + upgradeSelected.Id).html('Produces: ' + (upgradeSelected.Value * achievMultiplier) + ' ' + toastIMGsmall + ' per click');
        }
        $("#upgcost" + upgradeSelected.Id).html('Cost: ' + upgradeSelected.Cost + ' ' + toastIMGsmall);

    }

    else {
        messageRight("red", "Not enough" + " " + toastIMGsmall);
    }
}

//load achievements
function achievementInitialization() {
    $("#achievementsContainer").hide();
    for (var i = 0; i < achievementList.length; i++) {
        $('#achievementsPanel').append(
     '<div name="achievement" class="col-sm-4" style="text-align: center; opacity: 0.2;" data-id="' + achievementList[i].Id + '" data-toggle="tooltip">'
     + '<img height="42" width="42" src=' + achievementList[i].ImgUrl + '></img>'
     + '</div>');
    }
}

//display panel
var showAchievements = false;
function achievementDisplay() {
    if (totalAmmount > 1 && showAchievements == false) {
        $("#achievementsContainer").show();
        console.log("wykonane");
        showAchievements = true;
    }
}

var achievementId;
var achievementSelected;

function achievementGet() {
    achievementId = $(this).data("id");
    achievementSelected = _.find(achievementList, function (item) {
        return item.Id === achievementId
    })
    console.log("Id: " + achievementId + " Name " + achievementSelected.Name);

}


function toolTip(achievementModel) {
    if (achievementModel != null && totalAmmount <= achievementModel.Cost) {
        var selector = $("[data-id=" + achievementModel.Id + "]");
        selector.attr('title', totalAmmount + ' / ' + achievementModel.Cost + "\n" + achievementModel.Description);
    }
    else {
        if (achievementModel != null && achievementModel.Done == false) {
            for (var i = 0; i < upgradeList.length ; i++) {
                upgradeList[i].Value += achievementModel.Value;
            }
            var selector = $("[data-id=" + achievementModel.Id + "]");
            selector.css('opacity', '1.0');
            selector.attr('title', achievementModel.Description);
            achievementModel.Done = true;
        }
    }

}

