import { useState } from "react";
import { User } from "../types/customTypes";


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
      if (response.ok) {
        const result = await response.json();
        setUser(result);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

console.log('user :>> ', user);


  return (
    <>
      <div>MyProfile</div>
      <button onClick={getMyProfile}>Get Profile</button>
      {/* {user && <div>{user.age}</div> } */}
     
    </>
  );
}

export default MyProfile;
