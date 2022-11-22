import { useState } from "react";
import "./Lobby.css";
import { socket } from "../socket";
import ChatBox from "./ChatBox";
import PlayersList from "./PlayersList";

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

  function changeReadyStatus(id) {
    // TODO: socket stuff
  }

  return (
    <div className="Lobby">
      {/* PlayersList */}
      <PlayersList players={players} changeReadyStatus={changeReadyStatus} />
      {/* Chat Box */}
      <ChatBox chats={chats} />
    </div>
  );
}

export default Lobby;
