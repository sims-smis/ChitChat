import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => {
    return io("http://localhost:3000");
  }, []);
  // const socket = io("http://localhost:3000");

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  // console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join_room", roomName);
    setRoomName("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
      setSocketId(socket.id);
    });
    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("recieved_message", (data) => {
      setMessages((messages) => [...messages, data]);
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <h1>Welcome to socket.io</h1>
      Your Room: {socketId}
      <div style={{ backgroundColor: "green", width: "100px" }}>Join Room</div>
      <form onSubmit={joinRoomHandler} >
        <input className="m-3"
          value={roomName}
          placeholder="Enter room name"
          onChange={(e) => setRoomName(e.target.value)}
          type="text"
        />
        <button type="submit">Join</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
          type="text"
        />
        <input
          value={room}
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
          type="text"
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </ul>
    </>
  );
}

export default App;
