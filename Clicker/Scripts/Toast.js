function mainToastLogic() {
    currentAmmount += clickValue;
    totalAmmount += clickValue;
    clickCount++;
    totalAmmountInfo();
    toastsPsInfo();
    totalClicksInfo();
    currentAmmountInfo();
}


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