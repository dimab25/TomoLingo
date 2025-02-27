import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import DisplayPage from "./pages/displayPage";
import Home from "./pages/Home";
import Media from "./pages/media";
import NavBar from "./modules/NavBar";

const Root = () => {
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
      <Route path="/display" element={<DisplayPage />} />
      
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
