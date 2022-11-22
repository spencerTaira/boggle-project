"use strict";
var socket = io();
// socket.on('connect', function() {
//     socket.emit('my event', {data: 'I\'m connected!'});
// });

//const websocket = new WebSocket("ws://localhost:8001/");

const urlParts = document.URL.split("/");
const roomName = urlParts[urlParts.length - 1];
const name = prompt("Username? (no spaces)");
const $BUTTON = $("#test-form-button");
const $FORM_INPUT = $("#text-to-send");
const $INCOMING = $("#recieved");


$BUTTON.on("click", sendMessage);
function sendMessage(evt){
    evt.preventDefault();
    // websocket.send($FORM_INPUT.val());
    socket.emit("message",{room: roomName, username: name, message:$FORM_INPUT.val()});
    // socket.emit("test", "some other data here");
}

//websocket.addEventListener("message", recieveMessage)

socket.on('connected', (message) => {
    console.log(message);
    socket.emit('join', {room: roomName, username: name});
});

socket.on('join', joinMessage);

function joinMessage(message) {
    console.log(message);
    $INCOMING.append(`<p>${message}</p>`);
}

socket.on("message received", recieveMessage);

function recieveMessage(message){
    console.log(message);
    $INCOMING.append(`<p>${message}</p>`);
}