import { useState } from "react";
import Chat from "./Chat";
import ChatForm from "./ChatForm";

function ChatBox({ chats }) {
  const [chatInput, setChatInput] = useState("");

  function handleChatInputChange(evt) {
    setChatInput(evt.target.value);
  }

  function handleChatInputSubmit(evt) {
    evt.preventDefault();
    // TODO: socket stuff
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
        {...{ handleChatInputChange, handleChatInputSubmit, chatInput }}
      />
    </div>
  );
}

export default ChatBox;
