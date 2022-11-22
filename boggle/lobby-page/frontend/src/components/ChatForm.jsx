function ChatForm({ handleChatInputChange, handleChatInputSubmit, chatInput }) {
  return (
    <div className="ChatForm">
      <form onSubmit={handleChatInputSubmit}>
        <input value={chatInput} onChange={handleChatInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ChatForm;
