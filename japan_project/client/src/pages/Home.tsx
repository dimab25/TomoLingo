
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Image } from "react-bootstrap";
import TestChat from "./TestChat";




function Home() {
  const { user } = useContext(AuthContext);
console.log('user :>> ', user);

  return (
    <>
  <TestChat/>
<Image src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1741459565/kanjiImage_iejxbc.webp" alt="kanji study block"/>
      

    </>
  );
}

export default Home;
