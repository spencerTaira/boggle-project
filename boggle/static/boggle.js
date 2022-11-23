"use strict";

const $playedWords = $("#words");
const $form = $("#newWordForm");
const $wordInput = $("#wordInput");
const $score = $("#score");
const $timer = $("#timer");
const $message = $(".msg");
const $table = $("table");
const $scoreboard = $("#scoreboard");
const $gameResults = $("#game-results");

const GAME_LENGTH_SECS = 60;

let lobbyId;
let secondsLeftInGame;


/** Start */

// async function start() {
//   let response = await axios.post("/api/new-game");
//   gameId = response.data.gameId;
//   let board = response.data.board;

//   displayBoard(board);
//   secondsLeftInGame = GAME_LENGTH_SECS;
//   showTimer(secondsLeftInGame);
// }

function start(data) {
  console.debug("start", data);
  lobbyId = data.lobbyId;
  let board = data.board;

  displayBoard(board);
  // secondsLeftInGame = GAME_LENGTH_SECS;
  // showTimer(secondsLeftInGame);
}

function updatePlayers(playersData) {
  console.debug("updatePlayers", playersData);
  $scoreboard.empty();
  for (const playerData of playersData) {
    $scoreboard.append(
      `<p>Name: ${playerData.player_id} Score: ${playerData.score}</p>`
      );
  }
}
/** Display usernames and scores */
//TODO: update DOM with username/scores(default = 0)

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

function handleGuessResult(data) {

  const {word, result, playerScore} = data;

  if (result === "already-played") {
    showMessage(`Already played: ${word}`, "err");
  } else if (result === "not-word") {
    showMessage(`Not valid word: ${word}`, "err");
  } else if (result === "not-on-board") {
    showMessage(`Not on board: ${word}`, "err");
  } else {
    showWord(word);
    showScore(playerScore);
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

function showGameResults(msg) {
  $gameResults.empty();
  $gameResults.append(msg);
}

/** "Tick" timer every second. */

// async function tick() {
//   secondsLeftInGame -= 1;
//   this.showTimer(secondsLeftInGame);

//   if (secondsLeftInGame === 0) {
//     clearInterval(timerId);
//     await endGame();
//   }
// }

// let timerId = setInterval(tick, 1000);


/** Handle end of game */

// async function endGame() {
//   $form.hide();

//   const response = await axios({
//     url: "/api/end-game",
//     method: "POST",
//     data: {gameId},
//   });

//   const { gameScore, highScore, numPlays } = response.data;

//   showMessage(
//       `Final score: ${gameScore} /
//             High score: ${highScore} /
//             Num plays: ${numPlays}`);
// }

function endGame(){
  $form.hide();
}