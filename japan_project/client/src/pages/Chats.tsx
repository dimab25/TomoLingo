import "../css_pages/chats.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Chats() {
  const { user } = useContext(AuthContext);
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");

  // const [file, setFile] = useState<[] | string>("");
  // const [partner, setPartner] = useState(null);
  const [chats, setChats] = useState(null)

  const getChats = async () => {
try {
      const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    const response= await  fetch(`http://localhost:4000/api/messages/users/messages/chats/${user?._id}`, requestOptions);
    const result= await response.json();
    setChats(result.chatByUser)
} catch (error) {
  console.error(error)
}
  }
   
   


  // const getProfileById = async () => {
  //   fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
  //     .then((response) => response.json())
  //     .then((result) => setFile(result.userById))

  //     .catch((error) => console.error(error));
  // };
console.log('chats :>> ', chats);
  // console.log(file);
  useEffect(() => {
    getChats();
    // getProfileById();
  }, [user?._id]);


  return (
    <>
      <div className="chatsDiv">
        <h2>Chats</h2>
      </div>
      {/* {chats && chats.map((chat)=>(
        
        <p>{chat.users.includes}</p>
      ))} */}
      
      <div>
    {chats && user && chats.map(chat => {
      const otherUser = chat.users.find(person => person._id !== user?._id);
      const lastMessage = chat.messages[chat.messages.length - 1]; 
      return (
        <div >
          <p>Other User ID: {otherUser.name}</p>
          <img style={{width:"100px"}} src={otherUser.imageUrl} alt="" />
          <p>Last Message: {lastMessage.message}</p>
          {lastMessage.from_id!==user?._id ? <p>Your turn</p>: null}
         
        </div>
        
      );
    })}
  </div>
      

      {/* <div className="chatsPartnerDiv">
        <Image
          className="chatParterImage"
          src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1740855723/ai-generated-7833751_1280_gtxaug.jpg"
          alt=""
        />
        <div className="chatsPartnerTextBody">
          <h6>Tashi</h6>
          <p>here is my last message</p>
          <p>23.03.2021</p>
        </div>
      </div> */}
    </>
  );
}

export default Chats;
