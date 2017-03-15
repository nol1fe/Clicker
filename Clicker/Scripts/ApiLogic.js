//function gameInitialization() {
//    $.ajax({
//        url: 'api/upgrades',

//        complete: function () {
//            $("#upgradesPanel span").hide()
//        },

//        success: function (data) {
//            upgradeList = data;
//            upgradeDisplay();
//        }
//    });

//    $.ajax({
//        url: 'api/achievements',

//        complete: function () {
//            $("#achievementsPanel span").hide()
//        },

//        success: function (data) {
//            achievementList = data;
//            achievementInitialization();
//        }

//    });

//    gameUpdate();
//}


function gameInitialization(gameUpdate) {
  
    getUpgrades();
    getAchivements();

   

    //core

    getUpgrades(getUpgradesCompleted);


    function getUpgradesCompleted(data) {
        var list = data;
        upgradeDisplay
    }
}


//core
var apiLogic = new apiLogic();

apiLogic.getAchivements()

var apiLogic = function () {

    var getUpgrades = function (getUpgradesCompleted) {
        $.ajax({
            url: 'api/upgrades',

            complete: function () {
                $("#upgradesPanel span").hide()
            },

            success: function (data) {

                getUpgradesCompleted(data)

            }
        });


    }



    var getAchivements= function () {


        $.ajax({
            url: 'api/achievements',

            complete: function () {
                $("#achievementsPanel span").hide()
            },

            success: function (data) {
                achievementList = data;
                achievementInitialization();
            }

        });

    }



    return {
        getAchivements : getAchivements,
        getUpgrades : getUpgrades
    }
}

