import { useState } from "react";
import ActualLobby from "./ActualLobby";
import LobbyForm from "./LobbyForm";

/**
 * Lobby
 *
 * State:   inLobby - boolean
 *          username - string
 *
 * Props:
 *
 * App -> Lobby -> LobbyForm, ActualLobby
 */
function Lobby() {
  const [inLobby, setInLobby] = useState(false);
  const [username, setUsername] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    setInLobby(true);
    // TODO: set the username localstorage?
    // {username: string, isLeader: false, isReady: false}
    // make the userobject on backend
    localStorage.setItem("user", { username, isLeader: false, isReady: false }); // <------- FIX THIS
  }

  function handleChange(evt) {
    setUsername(evt.target.value);
  }

  return (
    <div className="Lobby">
      {/* Show username input. */}
      {inLobby === false && (
        <LobbyForm
          username={username}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Show actual lobby. */}
      {inLobby === true && <ActualLobby />}
    </div>
  );
}

export default Lobby;
