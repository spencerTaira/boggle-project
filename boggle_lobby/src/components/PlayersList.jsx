/**
 * PlayersList
 *
 * State:
 *
 * Props:   players - list of players, {username: string, isLeader: false, isReady: false}
 *
 * ActualLobby -> PlayersList
 */
function PlayersList({ players }) {
  return (
    <div className="PlayersList">
      {players.map((player) => (
        <div key={player.username}>
          <span>{player.username}</span>
          <span>
            <button>{player.isReady === true ? "Ready" : "Not Ready"}</button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default PlayersList;
