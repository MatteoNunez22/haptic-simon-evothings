var simon = {
    simonId: "",
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
    delay: 700,
    delayFail: 1500,
    intensity: 255,
    duration: 500,
    durationStart: 300,
    durationFail: 500,
    clicked: 0,
    clickedP1: 0,
    clickedP2: 0,
    mode: 0 // Singleplayer :   0
            // Multiplayer 1:   1
            // Multiplayer 2:   2
};

// Timing variables (Left)
var startTimeL1 = new Date(),
    endTimeL1 = new Date(),
    startTimeR1 = new Date(),
    endTimeR1 = new Date(),
    startTimeH1 = new Date(),
    endTimeH1 = new Date(),
    startTimeT1 = new Date(),
    endTimeT1 = new Date();

// Timing variables (Right)
var startTimeL2 = new Date(),
    endTimeL2 = new Date(),
    startTimeR2 = new Date(),
    endTimeR2 = new Date(),
    startTimeH2 = new Date(),
    endTimeH2 = new Date(),
    startTimeT2 = new Date(),
    endTimeT2 = new Date();

// Timing variables (Fail)
var startTimeF = new Date(),
    endTimeF = new Date();

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
    chat.connect();
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
    if (app.leftShoe) {
        simon.yourTurn = true;
        simon.turn = "Your turn";
        $("#turn").html(simon.turn);
    } else {
        simon.yourTurn = false;
        simon.turn = "Wait for player 1";
        $("#turn").html(simon.turn);
    }
};

$(document).ready(function() {

    // Listen to right shoe
    simon.rightPress = function(left, right, heel, toe) {
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
        if (winner === 1 && winnerVal < 980){ //980
            return;
        }
        // Right
        if (winner === 2 && winnerVal < 980){ //980
            return;
        }
        // Heel
        if (winner === 3 && winnerVal < 975){ //975
            return;
        }
        // Toe
        if (winner === 4 && winnerVal < 980){ //980
            return;
        }

        switch(winner) {
            case 1:
                endTimeL2 = new Date();
                if ((endTimeL2-startTimeL2) >= settings.delay) {
                    app.rightShoe = true;
                    app.leftShoe = false;
                    simon.simonId = "c";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                        simon.animate("c");
                    }
                    simon.pressed();
                    startTimeL2 = new Date();
                }
                break;
            case 2:
                endTimeR2 = new Date();
                if ((endTimeR2-startTimeR2) >= settings.delay) {
                    app.rightShoe = true;
                    app.leftShoe = false;
                    simon.simonId = "b";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                        simon.animate("b");
                    }
                    simon.pressed();
                    startTimeR2 = new Date();
                }
                break;
            case 3:
                endTimeH1 = new Date();
                if ((endTimeH2-startTimeH2) >= settings.delay) {
                    app.rightShoe = true;
                    app.leftShoe = false;
                    simon.simonId = "d";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                        simon.animate("d");
                    }
                    simon.pressed();
                    startTimeH2 = new Date();
                }
                break;
            case 4:
                endTimeT2 = new Date();
                if ((endTimeT2-startTimeT2) >= settings.delay) {
                    app.rightShoe = true;
                    app.leftShoe = false;
                    simon.simonId = "a";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                        simon.animate("a");
                    }
                    simon.pressed();
                    startTimeT2 = new Date();
                }
                break;

            default:
                break;

        }
    };

    // Listen to left shoe
    simon.leftPress = function(left, right, heel, toe) {
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
        if (winner === 1 && winnerVal < 920){
            return;
        }
        // Right
        if (winner === 2 && winnerVal < 1005){ //1205
            return;
        }
        // Heel
        if (winner === 3 && winnerVal < 1000){ //1200
            return;
        }
        // Toe
        if (winner === 4 && winnerVal < 910){
            return;
        }
        switch(winner) {
            case 1:
                endTimeL1 = new Date();
                if ((endTimeL1-startTimeL1) >= settings.delay) {
                    app.rightShoe = false;
                    app.leftShoe = true;
                    simon.simonId = "c";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                        simon.animate("c");
                    }
                    simon.pressed();
                    startTimeL1 = new Date();
                }
                break;
            case 2:
                endTimeR1 = new Date();
                if ((endTimeR1-startTimeR1) >= settings.delay) {
                    app.rightShoe = false;
                    app.leftShoe = true;
                    simon.simonId = "b";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                        simon.animate("b");
                    }
                    simon.pressed();
                    startTimeR1 = new Date();
                }
                break;
            case 3:
                endTimeH1 = new Date();
                if ((endTimeH1-startTimeH1) >= settings.delay) {
                    app.rightShoe = false;
                    app.leftShoe = true;
                    simon.simonId = "d";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                        simon.animate("d");
                    }
                    simon.pressed();
                    startTimeH1 = new Date();
                }
                break;
            case 4:
                endTimeT1 = new Date();
                if ((endTimeT1-startTimeT1) >= settings.delay) {
                    app.rightShoe = false;
                    app.leftShoe = true;
                    simon.simonId = "a";

                    if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                        simon.animate("a");
                    }
                    simon.pressed();
                    startTimeT1 = new Date();
                }
                break;

            default:
                break;

        }
    };


    var audio = $("#sound");

    // Animate and vibrate button
    simon.animate = function(divid) {

        // Increase round speed.
        if (settings.round > 5) {
            settings.speed = 500
        }

        // Light animation and sound
        if (divid === "a") {
            $("#a").css("border-color", "#1aff00");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334537_4959932-lq.mp3");
            app.sendMessage(" t " + "t " + settings.intensity + " " + settings.duration + "\r");
            // Turn off
            setTimeout(function() {
                $("#a").css("border-color", "#0b7000");
            }, 200);
        } else if (divid === "b") {
            $("#b").css("border-color", "#ff0b00");
            $("#tune").attr("src", "http://freesound.org/data/previews/334/334540_4959932-lq.mp3");
            app.sendMessage(" t " + "r " + settings.intensity + " " + settings.duration + "\r");
            // Turn off
            setTimeout(function() {
                $("#b").css("border-color", "#c30800");
            }, 200);
        } else if (divid === "c") {
            $("#c").css("border-color", "#ffec00");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334542_4959932-lq.mp3");
            app.sendMessage(" t " + "l " + settings.intensity + " " + settings.duration + "\r");
            // Turn off
            setTimeout(function() {
                $("#c").css("border-color", "#c3b400");
            }, 200);
        } else if (divid === "d") {
            $("#d").css("border-color", "#29abd0");
            $("#tune").attr("src", "https://freesound.org/data/previews/334/334538_4959932-lq.mp3");
            app.sendMessage(" t " + "h " + settings.intensity + " " + settings.duration + "\r");
            // Turn off
            setTimeout(function() {
                $("#d").css("border-color", "#196d85");
            }, 200);
        }

        audio[0].pause();
        audio[0].load();
        audio[0].play();

    };

    // Generate Simon sequence
    function createSequence() {

        if (settings.mode === 0)  {    // Singleplayer
            var text = "";
            var possible = "abcd";

            for (var i = 0; i < 18; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            settings.sequence = text.split('');
        }
        else { chat.createSequence(); } // Multiplayer: Server-generated sequence

        console.log('New sequence: ' + settings.sequence);

    }

    function playSequence() {

        // Animate Sequence
        function myLoop() {
            setTimeout(function() {

                simon.animate(settings.sequence[settings.playNumber]);
                settings.playNumber++;

                if (settings.playNumber < settings.round) {
                    myLoop();

                // End of sequence
                } else {
                    settings.playNumber = 0;
                    if (settings.mode < 2) {
                        setTimeout(function () {
                            simon.yourTurn = true;
                            simon.turn = "Your turn";
                            $("#turn").html(simon.turn);
                        }, 400);
                    }
                }
            }, settings.speed)
        }
        myLoop();
    }

    // PRESSED
    simon.pressed = function() {
        console.log('Pressed');
        settings.clicked++;
        settings.clickedP1++;
        settings.clickedP2++;

        // START AGAIN
        if ($("#fail").is(':visible')) {
            if (settings.mode > 0) {
                chat.startAgain();    // Multiplayer
            } else {
                simon.startAgain();    // Singleplayer
            }
        }
        // NEXT ROUND
        else if ($("#start").is(':visible')) {
            app.sendMessage(" t " + "test " + settings.intensity + " " + settings.durationStart + "\r");
            if (settings.mode > 0) {
                chat.nextRound();    // Multiplayer
            } else {
                simon.nextRound();    // Singleplayer
            }
        }
        // CORRECT
        else if (settings.mode === 0 && simon.simonId === settings.sequence[settings.clicked-1]) {
            console.log("Right!");

            // End of repeated sequence
            if (settings.clicked === settings.round) {
                settings.clicked = 0;
                if (settings.mode > 0) {
                    chat.nextRound();    // Multiplayer
                } else {
                    simon.nextRound();    // Singleplayer
                }
            }

        }
        // CORRECT: MODE 1
        else if (settings.mode === 1 && app.leftShoe && simon.simonId === settings.sequence[settings.clickedP1-1]) {
            console.log("Right!");

            // End of repeated sequence
            if (settings.clickedP1 === settings.round) {
                settings.clickedP1 = 0;

                if (settings.mode > 0){
                    chat.finished(1, true);    // Multiplayer
                } else {
                    simon.finishedP1 = true;    // Singleplayer
                }

                if (simon.finishedP2) {
                    if (settings.mode > 0) {
                        chat.nextRound();    // Multiplayer
                    } else {
                        simon.nextRound();    // Singleplayer // ERASE this shit
                    }
                }
                else { // ADD simon.yourTurn = false;
                    simon.turn = "Waiting for Player 2";
                    $("#turn").html(simon.turn);
                }
            }
        }
        // CORRECT: MODE 1
        else if (settings.mode === 1 && app.rightShoe && simon.simonId === settings.sequence[settings.clickedP2-1]) {
            console.log("Right!");

            // End of repeated sequence
            if (settings.clickedP2 === settings.round) {
                settings.clickedP2 = 0;

                if (settings.mode > 0) {
                    chat.finished(2, true);    // Multiplayer
                } else {
                    simon.finishedP2 = true;   // Singleplayer
                }

                if (simon.finishedP1) {
                    if (settings.mode > 0) {
                        chat.nextRound();    // Multiplayer
                    } else {
                        simon.nextRound();   // Singleplayer
                    }
                }
                else {
                    simon.turn = "Waiting for Player 1";
                    $("#turn").html(simon.turn);
                }
            }

        // ADDITION: MODE 2
        } else if (settings.mode === 2 && simon.yourTurn && settings.sequence.length < settings.clicked) {
            console.log("Addition!");
            settings.clicked = 0;
            chat.addition(simon.simonId);

            if (app.leftShoe) {
                chat.yourTurn(2);
            }
            else {
                chat.yourTurn(1);
            }
            chat.nextRound();

        // CORRECT: MODE 2
        } else if (settings.mode === 2 && simon.yourTurn && simon.simonId === settings.sequence[settings.clicked-1]) {
            console.log("Right!");

        // WRONG
        } else if ((app.leftShoe && !simon.finishedP1) || (app.rightShoe && !simon.finishedP2)) {
            console.log("WRONG");
            if (settings.mode > 0) {
                if (app.rightShoe) {
                    chat.fail(2);    // Multiplayer
                }
                else if (app.leftShoe) {
                    chat.fail(1);    // Multiplayer
                }

            } else {
                simon.fail();    // Singleplayer
            }
        }
    };
    // START INTERFACE
    $("#start").on("click", function() {
        // Start Effect
        app.sendMessage(" t " + "test " + settings.intensity + " " + settings.durationStart + "\r");

        if (settings.mode > 0) {
            chat.nextRound();    // Multiplayer
        } else {
            simon.nextRound();    // Singleplayer
        }
    });
    // FAIL INTERFACE
    $("#fail").on("click", function() {
        if (settings.mode > 0) {
            chat.startAgain();    // Multiplayer
        } else {
            simon.startAgain();    // Singleplayer
        }
    });

    // SHOE-LESS MOD
    if (app.leftShoe) {
        $("#a").on("click", function () {
            endTimeT1 = new Date();
            if ((endTimeT1 - startTimeT1) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "a";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                    simon.animate("a");
                }
                simon.pressed();
                startTimeT1 = new Date();
            }
        });
        $("#b").on("click", function () {
            endTimeR1 = new Date();
            if ((endTimeR1 - startTimeR1) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "b";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                    simon.animate("b");
                }
                simon.pressed();
                startTimeR1 = new Date();
            }
        });
        $("#c").on("click", function () {
            endTimeL1 = new Date();
            if ((endTimeL1 - startTimeL1) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "c";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                    simon.animate("c");
                }
                simon.pressed();
                startTimeL1 = new Date();
            }
        });
        $("#d").on("click", function () {
            endTimeH1 = new Date();
            if ((endTimeH1 - startTimeH1) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "d";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP1) {
                    simon.animate("d");
                }
                simon.pressed();
                startTimeH1 = new Date();
            }
        });
    } else {
        $("#a").on("click", function () {
            endTimeT2 = new Date();
            if ((endTimeT2 - startTimeT2) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "a";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                    simon.animate("a");
                }
                simon.pressed();
                startTimeT2 = new Date();
            }
        });
        $("#b").on("click", function () {
            endTimeR2 = new Date();
            if ((endTimeR2 - startTimeR2) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "b";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                    simon.animate("b");
                }
                simon.pressed();
                startTimeR2 = new Date();
            }
        });
        $("#c").on("click", function () {
            endTimeL2 = new Date();
            if ((endTimeL2 - startTimeL2) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "c";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                    simon.animate("c");
                }
                simon.pressed();
                startTimeL2 = new Date();
            }
        });
        $("#d").on("click", function () {
            endTimeH2 = new Date();
            if ((endTimeH2 - startTimeH2) >= settings.delay) {
                //app.rightShoe = true;
                //app.leftShoe = false;
                simon.simonId = "d";

                if ($("#fail").is(':hidden') && $("#start").is(':hidden') && !simon.finishedP2) {
                    simon.animate("d");
                }
                simon.pressed();
                startTimeH2 = new Date();
            }
        });
    }


    // NEXT ROUND
    simon.nextRound = function() {
        simon.finishedP1 = false;
        simon.finishedP2 = false;
        if (settings.mode < 2) {
            simon.yourTurn = false;
        }
        if (simon.yourTurn) {
            simon.turn = "Your turn";
            $("#turn").html(simon.turn);

        } else if (settings.mode < 2) {
            simon.turn = "Simon's turn";
            $("#turn").html(simon.turn);
        }
        $("#start").hide();
        $("#simon, #count").css("filter", "blur(0px)");
        $("#simon, #count").css("-webkit-filter", "blur(0px)");
        if (settings.round === 0) {
            settings.clicked = 0;
            settings.clickedP1 = 0;
            settings.clickedP2 = 0;

            if (settings.mode === 1 && app.leftShoe) { // Only one shoe sends message
                chat.createSequence();     // Multiplayer
            } else if (settings.mode === 0) {
                createSequence();    // Singleplayer
            } else if (settings.mode === 2) {
                settings.sequence = [];
                if (app.leftShoe) {
                    simon.yourTurn = true;
                } else {
                    simon.yourTurn = false;
                }
            }
        }
        settings.round++;
        playSequence();
        setTimeout(function(){
            $("#count").html(settings.round);
        },600);
    };

    // FAIL
    simon.fail = function() {
        $("#fail").show();
        // Fail Effect
        app.sendMessage(" t " + "test " + settings.intensity + " " + settings.durationFail + "\r");
        app.sendMessage(" t " + "test " + settings.intensity + " " + settings.durationFail + "\r");

        $("#fail").addClass("bigEntrance");
        $("#tune").attr("src", "http://freesound.org/data/previews/415/415764_6090639-lq.mp3");
        audio[0].pause();
        audio[0].load();
        audio[0].play();
        $("#simon, #count").css("filter", "blur(5px)");
        $("#simon, #count").css("-webkit-filter", "blur(5px)");

        $("#a, #b, #c, #d").off("mousedown");
        if (settings.mode == 0) {
            simon.turn = "Your turn";
            $("#turn").html(simon.turn);
        }
        settings.sequence = [];
        startTimeF = new Date();
    };

    simon.startAgain = function() {
        endTimeF = new Date();
        if ((endTimeF-startTimeF) < settings.delayFail) {
            return;
        }
        // Start Again Effect
        app.sendMessage(" t " + "test " + settings.intensity + " " + settings.durationStart + "\r");

        simon.yourTurn = false;
        simon.turn = "Simon's turn";
        $("#turn").html(simon.turn);
        $("#fail").hide();
        settings.sequence = [];
        settings.round = 0;
        settings.playNumber = 0;
        settings.speed = 1000;
        settings.clicked = 0;
        settings.clickedP1 = 0;
        settings.clickedP2 = 0;
        if (settings.mode > 0 && app.leftShoe) { // Only one shoe sends message
            chat.nextRound();    // Multiplayer
        } else if (settings.mode === 0) {
            simon.nextRound();    // Singleplayer
        }
    };

}); //document ready