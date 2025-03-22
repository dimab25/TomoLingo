import "../css_pages/chats.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Image } from "react-bootstrap";
import { ChatByUser } from "../types/customTypes";
import { Link } from "react-router";
import { getFormattedDateAndTime } from "../utilities/changeDate";

function Chats() {
  const { user } = useContext(AuthContext);
  // const queryParameters = new URLSearchParams(window.location.search);
  // const idQuery = queryParameters.get("id");

  // const [file, setFile] = useState<[] | string>("");
  // const [partner, setPartner] = useState(null);
  const [chats, setChats] = useState<ChatByUser[] | null>(null);

  const getChats = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(
        `http://localhost:4000/api/messages/users/messages/chats/${user?._id}`,
        requestOptions
      );
      const result = await response.json();
      setChats(result.chatByUser);
    } catch (error) {
      console.error(error);
    }
  };

  // const getProfileById = async () => {
  //   fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
  //     .then((response) => response.json())
  //     .then((result) => setFile(result.userById))

  //     .catch((error) => console.error(error));
  // };
  console.log("chats :>> ", chats);
  // console.log(file);
  useEffect(() => {
    getChats();
    // getProfileById();
  }, [user?._id]);

  return (
    <>
      <div className="pageLayout">
        <h2>Chats</h2>
    
      {/* {chats && chats.map((chat)=>(
        
        <p>{chat.users.includes}</p>
      ))} */}

      <div className="chatsDiv">
        {chats &&
          user &&
          chats.map((chat) => {
            const otherUser = chat.users.find(
              (person) => person._id !== user?._id
            );
            const lastMessage = chat.messages[chat.messages.length - 1];
            return (
              <Link to={`/chat/?id=${otherUser?._id}`} style={{textDecoration:"none"}}>
              <div className="chatsPartnerDiv">
                <Image
                  className="chatParterImage"
                  src={otherUser?.imageUrl}
                  alt=""
                />

                <div className="chatsPartnerTextBody">
                  <h5> {otherUser?.name}</h5>
                  <div>{lastMessage.message}</div>
                  <div>{getFormattedDateAndTime(lastMessage.created_at)}</div>
             
                </div>     {lastMessage.from_id !== user?._id ? <div className="yourTurnDiv">Your Turn</div> : null}


              </div></Link>
            );
          })}
      </div>
      </div>

    </>
  );
}

export default Chats;
