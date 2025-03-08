import { Image } from "react-bootstrap";
import "../css_pages/chats.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Chats() {
  const { user } = useContext(AuthContext);
const queryParameters = new URLSearchParams(window.location.search);
    const idQuery = queryParameters.get("id");

  const [file, setFile] = useState<[] | string>("");

  const getProfileById = async () => {
    fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setFile(result.userById))

      .catch((error) => console.error(error));
  };

  console.log(file);
  useEffect(() => {
    getProfileById();
  }, []);



  console.log('user :>> ', user);
  return (
    <>
      <div className="chatsDiv">
        <h2>Chats</h2>
      </div>
      <div className="chatsPartnerDiv">
        <Image className="chatParterImage" 
          src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1740855723/ai-generated-7833751_1280_gtxaug.jpg"
          alt=""
        />
        <div className="chatsPartnerTextBody">
            <h6>Tashi</h6>
            <p>here is my last message</p>
            <p>23.03.2021</p>
        </div>
      </div>
    </>
  );
}

export default Chats;
