import Player from "./Player";

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
