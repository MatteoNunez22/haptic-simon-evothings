var simon = {
    simonId: "",
    delay: 500
};

var settings = {
    sequence: [],
    round: 0,
    playNumber: 0,
    speed: 1000,
    clicked: 0

};

var startTimeL = new Date();
var endTimeL = new Date();
var startTimeR = new Date();
var endTimeR = new Date();
var startTimeH = new Date();
var endTimeH = new Date();
var startTimeT = new Date();
var endTimeT = new Date();

simon.hapticSimonStart = function() {
    $('#title').hide();
    $('#selectorView').hide();
    $('#hapticSimonView').show();
    $('#shoeButtons').hide();
    $('.experimentButton').hide();
};

simon.pressed = function(left, right, heel, toe) {
    winner = 0;
    winnerVal = 0;
    if (left > winnerVal){
        winner = 1;
        winnerVal = left;
    }
    if (right > winnerVal){
        winner = 2;
        winnerVal = right;
    }
    if (heel > winnerVal){
        winner = 3;
        winnerVal = heel;
    }
    if (toe > winnerVal){
        winner = 4;
        winnerVal = toe;
    }
    if (winnerVal < 950){
        return;
    }
    switch(winner) {
        case 1:
            endTimeL = new Date();
            if ((endTimeL-startTimeL) >= simon.delay) {
                simon.simonId = "c";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                simon.listen();
                simon.animate("c");
                startTimeL = new Date();
            }
            break;
        case 2:
            endTimeR = new Date();
            if ((endTimeR-startTimeR) >= simon.delay) {
                simon.simonId = "b";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                simon.animate("b");
                simon.listen();
                startTimeR = new Date();
            }
            break;
        case 3:
            endTimeH = new Date();
            if ((endTimeH-startTimeH) >= simon.delay) {
                simon.simonId = "d";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                simon.animate("d");
                simon.listen();
                startTimeH = new Date();
            }
            break;
        case 4:
            endTimeT = new Date();
            if ((endTimeT-startTimeT) >= simon.delay) {
                simon.simonId = "a";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                simon.animate("a");
                simon.listen();
                startTimeT = new Date();
            }
            break;

        default:
            break;

    }
};

$(document).ready(function() {
    var audio = $("#sound");

    // Animate and vibrate button
    simon.animate = function(divid) {


        // Increase round speed.
        if (settings.round > 5) {
            settings.speed = 500
        }
        <!-- a: c5.wav   b: g4.wav   c: e4.wav   d: c4.wav -->
        if (divid == "a") {
            $("#a").css("border-color", "#1aff00");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334537_4959932-lq.mp3");
            app.sendMessage(" t " + "r " + 255 + " " + 300 + "\r");
            setTimeout(function() {
                $("#a").css("border-color", "#0b7000");
            }, 200);
        } else if (divid == "b") {
            $("#b").css("border-color", "#ff0b00");
            $("#tune").attr("src", "http://freesound.org/data/previews/334/334540_4959932-lq.mp3");
            app.sendMessage(" t " + "l " + 255 + " " + 300 + "\r");
            setTimeout(function() {
                $("#b").css("border-color", "#c30800");
            }, 200);
        } else if (divid == "c") {
            $("#c").css("border-color", "#ffec00");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334542_4959932-lq.mp3");
            app.sendMessage(" t " + "t " + 255 + " " + 300 + "\r");
            setTimeout(function() {
                $("#c").css("border-color", "#c3b400");
            }, 200);
        } else if (divid == "d") {
            $("#d").css("border-color", "#29abd0");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334538_4959932-lq.mp3");
            app.sendMessage(" t " + "h " + 255 + " " + 300 + "\r");
            setTimeout(function() {
                $("#d").css("border-color", "#196d85");
            }, 200);
        }

        audio[0].pause();
        audio[0].load();
        audio[0].play();

    }



    // Generate Simon sequence
    function makeid() {
        var text = "";
        var possible = "abcd";

        for (var i = 0; i < 1; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            settings.sequence.push(text);

        }



        // Animate Sequence
        function myLoop() {
            setTimeout(function() {
                simon.animate(settings.sequence[settings.playNumber]);
                settings.playNumber++;
                if (settings.playNumber < settings.sequence.length) {
                    myLoop();
                } else {
                    settings.playNumber = 0;
                    //listen();
                }
            }, settings.speed)
        }

        myLoop();

    }


    // LISTEN

     simon.listen = function() {

        // Button is pressed
        if (simon.simonId == "a" || simon.simonId == "b"
            || simon.simonId == "c" || simon.simonId == "d") {

            // FAIL
            if ($("#fail").is(':visible')) {
                simon.fail();
            }

            else if ($("#start").is(':visible')) {
                simon.startNew();

            }

            else if (simon.simonId == settings.sequence[settings.clicked]) {

                // End of repeated sequence
                if (settings.clicked === settings.sequence.length - 1) {
                    //$("#a, #b, #c, #d").off("mousedown");
                    settings.clicked = 0;
                    //$("#start").trigger("click");
                    simon.startNew();
                } else {
                    console.log("Right!");
                    settings.clicked++;
                }



            } else {
                console.log("WRONG");
                $("#fail").show();
                $("#fail").addClass("bigEntrance");
                $("#tune").attr("src", "wav/wrong.wav");
                audio[0].pause();
                audio[0].load();
                audio[0].play();
                $("#simon, #count").css("filter", "blur(5px)");
                $("#simon, #count").css("-webkit-filter", "blur(5px)");
                settings.clicked = 0;
                $("#a, #b, #c, #d").off("mousedown");

            }

        }

    }



    //BEGIN GAME
    simon.startNew = function() {
        $("#start").hide();
        $("#simon, #count").css("filter", "blur(0px)");
        $("#simon, #count").css("-webkit-filter", "blur(0px)");
        settings.round++;
        makeid(); // make id and play it
        $("#count").html(settings.round);

    }

    // FAIL
    simon.fail = function() {
        $("#fail").hide();
        settings.sequence = [];
        settings.round = 0;
        settings.playNumber = 0,
            settings.speed = 1000;
        settings.clicked = 0;
        //$("#start").trigger("click");
        simon.startNew();

    };

}); //document ready