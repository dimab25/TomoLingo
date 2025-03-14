import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext";

function useUserStatus (){

  const {user, setUser }= useContext(AuthContext)
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

  const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token} `);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/myprofile",
        requestOptions
      );
      if (!response.ok) {
        console.log("Something went wrong");
      }
      if (response.ok)
      {  const result = await response.json();
        setUser(result);}
      
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  // console.log('user :>> ', user);
useEffect(() => {
getToken();
getMyProfile();
}, [user?.email])

    return (
        {token, userStatusMessage}
    )
}
export default useUserStatus