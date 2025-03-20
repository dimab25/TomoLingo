import { FormEvent, useEffect, useState } from "react";
import socket from "../config/socket";

type Message = {
  msg: string;
  author: string;
  name: string;
  image: string;
};

function TestChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = document.querySelector("form");
    const formData = new FormData(form!);
    const message = formData.get("message");
    console.log("message :>> ", message);
    // sending
    socket.timeout(1000).emit("chat message", message, () => {
      console.log("message sent :>> ");
      console.log("socket.auth :>> ", socket.auth);
    });
  };

  const getMessages = (
    message: string,
    serverOffset: string,
    author: String,
    name: String,
    image: String
  ) => {
    console.log("message received", message);
    setMessages((prev) => {
      return [
        ...prev,
        { msg: message, author: author, name: name, image: image },
      ];
    });
    socket.auth.serverOffset = serverOffset;
  };

  console.log("messages :>> ", messages);
  useEffect(() => {
    // receiving
    socket.on("chat message", getMessages);
    return () => {
      socket.off("chat message", getMessages);
    };
  }, []);

  return (
    <>
      {/* <button onClick={sendMessage}></button> */}
      <section style={{ padding: "300px" }}>
        <ul>
          {messages &&
            messages.map((msg, index) => {
              return (
                <ChatMessage
                  msg={msg.msg}
                  author={msg.author}
                  name={msg.name}
                  image={msg.image}
                  key={index}
                />
              );
            })}
        </ul>
        <form id="form" onSubmit={sendMessage}>
          <input
            type="text"
            name="message"
            id="message-input"
            autoCapitalize="on"
            autoComplete="off"
            autoCorrect="on"
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </>
  );
}
export default TestChat;

function ChatMessage({ msg, author, name, image }: Message) {
  return (
    <>
      <img style={{ width: "100px", borderRadius: "25px" }} src={image} />
      <li>
        {name} -- {msg}--
      </li>
    </>
  );
}
