import { FormEvent, useContext, useEffect, useState } from "react";
import socket from "../config/socket";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

type Message = {
  msg: string;
  author: string;
  name: string;
  image: string;
  postingDate: number;
};

function ChatMessage({ msg, author, name, image, postingDate }: Message) {
  return (
    <>
      <Card border="primary" style={{ maxWidth: "58rem", margin: "10px" }}>
        <Card.Header>
          {" "}
          <div className="chatroomAuthorAndDate">
            <Link to={`/profile/?id=${author}`}>
              <div className="chatroomImageNameDiv">
                {" "}
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "25px",
                  }}
                  src={image}
                />{" "}
                <div>{name}</div>
              </div>
            </Link>

            <div>
              {new Date(postingDate).toLocaleString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "2-digit",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          </div>
        </Card.Header>

        <div className="chatTextDiv">{msg}</div>
      </Card>
    </>
  );
}

function Chatroom() {
    const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatbutton, setChatbutton] = useState(false);


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

  // const getMessages = (
  //   message: string,
  //   postingDate: number,
  //   author: string,
  //   name: string,
  //   image: string,
  //   serverOffset: string
  // ) => {
  //   console.log("message received", message);
  //   setMessages((prev) => {
  //     return [
  //       ...prev,
  //       {
  //         msg: message,
  //         author: author,
  //         name: name,
  //         image: image,
  //         postingDate: postingDate || Date.now(),
  //       },
  //     ];
  //   });
  //   setChatbutton(true);
  //   (socket.auth as { [key: string]: any }).serverOffset = serverOffset;
  // };

  const getMessages = (
    message: string,
    postingDate: number,
    author: string,
    name: string,
    image: string
  ) => {
    console.log("message received", message);
  
    setMessages((prev) => [
      ...prev,
      { msg: message, author, name, image, postingDate }
    ]);
  
    // 🆕 Update serverOffset to the latest postingDate
    (socket.auth as any).serverOffset = postingDate;
  };
  

  const handleEnterChatroom = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    socket.emit("request messages");
    setChatbutton(true);
  };

  // console.log("messages :>> ", messages);
  // useEffect(() => {
  //   // receiving
  //   socket.on("chat message", getMessages);
  //   socket.on("load messages", (loadedMessages: any[]) => {
  //     const formattedMessages = loadedMessages.map((msg) => ({
  //       msg: msg.text,
  //       author: msg.author,
  //       name: msg.name,
  //       image: msg.image,
  //       postingDate: msg.postingDate,
  //     }));

  //     setMessages(formattedMessages);
  //   });
  //   return () => {
  //     socket.off("chat message", getMessages);
  //     socket.off("load messages");
  //   };
  // }, []);

  useEffect(() => {
    socket.on("chat message", getMessages);
    socket.on("load messages", handleLoadMessages);
  
    function handleLoadMessages(loadedMessages: any[]) {
      const formattedMessages = loadedMessages.map((msg) => ({
        msg: msg.text,
        author: msg.author,
        name: msg.name,
        image: msg.image,
        postingDate: msg.postingDate,
      }));
      setMessages(formattedMessages);
    }
  
    return () => {
      socket.off("chat message", getMessages);
      socket.off("load messages", handleLoadMessages);
    };
  }, []);
  
  return (
    <>
      <div className="pageLayout">
        <section className="chatroomSection">
          <h6>Chat & Connect: Type, Learn, Repeat!</h6>
          <div>
            Welcome to the TomoLingo Chatroom, where language learners connect!
            Whether you're practicing Japanese or improving your German, this is
            the perfect place to text, exchange ideas, and learn together.
          </div>
         
          <div>
            {messages &&
              messages.map((msg, index) => {
                return (
                  <ChatMessage
                    msg={msg.msg}
                    author={msg.author}
                    name={msg.name}
                    image={msg.image}
                    postingDate={msg.postingDate}
                    key={index}
                  />
                );
              })}
          </div>
          {!chatbutton && (
            <Button style={{margin:"10px"}} onClick={handleEnterChatroom}>Enter Chat</Button>
          )}

          {chatbutton && user ?(
            <>
              {" "}
              <Form  id="form" onSubmit={sendMessage}>
                <FloatingLabel
                  style={{ maxWidth: "59rem" }}
                  controlId="floatingInput"
                  label="Message"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    name="message"
                    id="message-input"
                    autoCapitalize="on"
                    autoComplete="off"
                    autoCorrect="on"
                  />
                </FloatingLabel>
                <div ><Button variant="outline-primary" type="submit">
                  Send Message
                </Button></div>
              </Form>
            </>
          ):<h6 style={{textAlign:"center"}}>You have to be logged in, to write a message.</h6>}
        </section>
      </div>
    </>
  );
}
export default Chatroom;


