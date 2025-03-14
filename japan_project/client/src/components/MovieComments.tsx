import { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Image } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import getFormattedDate from "../utilities/changeDate";
import { Link } from "react-router";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

function MovieComments() {
  const { user } = useContext(AuthContext);
 
  const [file, setFile] = useState<[] | string>("");
  const [comment, setComment] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");

  //   console.log('idQuery :>> ', idQuery);

  const getCommentsByMovieId = async () => {
    fetch(`http://localhost:4000/api/movie/comments/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setFile(result.movieById))
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);
    setComment({ ...comment!, [e.target.name]: e.target.value });
  };
  // console.log("comment :>> ", comment);
  // console.log("user.user_id :>> ", user?._id);
  const handlePostComment = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    if (comment)
    {urlencoded.append("language_level", comment.language_level)};

    urlencoded.append("user_id", user?._id);

if (comment.comment)
    {urlencoded.append("comment", comment.comment)};


    if (idQuery) {
      urlencoded.append("movie_id", idQuery);
    }
    if (sliderValue) {
      urlencoded.append("rating", sliderValue);
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/api/movie/comments/post/comment",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setErrorMessage(result))
      .catch((error) => console.error(error));

      
     getCommentsByMovieId();
  };

  // console.log("errorMessage :>> ", errorMessage);
  // console.log("sliderChange :>> ", sliderValue);

  useEffect(() => {
    getCommentsByMovieId();
  }, []);

  // console.log("file :>> ", file);
  return (
    <>
      <div className="movieCommentsDiv">
        <h6>Comments</h6>
        <div className="movieCommentsAll">
          {file &&
            file.map((item) => (
              <>
                {" "}
                <div className="commentTopDiv">
                  <div>
                    <Link to={`/profile/?id=${item.user_id._id}`}>
                      <Image
                        src={item.user_id.imageUrl}
                        alt="User image"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "25px",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="commentRight">
                    <div className="commentRightUpperside">
                      <div className="commentNameDate">
                        <div>@{item.user_id.name}</div>

                        <div>{getFormattedDate(item.created_at)}</div>
                      </div>{" "}
                      <div className="commentLevelRating">Level 
                        {item.language_level === 1 && (
                          <div>
                            <FaCircle />
                            <FaRegCircle />
                            <FaRegCircle />
                          </div>
                        )}
                        {item.language_level === 2 && (
                          <div>
                            <FaCircle />
                            <FaCircle />
                            <FaRegCircle />
                          </div>
                        )}
                        {item.language_level === 3 && (
                          <div>
                            <FaCircle />
                            <FaCircle />
                            <FaCircle />
                          </div>
                        )}

                        {/* <div>Level: {item.language_level} </div> */}
                        <div>
                          Rating:{" "}
                          {item.rating < 20 && (
                            
                              <div>
                                <IoIosStar />
                                <IoIosStarOutline /> <IoIosStarOutline />{" "}
                                <IoIosStarOutline /> <IoIosStarOutline />{" "}
                              </div>
                            
                          )}
                          {item.rating >= 20 && item.rating <= 40 && (
                           <div>
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStarOutline /> <IoIosStarOutline />{" "}
                              <IoIosStarOutline />{" "}
                              </div>
                          )}
                          {item.rating > 40 && item.rating <= 60 && (
                            <div>
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStarOutline /> <IoIosStarOutline />{" "}
                              </div>
                          )}
                          {item.rating > 60 && item.rating <= 80 && (
                           <div>
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStarOutline />{" "}
                              </div>
                          )}
                          {item.rating > 80 && (
                          <div>
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />{" "}
                              </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>{item.comment}</div>
                  </div>
                </div>
              </>
            ))}
        </div>
        <div className="addCommentDiv">
          <Form onSubmit={handlePostComment}>
            {" "}
            <Form.Label>Add a comment</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label="Message"
              className="mb-3"
              onChange={handleInputChange}
            >
              <Form.Control
                placeholder="message"
                as="textarea"
                name="comment"
              />
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Select
                aria-label="Default select example"
                onChange={handleInputChange}
                name="language_level"
              >
                <option>How do you rate the Language?</option>
                <option value="1">Beginner</option>
                <option value="2">Intermediate</option>
                <option value="3">Advanced</option>
              </Form.Select>
            </Form.Group>
            {/* {errorMessage?.includes("error") ? (
              <p>Please select a level</p>
            ) : null} */}
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Select
                aria-label="Default select example"
                onChange={handleInputChange}
                name="rating"
              >
                <option>How do you rate the Language?</option>
                <option value="1">Bad</option>
                <option value="2">Neutral</option>
                <option value="3">Bad</option>
                <option value="3">Bad</option>
              </Form.Select>
            </Form.Group> */}
            <Form.Label>Did you like the Movie?</Form.Label>
            <div className="ratingDiv">
              <FaRegThumbsDown />{" "}
              <Form.Range
                name="rating"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
              />
              <FaRegThumbsUp />
            </div>
            {/* {errorMessage?.includes("message") ? (
              <p>Comment is posted</p>
            ) : null} */}
            <Button variant="outline-primary" type="submit">
              Add
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default MovieComments;
