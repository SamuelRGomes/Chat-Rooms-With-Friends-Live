import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const room = localStorage.getItem("room");
    socket.emit("join_room", { username, room });
  }, []);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => {
        if (state.length > 1) {
          return [
            ...state,
            {
              message: data.message,
              username: data.username,
              created_time: data.created_time,
            },
          ];
        } else {
          return [
            {
              message: data.message,
              username: data.username,
              created_time: data.created_time,
            },
          ];
        }
      });
    });

    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    socket.on("last_100_messages", (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, [...state].pop()]);
    });

    return () => socket.off("last_100_messages");
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  function sortMessagesByDate(messages) {
    return messages.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__));
  }

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.username}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{formatDateFromTimestamp(msg.created_time)}</span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
