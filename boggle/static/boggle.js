"use strict";

const $playedWords = $("#words");
const $form = $("#newWordForm");
const $wordInput = $("#wordInput");
const $score = $("#score");
const $timer = $("#timer");
const $message = $(".msg");
const $table = $("table");

const GAME_LENGTH_SECS = 60;

let gameId;
let secondsLeftInGame;


/** Start */

async function start() {
  let response = await axios.post("/api/new-game");
  gameId = response.data.gameId;
  let board = response.data.board;

  displayBoard(board);
  secondsLeftInGame = GAME_LENGTH_SECS;
  showTimer(secondsLeftInGame);
}

/** Display board */

function displayBoard(board) {
  $table.empty();
  for (let row of board) {
    let $tr = $("<tr>");
    for (let letter of row) {
      $tr.append(`<td>${letter}</td>`);
    }
    $table.append($tr);
  }
}

/** Handle form submit: submit to API, focus on input. */

async function handleFormSubmit(evt) {
  evt.preventDefault();

  const word = $wordInput.val().toUpperCase();
  if (!word) return;

  await submitWordToAPI(word);

  $wordInput.val("").focus();
}

$form.on("submit", handleFormSubmit);


/** Submit word to API and handle response. */

async function submitWordToAPI(word) {
  const response = await axios({
    url: "/api/score-word",
    method: "POST",
    data: { word, gameId }
  });

  const {result, gameScore} = response.data;

  if (result === "already-played") {
    showMessage(`Already played: ${word}`, "err");
  } else if (result === "not-word") {
    showMessage(`Not valid word: ${word}`, "err");
  } else if (result === "not-on-board") {
    showMessage(`Not on board: ${word}`, "err");
  } else {
    showWord(word);
    showScore(gameScore);
    showMessage(`Added: ${word}`, "ok");
  }
}


/** Add word to played word list in DOM */

function showWord(word) {
  $($playedWords).append($("<li>", { text: word }));
}


/** Show status message. */

function showMessage(msg, cssClass) {
  $message
      .text(msg)
      .removeClass()
      .addClass(`msg ${cssClass}`);
}


/** Show score. */

function showScore(score) {
  $score.text(score);
}


/** Show timer. */

function showTimer(secs) {
  $timer.text(secs);
}


/** "Tick" timer every second. */

async function tick() {
  secondsLeftInGame -= 1;
  this.showTimer(secondsLeftInGame);

  if (secondsLeftInGame === 0) {
    clearInterval(timerId);
    await endGame();
  }
}

let timerId = setInterval(tick, 1000);


/** Handle end of game */

async function endGame() {
  $form.hide();

  const response = await axios({
    url: "/api/end-game",
    method: "POST",
    data: {gameId},
  });

  const { gameScore, highScore, numPlays } = response.data;

  showMessage(
      `Final score: ${gameScore} /
            High score: ${highScore} /
            Num plays: ${numPlays}`);
}


start();