import React, { useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import "./app.css";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    const userMessage = {
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setChat([...chat, userMessage]);

    setMessage("");
    setIsTyping(true);

    const res = await axios.post("http://localhost:5000/chat", {
      message: message,
    });

    const botMessage = {
      text: res.data[0].generated_text,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    };
    setTimeout(() => {
      setChat((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="chat-container">
      <div className="chat-card">
        <div className="chat-header">AI Chatbot</div>

        <ScrollPanel className="chat-scroll">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
                  alt="Bot"
                  className="avatar"
                />
              )}
              <div
                className={`bubble ${
                  msg.sender === "user" ? "user-bubble" : "bot-bubble"
                }`}
              >
                {msg.text}
                <div className="timestamp">{msg.timestamp}</div>
              </div>
              {msg.sender === "user" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                  alt="User"
                  className="avatar"
                />
              )}
            </div>
          ))}
          {isTyping && <div className="typing">Bot is typing...</div>}
        </ScrollPanel>

        <div className="input-container">
          <InputText
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ width: "85%" }}
          />
          &nbsp;&nbsp;
          <Button
            icon="pi pi-send"
            onClick={sendMessage}
            className="p-button-rounded p-button-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
