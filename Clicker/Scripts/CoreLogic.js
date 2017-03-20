var CoreLogic = (function ($, ApiLogic, ViewLogic) {

    var gameState;
    
    var toastsPS = 0;

    var clickCount = 0;
    var clickValue = 1;

    var achievMultiplier = 1;
    var achievMultiplierX = 2;

    var questProductionNeededAmmount = 50;
    var achievementUnlockNeededAmmount = 5000;

    var mainToast = $("#toastclick");
    var userId = $("#userId").val();

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

    var toastIMGsmall = '<img style="width:20px;" src="/Content/Images/toast.png"/>';
    var toastIMGmedium = '<img style="width:60px;" src="/Content/Images/toast.png"/>';
    var achievement1IMG = '<img style="height: 50px;" src="/Content/Images/toster1.png"/>';

    var showUpgrades = false;
     
    $(function () {
        gameInitialization();
        mainToast.on('click', function (e) {
            plusToastAnimation(e);

        });
        
        $("#saveGame").on("click", function () {
            ApiLogic.saveGameState(gameState, userId);
        });
        

        mainToast.on("click", mainToastLogic);
        mainToast.on("click", questClickHandling);

        //$("#achievementsPanel").on("click", achievementMouseOver);

        $('#upgradesPanel').on("click", "div.upgrade", upgradeClick);
        $('#achievementsPanel').on("mouseover", "div", achievementGet);


    });

    var divCounter = 0;
    function plusToastAnimation(e) {
        var min = -40;
        var max = 20;
        var randomNumberX = Math.floor(Math.random() * (max - min + 1)) + min;
        var randomNumberY = Math.floor((Math.random() * 30) + 1);


        var relX = e.pageX;
        var relY = e.pageY;
        var plus = "+ " + clickValue + " " + toastIMGsmall
        var div = $('<div class="tempDiv">').css({
            "position": "absolute",
            "left": relX,
            "top": relY
        })

        if (divCounter <= 10) {
            div.append(plus)
                .animate({ top: relY - (60 + randomNumberY), left: relX - randomNumberX })
                .css('color', 'black')
                .fadeIn(500)
                .fadeOut(200);
            $(document.body).append(div);
            divCounter++;
        }
        else {
            div.append(plus)
               .animate({ top: relY - (60 + randomNumberY), left: relX - randomNumberX })
               .css('color', 'black')
               .fadeIn(500)
               .fadeOut(200);
            $(document.body).append(div);
            $(".tempDiv").remove();
            divCounter = 0;
        }
    }
    function gameInitialization() {
        ApiLogic.getUserGameState(UserGameStateOnSuccess, userId);

        ApiLogic.getUpgrades(UpgradesOnSuccess);
        ApiLogic.getAchievements(AchievementsOnSuccess)

        
        upgradeDisplay();

    }

    function UserGameStateOnSuccess(data) {
        gameState = data;
    }

    function UpgradesOnSuccess(data) {
        upgradeList = data;
    }


    function AchievementsOnSuccess(data) {
        achievementList = data;
        achievementInitialization();
    }

    setInterval(function () {
        timer.seconds++;
        myTimer();
        gameState.CurrentAmmount += toastsPS;
        gameState.TotalAmmount += toastsPS;
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

        

        toolTip(achievementSelected);

        if (showUpgrades == false) {
            upgradeDisplay();
            showUpgrades = true;
        }

        achievementDisplay(1);

    }

    // display upgrades on the right UpgradesPanel
    
    function upgradeDisplay() {
        for (var i = 0; i < upgradeList.length; i++) {
            $('#upgradesPanel').append(
         '<div name="upgrade" style="margin-bottom:2%; padding-left:1%;" class="row upgrade" data-id="' + upgradeList[i].Id + '">'
         + '<div class="col-xs-2 pull-left" style="text-align:center" border">'
         + '<img style="width: 50px" src=' + upgradeList[i].ImgUrl + '>'
         + '</div>'
         + '<div class="col-xs-10 push-right border" id="upgdescription' + upgradeList[i].Id + '">'
         + '<div class="col-xs-7 border"><b>' + upgradeList[i].Name + '</b></div>'
         + '<div class="col-xs-5 border" style="text-align:end" id="upglevel' + upgradeList[i].Id + '">Level: ' + upgradeList[i].Level + '</div>'
         + '<div class="col-xs-12 border" id="upgcost' + upgradeList[i].Id + '">Cost: ' + upgradeList[i].Cost + ' ' + toastIMGsmall + '</div>'
         + '</div>'
         + '</div>')

            if (upgradeList[i].UpgradeType == 0) {
                $('#upgdescription' + upgradeList[i].Id).append(
              '<div class="col-xs-12" id="upgprofit' + upgradeList[i].Id + '">Produces: ' + upgradeList[i].Value + ' ' + toastIMGsmall + ' per second</div>');
            }
            else if (upgradeList[i].UpgradeType == 1) {
                $('#upgdescription' + upgradeList[i].Id).append(
            '<div class="col-xs-12" id="upgprofit' + upgradeList[i].Id + '">Produces: ' + upgradeList[i].Value + ' ' + toastIMGsmall + ' per click');
            }
        }
    }

    // Progress bar animate
    function questProgress(selector, valueInPercentage) {
        $(selector).animate()
            .addClass("active")
            .attr("aria-valuenow", valueInPercentage)
            .width(valueInPercentage + "%")

        if (valueInPercentage < 100) {
            $(selector).animate().html(valueInPercentage.toPrecision(3) + "%");
        }
        else {
            $(selector).animate().html('<span>Success!</span>');
        }

    }

    function totalClicksInfo() {
        $("#totalclicks").html(toastIMGsmall + " Total clicks : " + clickCount);
    }

    function clickValueInfo() {
        $("#clickvalue").html(toastIMGsmall + " Toasts per click: " + clickValue);
    }

    function toastsPsInfo() {
        $("#toastsps").html(toastIMGsmall + " Toasts per second: " + toastsPS);
    }

    function totalAmmountInfo() {
        $("#totaltoasts").html(toastIMGsmall + " Total toasts maked: " + gameState.TotalAmmount);
    }

    function currentAmmountInfo() {
        $("#currentAmmount").html('<span class="badge" style="background-color:green">' + gameState.CurrentAmmount + ' ' + toastIMGsmall + '</span>');
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
        gameState.CurrentAmmount += clickValue;
        gameState.TotalAmmount += clickValue;
        clickCount++;

        totalAmmountInfo();
        toastsPsInfo();
        totalClicksInfo();
        currentAmmountInfo();
    }

    function questClickHandling() {
        questClickCount++;
        resetQuestClick();

        questClickShowMessage();
        questProductionShowMessage();
        
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

    function questClickShowMessage() {
        if (questClickCount >= questClickCost) {
            clickValue *= 2;

            questClickCount = 0;

            if (questClickCost <= 100) {
                questClickCost += 30;
            }
            else {
                questClickCost += 200;
            }
            ViewLogic.messageLeft("#f79422", "Congratulations! You have clicked " + toastIMGsmall + " " + clickCount + " times", "Your " + toastIMGsmall + " per click is doubled");
        }
    }

    function questProductionShowMessage() {
        if (questProductionCount >= questProductionCost) {
            toastsPS *= 2;
            ViewLogic.messageLeft("green", "Congratulations! You have made " + gameState.TotalAmmount + " " + toastIMGsmall, "Your total production of " + toastIMGsmall + " is doubled");
            questProductionCount = 0;

            if (questProductionCost <= 1000) {
                questProductionCost += 200;
            }
            else {
                questProductionCost *= 5;
            }
        }
    }

    var levelUpStart = 0;
    var levelUpEnd = 0;

    function levelUpAnimation() {
        if (levelUpStart == 0) {
            $("#upglevel" + upgradeId)
            .animate({ fontSize: "16px" }, 500)
            .animate({ fontSize: "14px" }, 300);
        }

        levelUpStart++;

        setTimeout(function () {
            levelUpEnd++;
            if (levelUpStart == levelUpEnd) {
                levelUpStart = 0;
                levelUpEnd = 0;
                $("#upglevel" + upgradeId)
                    .animate({ fontSize: "14px" }, 300);
            }
        }, 700);
    }

    var upgradeId;
    function upgradeClick() {
        upgradeId = $(this).data("id");
        console.log("Id klikniete: " + upgradeId);
        var upgradeSelected = _.find(upgradeList, function (item) {
            return item.Id === upgradeId
        })

        console.log(upgradeSelected);

        if (gameState.CurrentAmmount >= upgradeSelected.Cost) {
            upgradeSelected.Level++;
            $("#upglevel" + upgradeSelected.Id).html("Level: " + upgradeSelected.Level)
            levelUpAnimation();

            if (upgradeSelected.UpgradeType == 0) {
                toastsPS += upgradeSelected.Value * achievMultiplier;
            }
            else if (upgradeSelected.UpgradeType == 1) {
                clickValue += upgradeSelected.Value * achievMultiplier;
            }
            gameState.CurrentAmmount = gameState.CurrentAmmount - upgradeSelected.Cost;
            
            ViewLogic.messageTop("#5f87c6", "- " + upgradeSelected.Cost + " " + toastIMGsmall);

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
            ViewLogic.messageRight("red", "Not enough" + " " + toastIMGsmall);
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
        if (achievementModel != null && gameState.TotalAmmount <= achievementModel.Cost) {
            var selector = $("[data-id=" + achievementModel.Id + "]");
            selector.attr('title', gameState.TotalAmmount + ' / ' + achievementModel.Cost + "\n" + achievementModel.Description);
        }
        else {
            if (achievementModel != null && achievementModel.Done == false) {
                for (var i = 0; i < upgradeList.length ; i++) {
                    upgradeList[i].Value += achievementModel.Value;

                    if (upgradeList[i].UpgradeType == 0) {
                        toastsPsInfo();
                        $("#upgprofit" + upgradeList[i].Id).html('Produces: ' + (upgradeList[i].Value * achievMultiplier) + ' ' + toastIMGsmall + ' per second')
                    }
                    else if (upgradeList[i].UpgradeType == 1) {
                        currentAmmountInfo();
                        $("#upgprofit" + upgradeList[i].Id).html('Produces: ' + (upgradeList[i].Value * achievMultiplier) + ' ' + toastIMGsmall + ' per click');
                    }
                    $("#upgcost" + upgradeList[i].Id).html('Cost: ' + upgradeList[i].Cost + ' ' + toastIMGsmall);

                }
                var selector = $("[data-id=" + achievementModel.Id + "]");
                selector.css('opacity', '1.0');
                selector.attr('title', achievementModel.Description);
                achievementModel.Done = true;


            }
        }

    }


    //display panel
    var showAchievements = false;
    function achievementDisplay(valueNeededToDisplay) {
        if (gameState.TotalAmmount > valueNeededToDisplay) {
            $("#achievementsContainer").show();
            console.log("wykonane");
            
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


    return {

    
    }



}(jQuery, ApiLogic, ViewLogic));