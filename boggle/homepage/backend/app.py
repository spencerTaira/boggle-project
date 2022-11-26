# import os
# from dotenv import load_dotenv

from flask import (
    Flask, render_template, request, flash, redirect, session, g
)

from flask import jsonify
import json
# from flask import Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"

rooms = { "rooms": []}

games = {
  "lobbyId1": {
    "users": {"user1", "user2"}, "game": "<instance>"
  },

  "lobbyId2": {
    "users": {"user3", "user4"}, "game": "<instance>"
  },
}

#RoomId same as gameId

################ Homepage route ##########################

# Retrieve rooms
@app.get("/homepage")
def displayRooms():
    return rooms

# POST: add room
@app.post("/addRoom/<room_name>")
def addRoom(room_name):

    rooms["rooms"].append(json.loads(request.data))
    print(type(json.loads(request.data)), "<<<< request")
    # add room to displayRooms obj
    # get session data for username

    # addRoom code & username to global game obj

    # redirect to joinRoom with global game obj

    return {"addRoom": room_name}

@app.get("/joinRoom/<room_name>")
def joinRoom(room_name):
    session["username"] = request.headers["Username"]
    session["room_name"] = room_name
    print(request.headers, "<<<<<<<<<<<<<<< request headers")
    print(request.headers["Username"], "<<<<<<<<<<< request headers Username")

    response = {
        "room_name" : room_name
    }
    return redirect(f"/room/{room_name}")

@app.get('/room/<room>')
def index(room):
    # print(request.args['response'], "<<<<<<<<< response")
    print("I AM HERE!!!!!!!!!!!!!!!!!!!!")

    # response_obj = {
    #     'status': 'success',
    #     'message': 'success',
    #     'data' : [{"content": render_template('test.html')}]
    # }

    # return jsonify(response_obj)
    return render_template('test.html')

@app.get("/")
def test():
    print("HERE")
    return render_template("test.html")


if __name__ == "__main__":
    app.run()
