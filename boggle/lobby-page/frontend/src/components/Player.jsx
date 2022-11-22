/**
 * Player
 *
 * Props:   id - string
 *          username - string
 *          isReady - boolean
 *          isLeader - boolean
 *          changeReadyStatus - function to change player's status
 *
 * State:
 *
 * PlayersList -> Player
 */
function Player({ id, username, isReady, isLeader, changeReadyStatus }) {
  return (
    <div className="Player">
      <span>
        <span>{isLeader === true && "🔰"}</span>
        {username}
      </span>
      <span>
        <button onClick={() => changeReadyStatus(id)}>
          {isReady === true ? "READY" : "NOT READY"}
        </button>
      </span>
    </div>
  );
}

export default Player;
