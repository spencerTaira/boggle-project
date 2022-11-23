# import os
# from dotenv import load_dotenv

from flask import (
    Flask, render_template, request, flash, redirect, session, g
)
import json
# from flask import Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"

rooms = [ {"name": "Room1", "id" : "1234"},
          {"name": "Room2", "id" : "567"},
          {"name": "Room3", "id" : "890"} ] 


################ Homepage route ##########################

# Retrieve rooms
@app.get("/homepage")
def displayRooms():
    return rooms

# POST: add room
@app.post("/addRoom/<room_name>")
def addRoom(room_name):

    rooms.append(json.loads(request.data))
    print(type(json.loads(request.data)), "<<<< request")
    print(rooms[3]["roomName"], "<<<<<<< check rooms")
    # add room to displayRooms obj
    # get session data for username

    # addRoom code & username to global game obj

    # redirect to joinRoom with global game obj

    return {"addRoom": room_name}

@app.get("/joinRoom/<room_name>")
def joinRoom(room_name):
    return redirect("/lobby")


if __name__ == "__main__":
    app.run()
