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

const Root = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token){
      console.log("user logged in");
    } else {console.log("user logged out");}
  }, [])
  
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

     
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
