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
