# import os
# from dotenv import load_dotenv

from flask import (
    Flask, render_template, request, flash, redirect, session, g
)
import json
# from flask import Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"

rooms = { "rooms": [
  {"roomName": "Room1", "id" : "1234"},
  {"roomName": "Room2", "id" : "567"},
  {"roomName": "Room3", "id" : "890"}
]}

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
    print(rooms["rooms"][3]["roomName"], "<<<<<<< check rooms")
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
    return redirect("/lobby")


if __name__ == "__main__":
    app.run()
