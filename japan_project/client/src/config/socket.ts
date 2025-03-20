
import { io } from "socket.io-client";


const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

  


const getUserId= () =>{
    const activeUser= localStorage.getItem("userId");
    if(activeUser) return activeUser;
    if (!activeUser){
        // generating a random userName, my user generates a new session

        // const randomUserName = `user${new Date().getSeconds()}`;
        const user_id = "67cffb39e6571e713867c437"
        localStorage.setItem("userId", user_id);
        return user_id
    }
}

const getUserName= () =>{
  const activeUser= localStorage.getItem("userName");
  if(activeUser) return activeUser;
  if (!activeUser){
      // generating a random userName, my user generates a new session


      // const randomUserName = `user${new Date().getSeconds()}`;
      const userName = "xiali"
      localStorage.setItem("userName", userName);
      return userName
  }
}
 
const getUserImage= () =>{
  const activeUser= localStorage.getItem("userImage");
  if(activeUser) return activeUser;
  if (!activeUser){
      // generating a random userName, my user generates a new session


      // const randomUserName = `user${new Date().getSeconds()}`;
      const userImage = "https://res.cloudinary.com/dggcfjjc3/image/upload/v1741791516/userImages/zloq68ihhlflxjpys0om.jpg"
      localStorage.setItem("userImage", userImage);
      return userImage
  }
}


const socket = io(URL, { auth: { token: "private token", serverOffset:0, author: getUserId(), name: getUserName(), image: getUserImage() } });

export default socket;

// , user: user?._id  
// const { user } = useContext(AuthContext);