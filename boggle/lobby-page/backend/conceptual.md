websockets

have a type
io.on('asdf')
on 'connect'(magic?)
on 'join' (magic?)
on 'message'
on 'guess'

etc...
some are magic. some are our own design

join_room is a library function
    and has type 'join'

emit is a library function
    main way to send anything
    starts with type string
    second arg is the payload. string or JSON!
    third arg is options
        to=, broadcast=, etc
