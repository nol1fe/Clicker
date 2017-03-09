function questClickHandling() {
    questClickCount++;
    resetQuestClick();
    questProgress("#questBarClick", questClickPercentage);
}

var questClickCount = 0;
var questClickPercentage = 0;
var questClickCost = 10;

function resetQuestClick() {
    if ($("#questBarClick").attr("aria-valuenow") < 100) {
        //console.log(questClickCount);
        questClickPercentage = (questClickCount / questClickCost) * 100;
        //console.log("procenty do questa " + questClickPercentage);
    }
    else if ($("#questBarClick").attr("aria-valuenow") >= 100) {
        questClickCount = 0;
        questClickPercentage = 0;
    }

}

var questProductionCount = 0;
var questProductionPercentage = 0;
var questProductionCost = 50;

function resetQuestProduction() {
    if ($("#questBarProduction").attr("aria-valuenow") <= 100) {
        questProductionPercentage = (questProductionCount / questProductionCost) * 100;
    }
    else if (questProductionPercentage > 100) {
        questProductionPercentage = 0;
        questProductionCount = 0
    }
}

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

