import { useState } from "react";
import { User } from "../types/customTypes";
import { Image } from "react-bootstrap";


function MyProfile() {
  const [user, setUser] = useState<User | null>(null);

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


console.log('user :>> ', user);
console.log('user.imgUrl :>> ', user?.imageUrl);
  return (
    <div>
    <h1>User Profile</h1>

    <button onClick={getMyProfile}>Get Profile</button>
    {user && (
      <div>
        <h3>Hi user {user.name}</h3>
        <Image
          src={user.imageUrl}
                   alt="user profile pic"
          style={{ width: "150px", height: "auto" }}
        />
      </div>
    )}
  </div>
   
  );
}

export default MyProfile;
