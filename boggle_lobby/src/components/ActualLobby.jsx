import { useState } from "react";
import ChatBox from "./ChatBox";
import PlayersList from "./PlayersList";

/**
 * ActualLobby
 *
 * State:   players - list of players, {username: string, isLeader: false, isReady: false}
 *          chats - list of chats, {msg: string, username: string, id: string}
 *          inputValue - the chat text
 *
 * Props:
 *
 * Lobby -> ActualLobby -> PlayersList, ChatBox
 */
function ActualLobby() {
  // const [isReady, setIsReady] = useState(false);
  // const [isLeader, setIsLeader] = useState(false);
  const [players, setPlayers] = useState([
    { username: "u1", isLeader: false, isReady: false },
    { username: "u2", isLeader: false, isReady: false },
    { username: "u3", isLeader: false, isReady: false },
    { username: "u4", isLeader: false, isReady: false },
  ]);
  const [chats, setChats] = useState([
    { msg: "hello", username: "u1", id: 123 },
    { msg: "there", username: "u1", id: 123 },
    { msg: "Hi", username: "u2", id: 345 },
  ]);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    // TODO: FIX THIS!!
    const { username } = localStorage.getItem("user");
    setChats((chats) => [
      ...chats,
      { msg: inputValue, username, id: Math.random() },
    ]); // <----------- FIX THIS
    setInputValue("");
  }

  function handleChange(evt) {
    setInputValue(evt.target.value);
  }

  return (
    <div className="ActualLobby">
      {/* Players in lobby */}
      <PlayersList players={players} />
      {/* Chat box */}
      <ChatBox
        chats={chats}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      {/* Leave Lobby Button*/}
      <a href="#">
        <button>Leave Lobby</button>
      </a>
    </div>
  );
}

export default ActualLobby;
