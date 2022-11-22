import Player from "./Player";

/**
 * PlayersList
 *
 * Props:   players - list of players
 *          changeReadyStatus - function to changer player's status
 *
 * State:
 *
 * Lobby -> PlayersList -> Player
 */
function PlayersList({ players, changeReadyStatus }) {
  return (
    <div className="PlayersList">
      {players.map((player) => (
        <Player
          key={player.id}
          {...player}
          changeReadyStatus={changeReadyStatus}
        />
      ))}
    </div>
  );
}

export default PlayersList;
