import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import DisplayPage from "./pages/Profiles";
import Home from "./pages/Home";
import Media from "./pages/Media";
import NavBar from "./modules/NavBar";
import Register from "./pages/Register";
import ProfileDetails from "./pages/ProfileDetails";
import Profiles from "./pages/Profiles";
import SeriesDetails from "./pages/SeriesDetails";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import MyProfile from "./pages/MyProfile";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import useUserStatus from "./hooks/useUserStatus";

const Root = () => {
     const { user } = useContext(AuthContext);
const {token, userStatusMessage}= useUserStatus()

  useEffect(() => {
    // const token = localStorage.getItem("token");
    if (token){
   
      console.log('userStatusMessage :>> ', userStatusMessage);
  
    } else {console.log("user logged out");}
  }, [token])
  
  return (
    <>
      <NavBar />
      <Outlet />
      
    </>
  );
};

function App() {
  return (
    <>
    <AuthContextProvider>
     <BrowserRouter>
      <Routes>
      <Route path="/" />
      <Route element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/media" element={<Media />} />
      <Route path="/seriesDetails" element={<SeriesDetails />} />
      <Route path="/moviesDetails" element={<MovieDetails />} />
      <Route path="/display" element={<DisplayPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/profile" element={<ProfileDetails />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chats" element={<Chats />} />


     
        </Route>
        </Routes>
      </BrowserRouter>

    </AuthContextProvider>
 
    </>
  );
}

export default App;
