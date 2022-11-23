import "./ChatForm.css";
/**
 * ChatForm
 *
 * Props:     handleChatInputChange - function to change input value
 *            handleChatInputSubmit - function to handle form submission
 *            chatInput - string
 *
 * State:
 *
 * ChatBox -> ChatForm
 */
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
