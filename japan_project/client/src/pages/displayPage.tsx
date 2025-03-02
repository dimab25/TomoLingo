// import useFetchHook from "../hooks/useFetchHook";
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { JP } from "country-flag-icons/react/3x2";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { Link } from "react-router";

function DisplayPage() {
  // const { data } =useFetchHook(
  //     "http://localhost:4000/api/movies/all"
  //   );
  // console.log('data :>> ', data);

  const [file, setFile] = useState<[] | string>("");

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
      <Row xs={1} md={2} className="g-4 gritDivProfile">
        {file &&
          file?.map((item) => (
            <>
              <div style={{ width: "18rem" }} className="profilesDivFull">
                <div className="profilesDiv">
                  <div className="profilesImgDiv">
                    <img
                      style={{
                        width: "8rem",
                        borderRadius: "50px",
                        maxHeight: "250px",
                      }}
                      src={item.imageUrl}
                    />
                  </div>
                  <div className="profilesDivRight">
                    <h6>{item.name}</h6>

                    <div>
                      Native:{" "}
                      {item.native_language == "German" && (
                        <DE className="flags" />
                      )}
                      {item.native_language == "Japanese" && (
                        <JP className="flags" />
                      )}
                      {item.native_language == "English" && (
                        <GB className="flags" />
                      )}
                    </div>
                    <div>
                      Learning:{" "}
                      {item.target_language == "German" && (
                        <DE className="flags" />
                      )}
                      {item.target_language == "Japanese" && (
                        <JP className="flags" />
                      )}
                      {item.target_language == "English" && (
                        <GB className="flags" />
                      )}
                    </div>

                    <div>Level</div>
                    <div className="levelIcons">
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
                    <Link to={`/profile/?id=${item._id}`}>
                      <Button variant="outline-primary">
                        <FaEye />
                      </Button>
                    </Link>
                    <Button variant="outline-primary">
                      <FaMessage />
                    </Button>
                  </div>
                </div>{" "}
                <div className="profilesDivAbout">
                  <p>{item.about}</p>
                </div>
              </div>

              {/* <div className="profilesDiv">
                <Card border="primary" style={{ width: "18rem" }}>
                  <Card.Img variant="string" src={item.imageUrl} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                  <Card.Body>
                    <p>text</p>
                  </Card.Body>
                </Card>
              </div> */}
            </>
          ))}
      </Row>
    </>
  );
}

export default DisplayPage;
