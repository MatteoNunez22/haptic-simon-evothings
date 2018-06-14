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

    chat.generateLetter = function () {
        socket.emit('generate', {});
    };

    chat.passShoe = function (player, value) {
        socket.emit('shoe', {
            player: player,    // Player: 1 or 2
            value: value      // Value: true or false
        });
    };

    chat.fail = function () {
        socket.emit('fail', {})
    };

    chat.startNew = function () {
        socket.emit('startnew', {})
    };

    // Listen for events
    socket.on('generate', function(text) {
        letter = text;
        $("#letter").html(letter);
        settings.sequence.push(letter);
    });

    socket.on('shoe', function(data) {
        if(data.player == 1) {
            simon.finishedP1 = data.value;
        } else {
            simon.finishedP2 = data.value;
        }
    });

    socket.on('fail', function() {
        simon.fail();
    });

    socket.on('startnew', function() {
        simon.startNew();
    });

};