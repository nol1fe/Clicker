function gameInitialization() {
    $.ajax({
        url: 'api/upgrades',

        complete: function () {
            $("#upgradesPanel span").hide()
        },

        success: function (data) {
            upgradeList = data;
            upgradeDisplay();
        }
    });

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

    gameUpdate();
}
