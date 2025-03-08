import { Button, FloatingLabel, Form, Image, Stack } from "react-bootstrap";
import "../css_pages/chat.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/customTypes";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router";

function Chat() {
  const { user } = useContext(AuthContext);

  console.log("user :>> ", user);
  const [file, setFile] = useState<[] | string>("");
  const [targetProfile, setTargetProfile] = useState<User | null>(null);

  const fetchTwoMessages = async () => {
    fetch(
      "http://localhost:4000/api/messages/all/messages/dimson?from_name=sayuri"
    )
      .then((response) => response.json())
      .then((result) => setFile(result.userById))

      .catch((error) => console.error(error));
  };

  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");

  const getProfileById = async () => {
    fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setTargetProfile(result.userById[0]))

      .catch((error) => console.error(error));
  };

  console.log("targetProfile :>> ", targetProfile);
  console.log(file);

  useEffect(() => {
    fetchTwoMessages();
    getProfileById();
  }, []);

  return (
    <div className="chatDiv">
      <div className="targetProfileDiv">
        <Image
          src={targetProfile?.imageUrl}
          style={{ width: "100px", borderRadius: "20px" }}
          alt=""
        />
        <h2>{targetProfile?.name} </h2>
        <Link to={`/profile/?id=${targetProfile?._id}`}>
                      <Button variant="outline-primary">
                      <BsFillPersonLinesFill />
                      </Button>
                    </Link>
                    <Link to={`/chats`}>
                      <Button variant="outline-primary">
                        Back to chats
                      </Button>
                    </Link>
      </div>

      <div> Userid {user?.id}</div>

      
      <Stack gap={3} className="align-items-center">
        {file &&
          file?.map((item, index) => (
            <div className="messageContainer" key={index}>
              <p>From: {item.from_name}</p>
              <p>To: {item.to_name}</p>
              <p>{item.message}</p>
            </div>
          ))}

        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Message"
            className="mb-3"
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
