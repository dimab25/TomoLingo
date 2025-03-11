import { Image } from "react-bootstrap";
import "../css_pages/chats.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Chats() {
  const { user } = useContext(AuthContext);
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");

  const [file, setFile] = useState<[] | string>("");
  const [partner, setPartner] = useState(null)

  const getMessagePartner = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/api/messages/all/messages/partner/67b87fb413b9a3d7e2a9c135",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setPartner(result))
      .catch((error) => console.error(error));
  };

 
// console.log(' filteredPartnerArray:>> ',filteredPartnerArray );


// console.log('object :>> ', object);
  // console.log('partner :>> ', partner); 
  // const filteredPartnerArray = partner?.map((item)=>{
  //   if (item.to_id.includes("67b87fb413b9a3d7e2a9c135"))return item.from_id}
  // )


  const getProfileById = async () => {
    fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setFile(result.userById))

      .catch((error) => console.error(error));
  };

  console.log(file);
  useEffect(() => {
    getMessagePartner();
    getProfileById();
  }, []);

  console.log("user :>> ", user);
  return (
    <>
      <div className="chatsDiv">
        <h2>Chats</h2>
      </div>
      <div className="chatsPartnerDiv">
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
      </div>
    </>
  );
}

export default Chats;
