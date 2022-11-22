function Chat({ username, msg }) {
  return (
    <div className="Chat">
      <span>{username}:</span> <span>{msg}</span>
    </div>
  );
}

export default Chat;
