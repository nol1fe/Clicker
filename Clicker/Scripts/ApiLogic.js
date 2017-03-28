var ApiLogic = (function ($) {

    function getUserGameState(onSuccess, userId) {
        console.log("start getUserGameState");
        $.ajax({
            url: 'api/gamestates/GetGameStateByUserId',
            data: {
                userId: userId,
            },
            dataType: "json",
            complete: function () {
                $("#TUTAJ LOADING SPAN NA CAŁĄ STRONĘ").hide()
            },
            success: function (data) {
                console.log("end getUserGameState");
                onSuccess(data);

            }
        });
    }

    function saveGameState(gameState, userId) {
        console.log("start saveGameState");
        $.ajax({
            type: "POST",
            url: 'api/GameStates/PostGameState?userId=' + userId,
            data: gameState,
            success: function (data) {
                console.log("end saveGameState");
            }

        });
    }

    function resetGameState(userId) {
        console.log("start resetGameState");
        $.ajax({
            url: "api/gamestates/DeleteGameStateByUserId?userId=" + userId,
            type: "DELETE",
            data: {
                userId: userId
            },

            success: function () {
                console.log("end resetGameState");
                location.reload();
            }

        });
    }

    function getUpgrades(onSuccess) {
        console.log("start getUpgrades");

        $.ajax({
            url: 'api/upgrades',

            complete: function () {
                $("#upgradesPanel span").hide()
            },

            success: function (data) {
                console.log("end getUpgrades");

                onSuccess(data);

            }
        });


    }

    function getAchievements(onSuccess) {
        console.log("start getAchievements");

        $.ajax({
            url: 'api/achievements',

            complete: function () {
                $("#achievementsPanel span").hide()
            },

            success: function (data) {
                console.log("end getAchievements");

                onSuccess(data);

            }

        });


    }

    function getQuests(onSuccess) {
        console.log("start getQuests");

        $.ajax({
            url: 'api/quests',
            success: function (data) {
                console.log("end getQuests");

                onSuccess(data);
            }
        });

    }

    return {
        getUserGameState: getUserGameState,
        getAchievements: getAchievements,
        getUpgrades: getUpgrades,
        getQuests: getQuests,
        saveGameState: saveGameState,
        resetGameState: resetGameState
    }
}(jQuery));
