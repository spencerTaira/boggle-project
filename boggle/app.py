from flask import Flask, request, render_template, jsonify, session
from uuid import uuid4

from boggle import BoggleGame

SESS_HIGH_SCORE_KEY = "high_score"
SESS_NUM_PLAYS_KEY = "num_plays"


app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-secret"


# The boggle games created, keyed by game id
games = {}


@app.get("/")
def homepage():
    """Show board."""

    # these aren't about a particular game, but are tied to the browser
    session[SESS_HIGH_SCORE_KEY] = session.get(SESS_HIGH_SCORE_KEY, 0)
    session[SESS_NUM_PLAYS_KEY] = session.get(SESS_NUM_PLAYS_KEY, 0)

    return render_template(
        "index.html",
        high_score=session[SESS_HIGH_SCORE_KEY],
        num_plays=session[SESS_NUM_PLAYS_KEY])



# This data is a one time send to all players on start
@app.post("/api/new-game")
def new_game():
    """Start a new game and return JSON: {game_id, board}."""

    # get a unique string id for the board we're creating
    game_id = str(uuid4())
    game = BoggleGame()
    games[game_id] = game

    return jsonify(gameId=game_id, board=game.board)


@app.post("/api/score-word")
def score_word():
    """Check if play is valid and, if so, score the word).
    Takes JSON: {game_id, word}
    Returns JSON:
      {result: "already-played | not-word | not-on-board | ok",
       score,
       gameScore}
    """

    word = request.json["word"].upper()
    game_id = request.json["gameId"]
    game = games[game_id]

    if not game.is_word_not_a_dup(word):
        return jsonify(result="already-played", score=0, gameScore=game.score)

    elif not game.is_word_in_word_list(word):
        return jsonify(result="not-word", score=0, gameScore=game.score)

    elif not game.check_word_on_board(word):
        return jsonify(result="not-on-board", score=0, gameScore=game.score)

    else:
        score = game.play_and_score_word(word)
        return jsonify(result="ok", score=score, gameScore=game.score)


@app.post("/api/end-game")
def end_game():
    """Handle end of game:

    - remove board from list of boards
    - return JSON {score, numPlays, highScore}
    """

    game_id = request.json["gameId"]
    game = games[game_id]

    num_plays = session.get(SESS_NUM_PLAYS_KEY, 0)
    high_score = session.get(SESS_HIGH_SCORE_KEY, 0)

    session[SESS_NUM_PLAYS_KEY] = num_plays = num_plays + 1
    session[SESS_HIGH_SCORE_KEY] = high_score = max(game.score, high_score)

    return jsonify(
        gameScore=game.score,
        numPlays=num_plays,
        highScore=high_score)


#update score WS route
#socket.on(guess):
#received data ("guess", {user:"str", word:"str", game_id:(uuid) })
#send data ("updateScore", {user:(username), score:(int)}, to=(room))
# or
#send data ("invalidguess", {word:"str", reason:"str"})

#recieve chat WS message
#socket.on(message):
#received data ("message", {user:(username), message:(msg content)})
#send data ("message", {fromUser:username, message:(msg content)}, to=(room))

#send game WS state data
#socket.on(gamedata)
#received data ("start", {start:true})
#send data ("gamedata", {users:[user1,...], gameId:(uuid), gameboard:(letters on board)})
#run timer function that emits seconds until start


#What are we going to store in session data?????????????

#What will user class look like?????????