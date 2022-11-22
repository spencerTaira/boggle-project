"use strict";

const websocket = new WebSocket("ws://localhost:8001/");

const $BUTTON = $("#test-form-button");
const $FORM_INPUT = $("#text-to-send");
const $INCOMING = $("#recieved");

$BUTTON.on("click", sendMessage);
function sendMessage(evt){
    evt.preventDefault();
    websocket.send($FORM_INPUT.val());
}

websocket.addEventListener("message", recieveMessage)

function recieveMessage(data){
    console.log(data);
    $INCOMING.append(`<p>${data.data}</p>`)
}