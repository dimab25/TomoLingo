import { useEffect, useState } from "react"

function useUserStatus (){
const [token, setToken] = useState <string|null>("")

const [userStatusMessage, setUserStatusMessage] = useState("")


const getToken = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      setToken(token),
      setUserStatusMessage ("User is logged in")
    } else {
     console.log("user not logged in");
     setToken(null);
     setUserStatusMessage("User not logged in")
    }
  };
useEffect(() => {
getToken()
}, [])

    return (
        {token, userStatusMessage}
    )
}
export default useUserStatus