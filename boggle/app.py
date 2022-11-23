from flask import Flask, request, render_template, jsonify, session
from uuid import uuid4
from flask_socketio import SocketIO, emit, join_room, leave_room
from player import Player
import random

SESS_HIGH_SCORE_KEY = "high_score"
SESS_NUM_PLAYS_KEY = "num_plays"


app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-secret"
socketio = SocketIO(app)
if __name__ == '__main__':
    socketio.run(app)

from boggle import BoggleGame

# The boggle games created, keyed by game id
games = {}
"""
Games Object (games in existence) =
{
    lobbyId1: {
        players: {player1(obj), player2, player3, player4}, (some type of data set)
        game: game (instance of game class)

    },
    lobbyId2: {
        players: [player1(obj), player2, player3, player4],
        game: game (instance of game class)
    }
}
"""


@app.get("/<room_name>")
def homepage(room_name):
    """Show board."""
    session["room_name"] = room_name

    ##############!!!!!!!!!!!!!!!!!!Make this real later!!!!
    session["username"] = str(random.randint(0,100))

    return render_template(
        "index.html"
    )

# 'connect' is magic, automatically sent from client on connection
@socketio.on('connect')
def game_connect():
    
    lobby_id = session["room_name"]
    username = session["username"]
    
    join_room(lobby_id)
    
    player = Player(username, lobby_id)
    
    if (lobby_id in games):
        
        game = games[lobby_id]["game"]
        if username not in games[lobby_id]["players"]:
            games[lobby_id]["players"][username] = player

    else:
        game = BoggleGame(room=lobby_id)
        games[lobby_id] = {"game":game, "players":{username:player}}
     
    emit('connected', {
            "lobbyId":lobby_id,
            "board":game.board,
            })

    players_info = all_player_serialize(games[lobby_id]["players"])
    emit('join', players_info, to=lobby_id)

@socketio.on('guess')
def score_word(data):
    """Check if play is valid and, if so, score the word).
    Takes JSON: {lobby_id, word}
    Returns JSON:
      {result: "already-played | not-word | not-on-board | ok",
       score,
       gameScore}
    """
    
    username = session["username"]
    
    lobby_id = data["lobbyId"]
    word = data["word"].upper()

    game = games[lobby_id]["game"]
    player = games[lobby_id]["players"][username]

    if not player.is_word_not_a_dup(word):
        emit('guess_result', {"word":word, "result": "already-played", "score":0, "playerScore":player.score})

    elif not game.is_word_in_word_list(word):
        emit('guess_result', {"word":word,"result": "not-word", "score":0, "playerScore":player.score})

    elif not game.check_word_on_board(word):
        emit('guess_result', {"word":word,"result": "not-on-board", "score":0, "playerScore":player.score})

    else:
        score = game.play_and_score_word(word)
        player.played_words.add(word)
        player.score += score
        emit('guess_result', {"word":word,"result": "ok", "score":score, "playerScore":player.score})
        
        players_info = all_player_serialize(games[lobby_id]["players"])
        emit('debug', players_info)
        emit('update_scores', players_info, to=lobby_id)



#CHANGE TO WS and wait for a KEYWORD like "end-game" (Don't forget about TIES)

@app.post("/api/end-game")
def end_game():
    """Handle end of game:

    - remove board from list of boards
    - return JSON {score, numPlays, highScore}
    """

    lobby_id = request.json["gameId"]
    game = games[lobby_id]

#Don't really need?
    num_plays = session.get(SESS_NUM_PLAYS_KEY, 0)
    high_score = session.get(SESS_HIGH_SCORE_KEY, 0)

    session[SESS_NUM_PLAYS_KEY] = num_plays = num_plays + 1
    session[SESS_HIGH_SCORE_KEY] = high_score = max(game.score, high_score)
#Don't really need above


#Run some sort of algo to figure out top score of users in game ID
#Return object like:
    #{user: username: score:score}

    return jsonify(
        gameScore=game.score,
        numPlays=num_plays,
        highScore=high_score)




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
#   username, roomId
#   others might need lobby_owner? 


# Games Object


def all_player_serialize(players):
    """ Takes in an object of players and returns their username and score
    in a format that can be JSONed"""

    player_info = [{"player_id":players[player].username, "score":players[player].score} for player in players]
    # emit("debug", player_info)
    return player_info