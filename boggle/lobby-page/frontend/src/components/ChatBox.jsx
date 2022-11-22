import { useState } from "react";
import Chat from "./Chat";
import ChatForm from "./ChatForm";

/**
 * ChatBox
 *
 * Props:   chats - list of chats
 *          sendChatMessage - function to send chat
 *
 * State:   chatInput - string
 *
 * Lobby -> ChatBox -> Chat, ChatForm
 */
function ChatBox({ chats, sendChatMessage }) {
  const [chatInput, setChatInput] = useState("");

  /**Handle the chat input change. */
  function handleChatInputChange(evt) {
    setChatInput(evt.target.value);
  }

  /**Handle the chat form submit. */
  function handleChatInputSubmit(evt) {
    evt.preventDefault();
    // TODO: socket stuff
    sendChatMessage(chatInput);
    setChatInput("");
  }

  return (
    <div className="ChatBox">
      <div className="ChatBox-Chats">
        {chats.map((chat, idx) => (
          <Chat {...chat} key={idx + chat.msg} />
        ))}
      </div>
      <ChatForm
        {...{
          handleChatInputChange,
          handleChatInputSubmit,
          chatInput,
        }}
      />
    </div>
  );
}

export default ChatBox;
