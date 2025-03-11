import { Button, FloatingLabel, Form, Image, Stack } from "react-bootstrap";
import "../css_pages/chat.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/customTypes";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router";

function Chat() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(null)



  console.log("user :>> ", user);
  const [file, setFile] = useState<[] | string>("");
  const [targetProfile, setTargetProfile] = useState<User | null>(null);

  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");

  const getProfileById = async () => {
    fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setTargetProfile(result.userById[0]))
      .catch((error) => console.error(error));
  };

  const fetchTwoMessages = async () => {
    if (user) {
      fetch(
        `http://localhost:4000/api/messages/all/messages/between_two/${user.id}?from_id=${idQuery}`
      )
        .then((response) => response.json())
        .then((result) => setFile(result.userById))
        .catch((error) => console.error(error));
    }
  };

  console.log("targetProfile :>> ", targetProfile);
  console.log(file);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    console.log("e.target.value :>> ", e.target.value);
    setMessage(e.target.value)
}

const handlePostMessage = (e) => {
  e.preventDefault();
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("to_id",idQuery);
if (user)
{urlencoded.append("from_id", user.id);}
if (message)
{urlencoded.append("message", message)};
if (user)
{urlencoded.append("from_name", user.name);}
if(targetProfile)
{urlencoded.append("to_name", targetProfile.name)};

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow",
};

fetch("http://localhost:4000/api/messages/all/message", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
};

console.log('message :>> ', message);

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
          <Button variant="outline-primary">Back to chats</Button>
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

        <Form  onSubmit={handlePostMessage}>
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
