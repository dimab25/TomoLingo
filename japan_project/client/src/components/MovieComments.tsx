import { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Image } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import getFormattedDate from "../utilities/changeDate";

function MovieComments() {
  const { user } = useContext(AuthContext);
  //   console.log('user :>> ', user);
  const [file, setFile] = useState<[] | string>("");
  const [comment, setComment] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
}
console.log('comment :>> ', comment);

const handlePostComment = (e) => {
    e.preventDefault();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  const urlencoded = new URLSearchParams();
  urlencoded.append("language_level",comment.language_level);
if (user) {
     urlencoded.append("user_id", user.id);
}
 
  
  urlencoded.append("comment", comment.comment);
  if (idQuery)
{  urlencoded.append("movie_id", idQuery);}

  
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  
  fetch("http://localhost:4000/api/movie/comments/post/comment", requestOptions)
    .then((response) => response.text())
    .then((result) => setErrorMessage(result))
    .catch((error) => console.error(error));
  };
  
console.log('errorMessage :>> ', errorMessage);


  useEffect(() => {
    getCommentsByMovieId();
  }, []);

  console.log("file :>> ", file);
  return (
    <>
      <div className="movieCommentsDiv">
        <h6>Comments</h6>
        <div>
          {file &&
            file.map((item) => (
              <>
                {" "}
                <div className="commentTopDiv">
                  <Image
                    src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1741016734/Profile_avatar_placeholder_large_orgqrl.png"
                    alt="User image"
                    style={{ width: "100px", borderRadius: "25px" }}
                  />
                  <div>
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

                    {/* <div>
                      <FaCircle />
                      <FaCircle />
                      <FaRegCircle />
                    </div> */}
                    <div>{getFormattedDate(item.created_at)}</div>
                    <div>Rating: {item.rating}</div>
            
                  </div>{" "}
                  <div>
                    <p>Level: {item.language_level} </p>
                    <div>{item.comment}</div>
                    <div>Userid{item.user_id}</div>
                  </div>
                </div>
              </>
            ))}

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
                <Form.Control placeholder="message" as="textarea" name="comment" />
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
              {errorMessage?.includes("error")? <p>Please select a level</p>: null}
              {errorMessage?.includes("message")? <p>Comment is posted</p>: null}
              <Button variant="outline-primary" type="submit">
                Add
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieComments;
