var simon = {
    simonId: "",
    delay: 700,
    yourTurn: false,
    turn: "Simon's Turn",
    finishedP1: false,
    finishedP2: false
};

var settings = {
    sequence: [],
    round: 0,
    playNumber: 0,
    speed: 1000,
    intensity: 255,
    duration: 400,
    durationStart: 200,
    durationFail: 200,
    clicked: 0,
    clickedP1: 0,
    clickedP2: 0,
    mode: 0 // Singleplayer :   0
            // Multiplayer 1:   1
            // Multiplayer 2:   2
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
    $('#shoeButtons').hide();
    $('.experimentButton').hide();
    $('#hapticSimonView').show();
    $('#singleplayer').show();
    $('#multiplayer').show();
};

simon.singlePlayer = function() {
    $('#simonInterface').hide();
    $('#hapticSimon').show();
    settings.mode = 0;
    simon.yourTurn = true;
    simon.turn = "Your turn";
    $("#turn").html(simon.turn);
};

simon.multiPlayer = function() {
    $('#simonInterface').hide();
    $('#multiplayerInterface').show();
};

simon.multiPlayer1 = function() {
    $('#multiplayerInterface').hide();
    $('#hapticSimon').show();
    settings.mode = 1;
    simon.yourTurn = true;
    simon.turn = "Your turn";
    $("#turn").html(simon.turn);
};

simon.multiPlayer2 = function() {
    $('#multiplayerInterface').hide();
    $('#hapticSimon').show();
    settings.mode = 2;
    simon.yourTurn = true;
    simon.turn = "Your turn";
    $("#turn").html(simon.turn);
};

simon.pressedRight = function(left, right, heel, toe) {
    if(!simon.yourTurn){
        return;
    }
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
    // Left
    if (winner == 1 && winnerVal < 975){ //980
        return;
    }
    // Right
    if (winner == 2 && winnerVal < 980){
        return;
    }
    // Heel
    if (winner == 3 && winnerVal < 975){
        return;
    }
    // Toe
    if (winner == 4 && winnerVal < 975){ //980
        return;
    }
    switch(winner) {
        case 1:
            endTimeL = new Date();
            if ((endTimeL-startTimeL) >= simon.delay) {
                app.rightShoe = true;
                app.leftShoe = false;
                simon.simonId = "c";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("c");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
                simon.listen();
                startTimeL = new Date();
            }
            break;
        case 2:
            endTimeR = new Date();
            if ((endTimeR-startTimeR) >= simon.delay) {
                app.rightShoe = true;
                app.leftShoe = false;
                simon.simonId = "b";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("b");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
                simon.listen();
                startTimeR = new Date();
            }
            break;
        case 3:
            endTimeH = new Date();
            if ((endTimeH-startTimeH) >= simon.delay) {
                app.rightShoe = true;
                app.leftShoe = false;
                simon.simonId = "d";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("d");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
                simon.listen();
                startTimeH = new Date();
            }
            break;
        case 4:
            endTimeT = new Date();
            if ((endTimeT-startTimeT) >= simon.delay) {
                app.rightShoe = true;
                app.leftShoe = false;
                simon.simonId = "a";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("a");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
                simon.listen();
                startTimeT = new Date();
            }
            break;

        default:
            break;

    }
};

simon.pressedLeft = function(left, right, heel, toe) {
    if(!simon.yourTurn){
        return;
    }
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
    // Left
    if (winner == 1 && winnerVal < 920){
        return;
    }
    // Right
    if (winner == 2 && winnerVal < 1005){ //1205
        return;
    }
    // Heel
    if (winner == 3 && winnerVal < 1000){ //1200
        return;
    }
    // Toe
    if (winner == 4 && winnerVal < 920){
        return;
    }
    switch(winner) {
        case 1:
            endTimeL = new Date();
            if ((endTimeL-startTimeL) >= simon.delay) {
                app.rightShoe = false;
                app.leftShoe = true;
                simon.simonId = "c";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("c");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
                simon.listen();
                startTimeL = new Date();
            }
            break;
        case 2:
            endTimeR = new Date();
            if ((endTimeR-startTimeR) >= simon.delay) {
                app.rightShoe = false;
                app.leftShoe = true;
                simon.simonId = "b";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("b");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
                simon.listen();
                startTimeR = new Date();
            }
            break;
        case 3:
            endTimeH = new Date();
            if ((endTimeH-startTimeH) >= simon.delay) {
                app.rightShoe = false;
                app.leftShoe = true;
                simon.simonId = "d";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("d");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
                simon.listen();
                startTimeH = new Date();
            }
            break;
        case 4:
            endTimeT = new Date();
            if ((endTimeT-startTimeT) >= simon.delay) {
                app.rightShoe = false;
                app.leftShoe = true;
                simon.simonId = "a";
                setTimeout(function(){
                    simon.simonId = "";
                },300);
                if ($("#fail").is(':hidden') && $("#start").is(':hidden')) {
                    simon.animate("a");
                }
                else {
                    app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationStart + "\r");
                    app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationStart + "\r");
                }
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
            app.sendMessage(" t " + "t " + settings.intensity + " " + settings.duration + "\r");
            setTimeout(function() {
                $("#a").css("border-color", "#0b7000");
            }, 200);
        } else if (divid == "b") {
            $("#b").css("border-color", "#ff0b00");
            $("#tune").attr("src", "http://freesound.org/data/previews/334/334540_4959932-lq.mp3");
            app.sendMessage(" t " + "r " + settings.intensity + " " + settings.duration + "\r");
            setTimeout(function() {
                $("#b").css("border-color", "#c30800");
            }, 200);
        } else if (divid == "c") {
            $("#c").css("border-color", "#ffec00");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334542_4959932-lq.mp3");
            app.sendMessage(" t " + "l " + settings.intensity + " " + settings.duration + "\r");
            setTimeout(function() {
                $("#c").css("border-color", "#c3b400");
            }, 200);
        } else if (divid == "d") {
            $("#d").css("border-color", "#29abd0");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334538_4959932-lq.mp3");
            app.sendMessage(" t " + "h " + settings.intensity + " " + settings.duration + "\r");
            setTimeout(function() {
                $("#d").css("border-color", "#196d85");
            }, 200);
        }

        audio[0].pause();
        audio[0].load();
        audio[0].play();

    };



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
                // Vibrate left shoe
                if (settings.mode > 0) {
                    app.leftShoe = true;
                    app.rightShoe = true;
                }
                simon.animate(settings.sequence[settings.playNumber]);
                settings.playNumber++;

                if (settings.playNumber < settings.sequence.length) {
                    myLoop();
                } else {
                    settings.playNumber = 0;
                    simon.yourTurn = true;
                    simon.turn = "Your turn";
                    $("#turn").html(simon.turn);

                    //listen();
                }
            }, settings.speed)
        }

        myLoop();

    }


    // LISTEN

    simon.listen = function() {

        // FAIL PRESS
        if ($("#fail").is(':visible')) {
            simon.fail();
        }
        // START PRESS
        else if ($("#start").is(':visible')) {
            simon.startNew();

        }
        // RIGHT
        else if (settings.mode == 0 && simon.simonId == settings.sequence[settings.clicked]) {

            // End of repeated sequence
            if (settings.clicked === settings.sequence.length - 1) {
                settings.clicked = 0;
                simon.finishedP1 = true;
                simon.startNew();
            } else {
                console.log("Right!");
                settings.clicked++;
            }

        }

        // RIGHT
        else if (settings.mode == 1 && app.leftShoe && simon.simonId == settings.sequence[settings.clickedP1]) {

            // End of repeated sequence
            if (settings.clickedP1 === settings.sequence.length - 1) {
                settings.clickedP1 = 0;
                simon.finishedP1 = true;
                if (simon.finishedP2) {
                    simon.startNew();
                }
                else {
                    simon.turn = "Waiting for Player 2";
                    $("#turn").html(simon.turn);
                }
            } else {
                console.log("Right!");
                settings.clickedP1++;
            }
        }
        else if (settings.mode == 1 && app.rightShoe && simon.simonId == settings.sequence[settings.clickedP2]) {

            // End of repeated sequence
            if (settings.clickedP2 === settings.sequence.length - 1) {
                settings.clickedP2 = 0;
                simon.finishedP2 = true;
                if (simon.finishedP1) {
                    simon.startNew();
                }
                else {
                    simon.turn = "Waiting for Player 1";
                    $("#turn").html(simon.turn);
                }
            } else {
                console.log("Right!");
                settings.clickedP2++;
            }

        // WRONG
        } else if ((app.leftShoe && !simon.finishedP1) || (app.rightShoe && !simon.finishedP2)) {
            console.log("WRONG");
            $("#fail").show();
            if (settings.mode == 1) {
                if (app.rightShoe) {
                    simon.turn = "Winner: Player 1";
                    $("#turn").html(simon.turn);
                }
                else if (app.leftShoe) {
                    simon.turn = "Winner: Player 2";
                    $("#turn").html(simon.turn);
                }
            }
            app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationFail + "\r");
            app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationFail + "\r");
            app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationFail + "\r");
            app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationFail + "\r");
            app.sendMessage(" t " + "r " + settings.intensity + " " + settings.durationFail + "\r");
            app.sendMessage(" t " + "l " + settings.intensity + " " + settings.durationFail + "\r");
            app.sendMessage(" t " + "t " + settings.intensity + " " + settings.durationFail + "\r");
            app.sendMessage(" t " + "h " + settings.intensity + " " + settings.durationFail + "\r");
            $("#fail").addClass("bigEntrance");
            $("#tune").attr("src", "http://freesound.org/data/previews/415/415764_6090639-lq.mp3");
            audio[0].pause();
            audio[0].load();
            audio[0].play();
            $("#simon, #count").css("filter", "blur(5px)");
            $("#simon, #count").css("-webkit-filter", "blur(5px)");
            settings.clicked = 0;
            settings.clickedP1 = 0;
            settings.clickedP2 = 0;
            $("#a, #b, #c, #d").off("mousedown");
            simon.turn = "Your turn";

        }

    };

    $("#start").on("click", function() {
        simon.startNew();
    });

    $("#fail").on("click", function() {
        simon.fail();
    });

    //BEGIN GAME
    simon.startNew = function() {
        simon.finishedP1 = false;
        simon.finishedP2 = false;
        simon.yourTurn = false;
        simon.turn = "Simon's turn";
        $("#turn").html(simon.turn);
        $("#start").hide();
        $("#simon, #count").css("filter", "blur(0px)");
        $("#simon, #count").css("-webkit-filter", "blur(0px)");
        settings.round++;
        makeid(); // make id and play it
        setTimeout(function(){
            $("#count").html(settings.round);
        },600);

    };

    // FAIL
    simon.fail = function() {
        simon.yourTurn = false;
        simon.turn = "Simon's turn";
        $("#turn").html(simon.turn);
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