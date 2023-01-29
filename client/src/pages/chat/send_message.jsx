import { useState } from "react";
import styles from "./styles.module.css";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    if (message !== "") {
      username = localStorage.getItem("username");
      room = localStorage.getItem("room");
      const created_time = Date.now();
      socket.emit("send_message", { username, room, message, created_time });
      setMessage("");
    }
  };
  return (
    <div className={styles.sendMessageContainer}>
      <input className={styles.messageInput} placeholder="Message..." onChange={(e) => setMessage(e.target.value)} value={message} />
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};
export default SendMessage;
