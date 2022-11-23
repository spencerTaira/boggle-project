"use strict";
var socket = io();

const urlParts = document.URL.split("/");
const roomName = urlParts[urlParts.length - 1];

socket.on('connected', start);
socket.on('join', updatePlayers);
socket.on('debug', (data) => console.log('debug', data));
socket.on('update_scores', updatePlayers);
socket.on('countdown', showTimer);
//socket.on('end_game')

socket.on('guess_result', handleGuessResult);


$form.on("submit", handleFormSubmit);
function handleFormSubmit(evt) {
    evt.preventDefault();

    const word = $wordInput.val().toUpperCase();
    if (!word) return;

    socket.emit('guess', {'lobbyId': lobbyId, 'word':word});

    $wordInput.val("").focus();
  }


/** Handle end of game */



// $BUTTON.on("click", sendMessage);
// function sendMessage(evt){
//     evt.preventDefault();
//     // websocket.send($FORM_INPUT.val());
//     socket.emit("message",{room: roomName, username: name, message:$FORM_INPUT.val()});
//     // socket.emit("test", "some other data here");
// }

// //websocket.addEventListener("message", recieveMessage)

// socket.on('connected', (message) => {
//     console.log(message);
//     socket.emit('join', {room: roomName, username: name});
// });

// socket.on('join', joinMessage);

// function joinMessage(message) {
//     console.log(message);
//     $INCOMING.append(`<p>${message}</p>`);
// }

// socket.on("message received", recieveMessage);

// function recieveMessage(message){
//     console.log(message);
//     $INCOMING.append(`<p>${message}</p>`);
// }
