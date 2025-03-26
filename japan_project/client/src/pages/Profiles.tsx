// import useFetchHook from "../hooks/useFetchHook";
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { JP } from "country-flag-icons/react/3x2";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";
// import { IoPersonAddOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/customTypes";
import "../css_pages/profiles.css";


function Profiles() {


  const { user } = useContext(AuthContext);


  const [file, setFile] = useState<User [] | null>(null);

  const fetchAllMovies = async () => {
    fetch("http://localhost:4000/api/users/all")
      .then((response) => response.json())
      .then((result) => setFile(result.allUsers))

      .catch((error) => console.error(error));
  };

  // console.log(file);
  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <>
      <div className="pageLayout">
    
        <Row xs={1} md={2} className="g-4 gritDivProfile">
          {file &&
            file?.map(
              (item: User) =>
                item._id !== user?._id && (
                  <>
                    <div style={{ width: "14rem" }} className="profilesDivFull">
                      <div className="profilesDiv">
                   
                        <div className="profilesDivRight">
                          <h6>{item.name}</h6>

                          <div className="flagContainer">
                          <div>
                            {item.native_language == "German" && (
                              <DE className="flags" />
                            )}
                            {item.native_language == "Japanese" && (
                              <JP className="flags" />
                            )}
                            {item.native_language == "English" && (
                              <GB className="flags" />
                            )} &nbsp;Native
                          </div>
                          <div>
                            
                            {item.target_language == "German" && (
                              <DE className="flags" />
                            )}
                            {item.target_language == "Japanese" && (
                              <JP className="flags" />
                            )}
                            {item.target_language == "English" && (
                              <GB className="flags" />
                            )} &nbsp;Target
                          </div>
                          </div>
                          
                          <div className="levelIcons">Level&nbsp;
                            {item.target_language_level == "beginner" && (
                              <>
                                <FaCircle />
                                <FaRegCircle />
                                <FaRegCircle />
                              </>
                            )}
                            {item.target_language_level == "intermediate" && (
                              <>
                                <FaCircle />
                                <FaCircle />
                                <FaRegCircle />
                              </>
                            )}
                            {item.target_language_level == "advanced" && (
                              <>
                                <FaCircle />
                                <FaCircle />
                                <FaCircle />
                              </>
                            )}
                          </div>
                          <div className="linkIcons">
                          <Link to={`/profile/?id=${item._id}`}>
                          <div>
                              <BsFillPersonLinesFill />
                            </div>
                          </Link>
                          <Link to={`/chat/?id=${item._id}`}>
                            <div>
                              <FaMessage />
                              </div>
                          </Link>
                        </div>
                        
                        </div>
                        <div className="profilesImgDiv">
                        <Link to={`/profile/?id=${item._id}`}><Image
                          fluid
                            style={{
                              width: "6rem",
                              borderRadius: "25px",
                              maxHeight: "12rem",
                            }}
                            src={item.imageUrl}
                          /></Link>
                        </div>
                      </div>{" "}
                      <div className="profilesDivAbout">
                      
                        <div>{item.about.length > 70
                          ? item.about.slice(0, 70) + "..."
                          : item.about}</div>
                      </div>
                    </div>
                  </>
                )
            )}
        </Row>
      </div>
    </>
  );
}

export default Profiles;
