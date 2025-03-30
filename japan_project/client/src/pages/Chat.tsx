import { Button, FloatingLabel, Form, Image, Stack } from "react-bootstrap";
import "../css_pages/chat.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatByUser, User } from "../types/customTypes";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router";
import { getFormattedDateAndTime } from "../utilities/changeDate";

function Chat() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  console.log("user :>> ", user);
  const [file, setFile] = useState<ChatByUser | null>(null);
  const [targetProfile, setTargetProfile] = useState<User | null>(null);

  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");

  const fetchMessages = async () => {
    try {
      if (!user || !user._id || !idQuery) return;
      console.log("user_.id :>> ", user?._id);

      const requestOptions : RequestInit  = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:4000/api/messages/users/messages/${user._id}?user2=${idQuery}`,
        requestOptions
      );
      const result = await response.json();
      setFile(result.chatByUser);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfileById = async () => {
    fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setTargetProfile(result.userById[0]))
      .catch((error) => console.error(error));
  };
  console.log("file fetchmessages :>> ", file);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setMessage(e.target.value);
  };

  const handlePostMessage = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (user) {
        urlencoded.append("user1", user?._id);
        urlencoded.append("from_id", user?._id);
        urlencoded.append("from_name", user?.name);
      }
      if (idQuery) {
        urlencoded.append("user2", idQuery);
        urlencoded.append("to_id", idQuery);
      }
      if (message) {
        urlencoded.append("message", message);
      }
      if (targetProfile) {
        urlencoded.append("to_name", targetProfile.name);
      }

      const requestOptions : RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        "http://localhost:4000/api/messages/users/messages/post",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
    } catch (error) {
      console.error(error);
    }
    fetchMessages();
  };

  useEffect(() => {
    getProfileById();
    fetchMessages();
  }, [user?._id]);

  return (
    <div className="chatDiv">
      <div className="targetProfileDiv">
        <Image
          src={targetProfile?.imageUrl}
          style={{ width: "60px", borderRadius: "20px" }}
          alt=""
        />
        <h6>{targetProfile?.name} </h6>
        <Link to={`/profile/?id=${targetProfile?._id}`}>
          <Button variant="outline-primary">
            <BsFillPersonLinesFill />
          </Button>
        </Link>
        <Link to={`/chats`}>
          <Button variant="outline-primary">Back</Button>
        </Link>
      </div>

    
      <Stack gap={3} className="messageFullDiv">
        {file &&
          file?.messages.map((item, index) => (
            <div
              className={
                user && user._id === item.from_id
                  ? "userMessageDiv"
                  : "messageContainer"
              }
              key={index}
            >
              <div className="chatAuthorAndDate">
                <div>{item.from_name}</div>
                <div> {getFormattedDateAndTime(item.created_at)}</div>
              </div>
              <div className="chatTextContainer">{item.message}</div>
            </div>
          ))}

        <Form className="sendMessageForm" onSubmit={handlePostMessage}>
          <FloatingLabel
            controlId="floatingInput"
            label="Message"
            className="mb-3"
            onChange={handleInputChange}
          >
            <Form.Control placeholder="message" as="textarea" />
          </FloatingLabel>

          <Button variant="outline-primary" type="submit">
            Send Message
          </Button>
        </Form>
      </Stack>
    </div>
  );
}

export default Chat;
