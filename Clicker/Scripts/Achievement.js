function achievementHandling() {
    achievementClickShow(questClickCost);
    achievementProductionShow(questProductionNeededAmmount);

    achievementUnlockedShow(achievementUnlockNeededAmmount);
    achievementDisplay(achiev1);
}


        var achievPercentClick = (totalAmmount / questClickCost) * 100;

        var achiev1 = new achievementModel(5, "New Toster!", 5000, 2, achievement1IMG);


        function achievementModel(id, name, neededValue, bonus, imgAchievement) {
            this.id = id;
            this.name = name;
            this.neededValue = neededValue;
            this.bonus = bonus;
            this.currentAmmount = currentAmmount;
            this.imgAchievement = imgAchievement;
        }

        function achievementClickShow(neededValueToDisplay) {
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

        function achievementProductionShow(neededValueToDisplay) {
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

        function achievementUnlockedShow(neededValueToDisplay) {
            if (totalAmmount >= achievementUnlockNeededAmmount) {
                achievementUnlockNeededAmmount = achievementUnlockNeededAmmount * 5;
                messageLeft("blue", "Congratulations! You have unlocked achievement!")
            }
        }

        function achievementToolTip(achievementModel) {

            if (totalAmmount < achievementModel.neededValue) {
                //$("#achievDiv" + achievementModel.id).tooltip({
                //    content: totalAmmount + " / " + achievementModel.neededValue + " to get bonus!"
                //});

                $("#achievDiv" + achievementModel.id + " img")
                    .attr('data-toggle', "tooltip")
                    .attr('data-placement', "bottom")
                    .attr('title', totalAmmount + " / " + achievementModel.neededValue + " to get bonus!")

            }
            else if (totalAmmount >= achievementModel.neededValue) {

                $("#achievDiv" + achievementModel.id).tooltip({
                    content: "Done!"
                }).css('opacity', '1.0');

                //$("#achievDiv" + achievementModel.id).tooltip({ content: "Upgrades will produces 2x" + toastIMGsmall });

                $("#achievDiv" + achievementModel.id + " img")
                    .attr('data-toggle', "tooltip")
                    .attr('data-placement', "top")
                    .attr('title', "Upgrades will produces 2x" + toastIMGsmall)


                //data-placement="left" title="Tooltip on left""
                achievMultiplier = achievMultiplierX;
            }
        }

        function achievementDisplay(achievementModel) {
            this.achievementModel = achievementModel;

            if (totalAmmount >= 1000) {
                if ($("#achievements").is(':empty')) {
                    $("#achievements").append('<div id="achievDiv' + achievementModel.id + '" title=""> ' + achievementModel.imgAchievement + '</div>').fadeIn(8000);
                    $("#achievDiv" + achievementModel.id).css('opacity', '0.2')
                    $("#achievementHeading").css('visibility', 'visible');
                };
            }

        }