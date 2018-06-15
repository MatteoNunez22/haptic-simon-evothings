var chat = {};

chat.connect = function() {

    // Make connection
    var socket = io.connect('http://142.157.37.246:4000');

    // Query DOM
    var btn = document.getElementById('send'),
        letter = document.getElementById('letter');

    // Emit events
    btn.addEventListener('click', function() {
        socket.emit('generate', {});
    });

    chat.makeid = function () {
        socket.emit('generate', {});
    };

    chat.passShoe = function (player, finished) {    // Player: 1 or 2
        socket.emit('shoe', player, finished );    // Finished: true or false
        console.log('player = ' + player);
        console.log('finished = ' + finished);
    };

    chat.fail = function (loser) {
        socket.emit('fail', loser)    // Loser: 1 or 2
    };

    chat.startNew = function () {
        socket.emit('startnew', {})
    };

    chat.startFail = function () {
        socket.emit('startfail', {})
    };

    // Listen for events
    socket.on('generate', function(text) {
        settings.sequence = text.split('');

        letter = text;
        $("#letter").html(letter);
    });

    socket.on('shoe', function(player, finished) {
        console.log('!!!!!!! player = ' + player);
        console.log('!!!!!!! finished = ' + finished);
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

    socket.on('startnew', function() {
        simon.startNew();
    });

    socket.on('startfail', function() {
        simon.startFail(); // Only one shoe sends message
    });

};