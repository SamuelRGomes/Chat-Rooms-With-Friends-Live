import styles from "./styles.module.css";
import MessagesReceived from "./messages";
import SendMessage from "./send_message";
import RoomAndUsers from "./room-and-user";

const Chat = ({ username, room, socket }) => {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage username={username} room={room} socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
