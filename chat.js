var chat = {};

chat.connect = function() {

    console.log('chat.connect');

    // Make connection                                     // McGill IP
    var socket = io.connect('http://142.157.36.211:4000'); // 142.157.37.246:4000
                                                           // Local IP
    /*/ Query DOM                                           // 192.168.2.13:4000
    var btn = document.getElementById('send'),
        letter = document.getElementById('letter');*/

    // Emit events
    chat.createSequence = function () {
        socket.emit('generate', {});
    };

    chat.finished = function (player, finished) {    // Player: 1 or 2
        socket.emit('shoe', player, finished );     // Finished: true or false
    };

    chat.fail = function (loser) {
        socket.emit('fail', loser);    // Loser: 1 or 2
    };

    chat.nextRound = function () {
        socket.emit('nextRound', {});
    };

    chat.startAgain = function () {
        socket.emit('startAgain', {});
    };

    chat.yourTurn = function (player) {
        socket.emit('yourTurn', player);
    };

    chat.addition = function (letter) {
        socket.emit('addition', letter);
    };

    // Listen for events
    socket.on('generate', function (text) {
        settings.sequence = text.split('');

        letter = text;
        $("#letter").html(letter);
    });

    socket.on('shoe', function(player, finished) {
        if(player === 1) {
            simon.finishedP1 = finished;
        } else if (player === 2) {
            simon.finishedP2 = finished;
        }
    });

    socket.on('fail', function(loser) {
        if (loser === 1) {
            if (app.leftShoe) {
                simon.turn = "You lose!";
                $("#turn").html(simon.turn);
            }
            else if (app.rightShoe) {
                simon.turn = "You win!";
                $("#turn").html(simon.turn);
            }
        } else if (loser === 2) {
            if (app.leftShoe) {
                simon.turn = "You win!";
                $("#turn").html(simon.turn);
            }
            else if (app.rightShoe) {
                simon.turn = "You lose!";
                $("#turn").html(simon.turn);
            }
        }
        simon.fail();
    });

    socket.on('nextRound', function() {
        simon.nextRound();
    });

    socket.on('startAgain', function() {
        simon.startAgain(); // Only one shoe sends message
    });

    socket.on('yourTurn', function(player) {
        if (player === 1) {
            if (app.leftShoe) {
                simon.yourTurn = true;
                simon.turn = "Your turn";
                $("#turn").html(simon.turn);
            } else {
                simon.yourTurn = false;
                simon.turn = "Wait for player 2";
                $("#turn").html(simon.turn);
            }
        } else {
            if (app.leftShoe) {
                simon.yourTurn = false;
                simon.turn = "Wait for player 1";
                $("#turn").html(simon.turn);
            } else {
                simon.yourTurn = true;
                simon.turn = "Your turn";
                $("#turn").html(simon.turn);
            }
        }
    });

    socket.on('addition', function (letter) {
        settings.sequence.push(letter);
        console.log("Settings.sequence: " + settings.sequence);
    });
};