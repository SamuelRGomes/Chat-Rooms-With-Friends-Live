import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import io from "socket.io-client";
import Home from "./pages/home";
import Chat from "./pages/chat";

function App() {
  const socket = io.connect("http://localhost:4000");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} />}></Route>
          <Route path="/chat" element={<Chat username={username} room={room} socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
