var toastIMGsmall = '<img style="width:20px;" src="/Content/Images/toast.png"/>';
var toastIMGmedium = '<img style="width:60px;" src="/Content/Images/toast.png"/>';
var achievement1IMG = '<img style="height: 50px;" src="/Content/Images/toster1.png"/>';

var divCounter = 0;
var costDivCounter = 0;

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
    $("#totaltoasts").html(toastIMGsmall + " Total toasts maked: " + totalAmmount);
}

function currentAmmountInfo() {
    $("#currentAmmount").html('<span class="badge" style="background-color:green">' + currentAmmount + ' ' + toastIMGsmall + '</span>');
}

function messageRight(color, message) {
    $("#flyingvalue")
        .prepend('<div>' + message + '</div>')
        .fadeIn(7000)
        .css('color', color)
        .css({ top: 200 })
        .animate({ top: '100' })
        .children(':first')
        .delay(200)
        .fadeOut(1000)
}

function messageLeft(color, messageFirstLine, messageSecondLine) {
    $("#flyingAchievement")
        .prepend('<div style="text-align: center">' + messageFirstLine + '<div style="text-align: center">' + messageSecondLine + '</div></div>')
        .fadeIn(7000)
        .css('color', color)
        .css({ top: 250, left: 0 })
        .animate({ top: 190, left: -370 })
        .children(':first')
        .delay(1000)
        .fadeOut(7000)
}

var messageCounterStart = 0;
var messageCounterEnd = 0;

function messageTop(color, message) {

    $("#flyingCostValue").html(message).css('color', color);
    if (messageCounterStart == 0) {
        $("#flyingCostValue").fadeIn(300);
    }

    messageCounterStart++;

    setTimeout(function () {
        messageCounterEnd++;
        if (messageCounterStart == messageCounterEnd) {
            messageCounterStart = 0;
            messageCounterEnd = 0;
            $("#flyingCostValue").hide();

        }
    }, 1500);

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

