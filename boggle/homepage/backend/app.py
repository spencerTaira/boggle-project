from flask import Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"

################ Homepage route ##########################

# Retrieve rooms
@app.get("/homepage")
def homepage():
    return {"rooms": 
                [ {"name": "Room1", "id" : "1234"}, 
                  {"name": "Room2", "id" : "567"}, 
                  {"name": "Room3", "id" : "890"}]}

# POST: add room
@app.post("/homepage/<room_name>")
def addRoom(room_name):
    


if __name__ == "__main__":
    app.run()