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
import { useEffect } from "react";
import MyProfile from "./pages/MyProfile";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";
import { AuthContextProvider } from "./context/AuthContext";
import useUserStatus from "./hooks/useUserStatus";
import ProtectedRoute from "./components/ProtectedRoute";

import Chatroom from "./pages/Chatroom";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";

const Root = () => {

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
      <Footer/>
    </>
  );
};

function App() {
  // console.log('socket :>> ', socket);
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
      <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
      <Route path="/chatroom" element={<Chatroom />} />
      <Route path="/*" element={<ErrorPage />} />
      
     
        </Route>
        </Routes>
      </BrowserRouter>

    </AuthContextProvider>
 
    </>
  );
}

export default App;
