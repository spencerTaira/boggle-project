HOMEPAGE, LOBBY, GAME

(ec + ja) homepage --> create or join a lobby

(cl + cc) lobby --> must have (1-10 players, or whatever), there is ONE lobby leader!
            and players can ready up! or unready themselves.
            players can also chat into a chat room!
            once ALL players are ready'ed up. lobby leader may start the game!!


(mb + st) game -->


--- LOBBY ---

big ideas:
    how should we handle the session?
        ... what's on the session? is it signed? does it matter?...
    what's the endpoint for the app routing? is it a "one-page app?"
    --biggest idea. how will we use web-sockets??

other important idea:
    communicate with the other two teams!
    how do we accept users from the homepage?
    how do we send users to the game page?
    There are many lobby rooms! and we should do some basic user tracking
        e.g. if they refresh the page on accident, they will still be in the lobby!
        and see the same chat room + ready status!
    big idea--is this the same endpoint as homepage? as game page?


PROPOSAL FOR ROUTES:

BASE_URL/home
    for homepage
BASE_URL/room/[room_id]/lobby
    for each lobby
BASE_URL/room/[room_id]/game
    for each game... DIFFERENTIATE WITH A URL PARAM??

alt. frontend component switching.
    hide all lobby display components
    then show all game display components

how to decide on this question? we would decide what is easier when using a web-socket.


GOING FORWARD:

chris lim --- make a react app for front end of the lobby!
    we can talk about the diagram rn?
React Components:
    App --> LobbyApp --> etc?

chris chen --- make a web socket work in python-flask.

how would they talk to each other??
    in PRINCIPLE -- they can send JS objects.. or python dictionaries across back and forth
just lean on this fact... and we can work out the details later!
JSON is sent back and forth!!

other stuff:
    probably lobbies should have... a 4 letter code (this seems very popular)
    use backend pseudo-ORM to ensure the 4 letter codes are unique!!
    from there.. user-id's can be username-as-id/auto-increment/uuid. doesn't matter just pick one.
    seems like it is username-as-id!
