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