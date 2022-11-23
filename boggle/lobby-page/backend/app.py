from flask import (
    Flask,
    request,
    render_template,
    jsonify,
    session,
    redirect
)
from flask_socketio import (
    SocketIO,
    emit,
    join_room,
    leave_room
)

app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-secret"
socketio = SocketIO(app)

########################## HTML ROUTES #####################################

@app.get('/')
def roomSelect():
    return render_template('roomSelect.html')

@app.get('/room')
def room():
    room = request.args['room']
    return redirect(f'/room/{room}')

@app.get('/room/<room>')
def index(room):
    return render_template('index.html')

############################ SOCKET ROUTES ####################################

@socketio.on('connect')
def test_connect():
    emit('connected', "we have connected")

@socketio.on('join')
def join(data):
    room = data['room']
    name = data['username']
    session['name'] = name
    session['room'] = room
    join_room(room)
    emit('join',  f"{name} joined the {room}", to=room)

@socketio.on('message')
def receive_msg(data):
    print(data)
    message = data['message']
    # room = data['room']
    emit('message received', f"{session['name']}: {message} message received", to=session['room'])

@socketio.on('test')
def receive_test(test):
    print(test)
    emit('message received', f"{test} message received", broadcast=True)



############################  ####################################


if __name__ == '__main__':
    socketio.run(app)
