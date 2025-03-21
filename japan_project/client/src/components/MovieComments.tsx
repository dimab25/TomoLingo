import { ChangeEvent, useContext, useEffect, useState } from "react";
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
import { MovieById, UploadComment } from "../types/customTypes";

function MovieComments({ getCommentsByMovieId }) {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState<MovieById[] | null>(null);
  const [comment, setComment] = useState<UploadComment | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");

  //   console.log('idQuery :>> ', idQuery);

  const getCommentsByMovieIdChild = async () => {
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
  console.log("comment :>> ", comment);
  // console.log("user.user_id :>> ", user?._id);
  const handlePostComment = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    if (comment) {
      urlencoded.append("language_level", comment.language_level);
    }
    urlencoded.append("user_id", user?._id);
    if (comment) {
      urlencoded.append("comment", comment.comment);
    }
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
  };

  const deletePostComment = async (id: string, e) => {
    e.preventDefault();
    try {
      const urlencoded = new URLSearchParams();

      const requestOptions = {
        method: "DELETE",
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `http://localhost:4000/api/movie/comments/delete/comment/_id/${id}`,
        requestOptions
      );
      const result = await response.json();
      setErrorMessage(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("errorMessage :>> ", errorMessage);
  // console.log("sliderChange :>> ", sliderValue);

  useEffect(() => {
    getCommentsByMovieIdChild();
    getCommentsByMovieId();
  }, [errorMessage]);

  console.log("file :>> ", file);
  return (
    <>
      <div className="movieCommentsDiv">
        <h6>Comments</h6>
        <div className="movieCommentsAll">
          {file &&
            file.map((item) => (
              <>
                {" "}
                <div className="commentEachDiv">
                  {" "}
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
                  <div className="commentRightPart">
                    <div className="commentUpperPart">
                      <div className="commentNameDate">
                        <div>@{item.user_id.name}</div>

                        <div>{item.created_at}</div>
                      </div>{" "}
                      <div className="deleteButtonComment">
                        {" "}
                        {user && user._id === item.user_id._id && (
                          <Button
                            variant="outline-danger"
                            onClick={(e) => deletePostComment(item._id, e)}
                          >
                            X
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="commentMiddlePart">{item.comment}
                      
                    </div>
                    <div className="commentLevelRating">
                      <div>Level</div>&nbsp;
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
                      <div className="commentRating">
                        <div>Rating</div>&nbsp;
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
                </div>
              </>
            ))}
        </div>

        <div className="addCommentDiv">
          {!user && <h5>You have to be logged in to post a comment.</h5>}
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
                disabled={!user && true}
              />
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Select
                aria-label="Default select example"
                onChange={handleInputChange}
                name="language_level"
                disabled={!user && true}
              >
                <option>How do you rate the Language?</option>
                <option value="1">Beginner</option>
                <option value="2">Intermediate</option>
                <option value="3">Advanced</option>
              </Form.Select>
            </Form.Group>
            <Form.Label>Did you like the Movie?</Form.Label>
            <div className="ratingDiv">
              <FaRegThumbsDown />{" "}
              <Form.Range
                name="rating"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                disabled={!user && true}
              />
              <FaRegThumbsUp />
            </div>
            {/* {errorMessage?.includes("message") ? (
              <p>Comment is posted</p>
            ) : null} */}
            <Button
              variant="outline-primary"
              type="submit"
              disabled={!user && true}
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default MovieComments;
