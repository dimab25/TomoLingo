import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import useUserStatus from "../hooks/useUserStatus";
import getToken from "../utilities/getToken";

//3. Define providers props type
type AuthContextProviderProps = {
  children: ReactNode;
};

//5. Define the type for the context
type AuthContextType = {
  user: User | null;
  register: (
    email: string,
    password: string,
    name: string,
    age: number,
    imageUrl: string,
    about: string,
    native_language: string,
    target_language_level: string,
    target_language: string,
    location: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  errorMessage?: string|null;
  handleSetErrorMessage: (err :string)=> void;
  handleSetSubmitRegisterMessage: (err :string)=> void;
};

//6. Create variable with the initial value of all the elements we share in our context (at least the ones defined in the context's type)
const contextIntialValue: AuthContextType = {
  user: null,

  register: () => {
    throw new Error("context not initialised");
  },
  login: () => {
    throw new Error("context not initialised");
  },
  logout: () => {
    throw new Error("context not initialised");
  },
  handleSetErrorMessage: ()=> {
    throw new Error("context not initialised");
  },
  handleSetSubmitRegisterMessage: ()=> {
    throw new Error("context not initialised");
  }
};
//   1
export const AuthContext = createContext<AuthContextType>(contextIntialValue);

// 2
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // useStates
  const [user, setUser] = useState<User | null>(null);
  const [imageUploaded, setImageUploaded] = useState<string | null>(null);
const [errorMessage, setErrorMessage] = useState("string")
const [submitRegisterMessage, setSubmitRegisterMessage] = useState("");

  // const [loginCredentials, setLoginCredentials] = useState(null);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userName");
    setUser(null);
    console.log("user is logged out ");
  };

  const handleSetErrorMessage = (err: string) => setErrorMessage(err)
const handleSetSubmitRegisterMessage = (err: string) => setSubmitRegisterMessage(err)

  const login = async (email: string, password: string) => {
    console.log("param :>> ", email, password);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();

    // have still to add input validation and create type for register form user
    if (email) {
      urlencoded.append("email", email);
      urlencoded.append("password", password);
    } else {
      console.log("no empty forms allowed");
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/login",
        requestOptions
      );
      const result = await response.json();

      console.log("result :>> ", result);
      setErrorMessage(result.message)
      if (!result.token) {
        //do something about it
        console.log("user token does not exist");
      }
      if (result.token) {
        // storing the user token in the browser
        localStorage.setItem("token", result.token);
        //storing the user information in the browser
        localStorage.setItem("userId", result.user.id);
        localStorage.setItem("userName", result.user.name);
        localStorage.setItem("userImage", result.user.image);
      }
      setUser(result.user);
    
        console.log('localstoragetest :>> ', result.user);
    } catch (error) {
      console.log("error :>> ", error);
     

    }
  };


  const register = async (newUser: User) => {
    console.log("email :>> ", newUser);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();

    urlencoded.append("name", newUser?.name);
    urlencoded.append("email", newUser?.email);
    urlencoded.append("password", newUser?.password);
    urlencoded.append("age", newUser?.age);
    urlencoded.append("about", newUser?.about);
    urlencoded.append("native_language", newUser?.native_language);
    urlencoded.append("target_language_level", newUser?.target_language_level);
    urlencoded.append("target_language", newUser?.target_language);
    urlencoded.append("location", newUser?.location);
    if (imageUploaded) {
      urlencoded.append("imageUrl", imageUploaded);
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/register",
        requestOptions
      );
      const result = await response.json();
      
      setSubmitRegisterMessage(result.message)
       
      

      console.log("result :>> ", result.message);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

//  console.log('setRegisterCompleted :>> ', registerCompleted);

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, setImageUploaded, imageUploaded, login, logout, errorMessage, handleSetErrorMessage, handleSetSubmitRegisterMessage, submitRegisterMessage}}
    >
      {children}
    </AuthContext.Provider>
  );
};
