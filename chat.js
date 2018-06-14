// Make connection
var socket = io.connect('http://142.157.37.246:4000');

// Query DOM
var handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    letter = document.getElementById('letter');

// Emit events
btn.addEventListener('click', function() {
    socket.emit('generate', {});
});

// Listen for events
socket.on('generate', function(text) {
    letter = text;
    $("#letter").html(letter);
    settings.sequence.push(letter);
});

// Functions
var chat = {};

chat.generateLetter = function () {
    socket.emit('generate', {});
};