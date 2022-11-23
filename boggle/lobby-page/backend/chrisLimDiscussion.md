seems like 'connection' is a reserved type in flask-socketio
we maybe will just use that. or create a second type 'join' that will actually pop up a message in chat

then type 'message' should be for actual chats
hopefully we can handle JSON to attach meta data.
    like: {
        'time': '13:10',
        'message': 'hi',
        'username': 'chris123',
        'room': 'WVAS'
    }


types of data:
    - 'join'
    - 'chat'
    - 'ready'
