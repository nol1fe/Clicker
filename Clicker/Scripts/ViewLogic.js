var ViewLogic = (function($) {
    var toastIMGsmall = '<img style="width:20px;" src="/Content/Images/toast.png"/>';
    var toastIMGmedium = '<img style="width:60px;" src="/Content/Images/toast.png"/>';
    var achievement1IMG = '<img style="height: 50px;" src="/Content/Images/toster1.png"/>';

    var costDivCounter = 0;



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

   

    return {

        messageRight: messageRight,
        messageLeft: messageLeft,
        messageTop: messageTop,
  
    }


}(jQuery));
