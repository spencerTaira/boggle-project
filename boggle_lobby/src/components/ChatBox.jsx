/**
 * ChatBox
 *
 * State:
 *
 * Props:   chats - list of chats, {msg: string, username: string, id: string}
 *          handleSubmit - function
 *          handleChange - function
 *          inputValue - string
 *
 * ActualLobby -> ChatBox
 */
function ChatBox({ chats, handleSubmit, handleChange, inputValue }) {
  return (
    <div className="ChatBox">
      {chats.map((chat) => (
        <div key={chat.id}>
          <span>{chat.username}</span>: <span>{chat.msg}</span>
        </div>
      ))}
      <form className="ChatBox-input" onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default ChatBox;
