import { useEffect, useState } from "react";


function Messages() {

    const [file, setFile] = useState<[]|string>("");
    
      const fetchTwoMessages = async () => {
        fetch("http://localhost:4000/api/messages/all/messages/dimson?from_name=sayuri")
          .then((response) => response.json())
          .then((result) => setFile(result.userById))
    
          .catch((error) => console.error(error));
      };
    
      console.log(file);
      useEffect(() => {
        fetchTwoMessages();
      }, []);
  return (
    <>
    <div>twomessages</div>
      {file && file?.map((item) => (
        <div>
            <p>From: {item.from_name}</p>
            <p>To: {item.to_name}</p>
        <p>{item.message}</p>
        </div>
      ))}
   
    </>
  )
}

export default Messages