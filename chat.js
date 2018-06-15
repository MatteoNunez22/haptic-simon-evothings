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

    chat.passShoe = function (player, finished) {
        socket.emit('shoe', {
            player: player.value ,    // Player: 1 or 2
            finished: finished.value      // Finished: true or false
        });
    };

    chat.fail = function () {
        socket.emit('fail', {})
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

    socket.on('shoe', function(data) {
        console.log('!!!!!!! data.player = ', data.player);
        if(data.player == 1) {
            simon.finishedP1 = data.finished;
        } else {
            simon.finishedP2 = data.finished;
        }
    });

    socket.on('fail', function() {
        simon.fail();
    });

    socket.on('startnew', function() {
        simon.startNew();
    });

    socket.on('startfail', function() {
        simon.startFail(); // Only one shoe sends message
    });

};