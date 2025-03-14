import { useContext, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import { Button, Image, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import UserImagePost from "../components/UserImagePost";
import getFormattedDate from "../utilities/changeDate";

function MyProfile() {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState<User[] | null>(null);
  const [movieWatchlist, setMovieWatchlist] = useState(null);

  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleClose = () => {
    setShow(false);
    setSelectedPost(null);
  };
  const handleShow = (post) => {
    setShow(true);
    setSelectedPost(post);
  };
  // maybe the problem exist, cause file is an array

  const getProfileById = async () => {
    fetch(`http://localhost:4000/api/users/all/id/67cffb39e6571e713867c437`)
      .then((response) => response.json())
      .then((result) => setFile(result.userById))

      .catch((error) => console.error(error));
  };

  console.log("file :>> ", file);
  // console.log("user :>> ", user);
  // console.log('file[0]._id :>> ', file[0]._id);
  const getMovieWatchlist = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://localhost:4000/api/movie/watchlist/user_id/67cffb39e6571e713867c437`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setMovieWatchlist(result.movieWatchlistById))
      .catch((error) => console.error(error));
  };

  // console.log("movieWatchlist :>> ", movieWatchlist);

  useEffect(() => {
    getProfileById();
    getMovieWatchlist();
  }, []);

  // const [user, setUser] = useState<User | null>(null);

  // const getMyProfile = async () => {
  //   const token = localStorage.getItem("token");

  //   const myHeaders = new Headers();

  //   myHeaders.append("Authorization", `Bearer ${token} `);

  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/users/myprofile",
  //       requestOptions
  //     );
  //     if (!response.ok) {
  //       console.log("Something went wrong");
  //     }
  //     if (response.ok)
  //     {  const result = await response.json();
  //       setUser(result);}

  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

  return (
    <>
      <div className="pageLayout">
        <div className="userInfoDiv">
          {file ? (
            <div>
              <h3>Hi user {file[0].name}</h3>
              <Image
                src={file[0].imageUrl}
                alt="user profile pic"
                style={{ width: "150px", height: "auto" }}
              />
              <p>Age: {file[0].age}</p>
              <p>E-Mail:{file[0].email}</p>
              <p>Location: {file[0].location}</p>
              <p>Native Language: {file[0].native_language}</p>
              <p>Target Language: {file[0].target_language}</p>
              <p>Level: {file[0].target_language_level}</p>
            </div>
          ) : (
            <h5>You have to login</h5>
          )}
          <Button variant="outline-primary">Update</Button>
        </div>
        <div className="movieListFullDiv">
          <h4>Movielist</h4>
          <div className="movielistDiv">
            {movieWatchlist &&
              movieWatchlist.map((movie) => (
                <>
                  <Link as to={`/moviesDetails/?id=${movie.movie_id}`}>
                    <Image
                      src={movie.imageUrl}
                      style={{ width: "100px", borderRadius: "25px" }}
                    />
                  </Link>
                </>
              ))}
          </div>
        </div>

        <div className="postedImagesFullDiv">
          <UserImagePost />
          <div className="postedImages">
            {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
            {file &&
              file[0].posts.map((item, index) => (
                <>
                  <div key={index}>
                    <Image
                      style={{ width: "200px" }}
                      src={item.imageUrl}
                      onClick={() => handleShow(item)}
                    />

                    <Modal size="xl" show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        <Image
                          style={{ width: "auto" }}
                          src={selectedPost?.imageUrl}
                          fluid
                        />
                        <div>{selectedPost?.text}</div>{" "}
                      </Modal.Body>
                      <Modal.Footer>
                        <div>{getFormattedDate(selectedPost?.created_at)}</div>{" "}
                        <Button variant="outline-danger" onClick={handleClose}>
                          Delete
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
