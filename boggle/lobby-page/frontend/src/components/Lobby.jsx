import { useEffect, useState } from "react";
import "./Lobby.css";
import { socket } from "../socket";
import ChatBox from "./ChatBox";
import PlayersList from "./PlayersList";
import { getLobby, leaveLobby } from "../helpers";
import { useParams } from "react-router-dom";

/**
 * Lobby
 *
 * Props:
 *
 * State:   chats - a list of chats
 *          players - a list of players
 *          currLobby - the current lobby
 *
 * App -> Lobby -> PlayersList, ChatBox
 */
function Lobby() {
  const [chats, setChats] = useState([
    { username: "u1", msg: "m1" },
    { username: "u2", msg: "m2" },
    { username: "u1", msg: "m3" },
  ]); // TODO: fix this
  const [players, setPlayers] = useState([
    { username: "u1", id: "1", isReady: false, isLeader: true },
    { username: "u2", id: "2", isReady: true, isLeader: false },
  ]); // TODO: fix this
  const [lobby, setLobby] = useState(getLobby);
  const [id, setId] = useState(useParams().id);

  useEffect(() => {
    // TODO: socket stuff, get the players/chats from the lobby
    // ON MOUNT

    return () => {
      leaveLobby();
    };
  }, []);

  useEffect(() => {
    // TODO: socket stuff, get players
    // LISTENER
    // CLOSE LISTENER
  });

  useEffect(() => {
    // TODO: socket stuff, get chats
    // LISTENER
    // CLOSE LISTENER
  });

  /**Change the player's status. */
  function changeReadyStatus(id) {
    // TODO: socket stuff, change player's ready status
  }

  /**Send a chat mesage. */
  function sendChatMessage(msg) {
    // TODO: socket stuff, send the message
    socket.emit("hello", "world"); //testChrisChen
  }

  return (
    <div className="Lobby">
      {/* PlayersList */}
      <PlayersList players={players} changeReadyStatus={changeReadyStatus} />
      {/* Chat Box */}
      <ChatBox chats={chats} sendChatMessage={sendChatMessage} />
    </div>
  );
}

export default Lobby;
