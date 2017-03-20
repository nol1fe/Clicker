var ApiLogic = (function ($) {
 
    function getUserGameState(onSuccess, userId) {
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

                onSuccess(data);
            }
        });
    }

    function saveGameState(gameState, userId) {
        $.ajax({
            type: "POST",
            url: 'api/GameStates/PostGameState?userId=' + userId,
            data: gameState,
            success: function (data) {

                alert('tak');
                
            }
            
        });
    }


    function getUpgrades (onSuccess) {
        $.ajax({
            url: 'api/upgrades',

            complete: function () {
                $("#upgradesPanel span").hide()
            },

            success: function (data) {

                onSuccess(data);
                
            }
        });


    }

    function getAchievements (onSuccess) {

        $.ajax({
            url: 'api/achievements',

            complete: function () {
                $("#achievementsPanel span").hide()
            },

            success: function (data) {

                onSuccess(data);
                
            }

        });

    }

    return {
        getUserGameState: getUserGameState,
        getAchievements: getAchievements,
        getUpgrades: getUpgrades,
        saveGameState: saveGameState
    }
}(jQuery));
