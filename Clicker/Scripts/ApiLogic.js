var ApiLogic = (function($) {

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
        getAchievements: getAchievements,
        getUpgrades: getUpgrades
    }
}(jQuery));
