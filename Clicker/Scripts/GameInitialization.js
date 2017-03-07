var toastIMGsmall = '<img style="width:20px;" src="/Content/Images/toast.png"/>';
var toastIMGmedium = '<img style="width:60px;" src="/Content/Images/toast.png"/>';
var achievement1IMG = '<img style="height: 50px;" src="/Content/Images/toster1.png"/>';

var upgradeList = [];

function gameInitialization() {
    $.ajax({
        url: 'api/upgrades',

        complete: function () {
            $("#loadingSpan").hide()
        },

        success: function (data) {
            upgradeList = data;
            upgradeDisplay();
        }
    });

    gameUpdate();
}


function totalClicksInfo() {
    $("#totalclicks").html(toastIMGsmall + " Total clicks : " + clickCount);
}

function clickValueInfo() {
    $("#clickvalue").html(toastIMGsmall + " Toasts per click: " + clickValue);
}

function toastsPsInfo() {
    $("#toastsps").html(toastIMGsmall + " Toasts per second: " + toastsPS);
}

function totalAmmountInfo() {
    $("#totaltoasts").html(toastIMGsmall + " Total toasts maked: " + totalAmmount);
}

function currentAmmountInfo() {
    $("#currentAmmount").html('<span class="badge" style="background-color:green">' + currentAmmount + ' ' + toastIMGsmall + '</span>');
}