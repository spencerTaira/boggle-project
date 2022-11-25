from flask import Flask, request, render_template, jsonify, session
from uuid import uuid4
from flask_socketio import SocketIO, emit, join_room, leave_room
from player import Player
import random
import os

# SESS_HIGH_SCORE_KEY = "high_score"
# SESS_NUM_PLAYS_KEY = "num_plays"

# SECRET_KEY = os.environ['SECRET_KEY']

SECRET_KEY = "hello"

app = Flask(__name__)
app.config["SECRET_KEY"] = SECRET_KEY
# socketio = SocketIO(app,logger=True, engineio_logger=True, ping_interval=1, ping_timeout=5)

socketio = SocketIO(app, logger=True, engineio_logger=True)
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
    emit("debug", 'connnecttttingggg')
    lobby_id = session["room_name"]
    username = session["username"]
    print("Connection information>>>>>>>>>>>>>>>", request.sid, lobby_id, username )
    join_room(lobby_id)

    player = Player(username, lobby_id)

    if (lobby_id in games):
        # if games[lobby_id].get("game", False):
        #     games[]
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

@socketio.on('finished-game')
def score_word():
    lobby_id = session["room_name"]
    username = session["username"]

    if check_if_winner(username, lobby_id):
        emit('debug', 'winner')
        emit('game-result', f"Congrats {username}!!! You are the winner!!!")

    else:
        # emit('debug', 'loser')
        emit(
            'game-result',
            f"Congrats {username}!!! You have earned yourself additional study hall!!!"
        )

@socketio.on('start')
def start():
    ...
    #function to start the game for a paused state or not going

@socketio.on('disconnecting')
def disconnecting(data):
    print("What happens when disconnecting is recieved?", data )

@socketio.on('disconnect')
def disconnect():
    player = session["username"]
    lobby_id = session["room_name"]
    print("What happens at disconnect???????????????????", request.sid, player, lobby_id)
    #handle user disconnections

@socketio.on('close')
def close():
    player = session["username"]
    lobby_id = session["room_name"]
    print("What happens at closing???????????????????", request.sid, player, lobby_id)
    #handle user disconnections


@socketio.on('to-lobby')
def to_lobby():
    ...
    #triggers back to lobby command

@socketio.on('restart') #restart button only visible to creator
def restart():
    lobby_id = session["room_name"]

    game = games[lobby_id]["game"]
    game.reset()

    players = games[lobby_id]["players"]
    for player in players:
        players[player].reset()

    emit('connected', {
            "lobbyId":lobby_id,
            "board":game.board,
            }, to=lobby_id)


    players_info = all_player_serialize(games[lobby_id]["players"])
    emit('update_scores', players_info, to=lobby_id)

@socketio.on('delete') #on creator going back to lobby #TODO: still need Front-end to emit
def delete():
    lobby_id = session["room_name"]
    del games[lobby_id]["game"]



# @app.post("/api/end-game")
# def end_game():
#     """Handle end of game:

#     - remove board from list of boards
#     - return JSON {score, numPlays, highScore}
#     """

#     lobby_id = request.json["gameId"]
#     game = games[lobby_id]

# #Don't really need?
#     num_plays = session.get(SESS_NUM_PLAYS_KEY, 0)
#     high_score = session.get(SESS_HIGH_SCORE_KEY, 0)

#     session[SESS_NUM_PLAYS_KEY] = num_plays = num_plays + 1
#     session[SESS_HIGH_SCORE_KEY] = high_score = max(game.score, high_score)
#Don't really need above


#Run some sort of algo to figure out top score of users in game ID
#Return object like:
    #{user: username: score:score}

    # return jsonify(
    #     gameScore=game.score,
    #     numPlays=num_plays,
    #     highScore=high_score)




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


def check_if_winner(username, lobby_id):
    """ Takes in a username and checks to see if that user is a winner """
    if username == get_winner(lobby_id).username:
        return True
    else:
        return False

def get_winner(lobby_id):
    players = games[lobby_id]["players"]
    players_list = [players[player] for player in players]
    # print('-----------------------------------', players_list,'-----------------------------------' )
    def _myFunc(player):
        return player.score

    players_list.sort(reverse=True, key=_myFunc)
    return players_list[0]
"""
Games Object (games in existence) =
{
    lobbyId1: {
        players: {
            "username1": player1(class obj),
            "username2": player2,
        }
        game: game (instance of game class)

    },
    lobbyId2: {
        players: [player1(obj), player2, player3, player4],
        game: game (instance of game class)
    }
}
"""
