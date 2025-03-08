
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import SendMessage from "../components/SendMessage";



function Home() {
  const { user } = useContext(AuthContext);
console.log('user :>> ', user);

  return (
    <>

   <SendMessage/>
   

    </>
  );
}

export default Home;
