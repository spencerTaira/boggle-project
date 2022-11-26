"use strict";
var socket = io();

const urlParts = document.URL.split("/");
const roomName = urlParts[urlParts.length - 1];

socket.on('connected', start);
socket.on('join', updatePlayers);
socket.on('debug', (data) => console.log('debug', data));
socket.on('update_scores', updatePlayers);
socket.on('countdown', showTimer);
socket.on('endgame', () => {
  endGame();
  socket.emit('finished-game');
});
socket.on('game-result', showGameResults)
//socket.on('end_game')

socket.on('guess_result', handleGuessResult);


$form.on("submit", handleFormSubmit);
function handleFormSubmit(evt) {
  evt.preventDefault();

  const word = $wordInput.val().toUpperCase();
  if (!word) return;

  socket.emit('guess', { 'lobbyId': lobbyId, 'word': word });

  $wordInput.val("").focus();
}

$restartBtn.on("click", restart);

function restart(e) {
  console.debug('restart');
  e.preventDefault();

  socket.emit('restart');
}


window.onunload = sendDisconnect
// $("#disconnect").on("click", closeSocket);

// function closeSocket(){
//   socket.on();
// }

// $("window").on("beforeunload", () => setTimeout(sendDisconnect,2000));


function sendDisconnect(){
  // e.preventDefault();
  socket.emit('disconnecting');
  socket.disconnect(true);
}

// $table.on("unload", sendDisconnect);


// window.addEventListener("beforeunload", closeWindow);
// function closeWindow(evt){
//   console.log(socket);
//   setTimeout(function(){
//     socket.emit('close');
//     socket.disconnect(true);
//   }, 10);
  //evt.preventDefault();
  //evt.returnValue = 'Thanks for playing!';
// }

// window.onunload = window.onbeforeunload = function(){socket.disconnect(true);}



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
