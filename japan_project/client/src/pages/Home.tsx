
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import SendMessage from "../components/SendMessage";
import { Image } from "react-bootstrap";



function Home() {
  const { user } = useContext(AuthContext);
console.log('user :>> ', user);

  return (
    <>
<Image src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1741459565/kanjiImage_iejxbc.webp" alt="kanji study block"/>
   <SendMessage/>
   

    </>
  );
}

export default Home;
