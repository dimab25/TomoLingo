import "../css_pages/chats.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Image } from "react-bootstrap";
import { ChatByUser } from "../types/customTypes";
import { Link } from "react-router";
import { getFormattedDateAndTime } from "../utilities/changeDate";

function Chats() {
  const { user } = useContext(AuthContext);

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

  console.log("chats :>> ", chats);
  // console.log(file);
  useEffect(() => {
    getChats();
    // getProfileById();
  }, [user?._id]);

  return (
    <>
      <div className="pageLayout">
        <h2>Messages</h2>

        <div className="chatsDiv">
          {chats &&
            user &&
            chats.map((chat) => {
              const otherUser = chat.users.find(
                (person) => person._id !== user?._id
              );
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <Link
                  to={`/chat/?id=${otherUser?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="chatsPartnerDiv">
                    <Image
                      className="chatParterImage"
                      src={otherUser?.imageUrl}
                      alt="profile Image"
                    />

                    <div className="chatsPartnerTextBody">
                      <h6> {otherUser?.name} </h6>
                      <div className="messagesTextDiv">
                        {lastMessage.message.length > 20
                          ? lastMessage.message.slice(0, 20) + "..."
                          : lastMessage.message}{" "}
                        {lastMessage.from_id !== user?._id ? (
                          <div
                            style={{ width: "60px", fontSize: "10px" }}
                            className="yourTurnDiv"
                          >
                            Your Turn
                          </div>
                        ) : null}
                      </div>
                      <div>
                        {getFormattedDateAndTime(lastMessage.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Chats;
