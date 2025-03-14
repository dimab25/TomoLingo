import { useEffect, useState } from "react";
import { Movie_Details, Result } from "../types/customTypes";
import { Button, FloatingLabel, Form, Image, Modal } from "react-bootstrap";
import { Link } from "react-router";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import getFormattedDate from "../utilities/changeDate";
import MovieComments from "../components/MovieComments";
import WatchlistMovies from "../components/WatchlistMovies";


function MovieDetails() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  // console.log("idQuery :>> ", idQuery);

  const [show, setShow] = useState(false);
  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setfile] = useState<Movie_Details | null>(null);
const [languageLevel, setLanguageLevel] = useState(null)

  const getCommentsByMovieId = async () => {
    fetch(`http://localhost:4000/api/movie/comments/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setLanguageLevel(result.movieById))
      .catch((error) => console.error(error));
  };
  console.log('languageLevel :>> ', languageLevel);

  const newArray = languageLevel?.map((file) => {
    return file.language_level;
  });

  if (newArray)
{const sumLanguageLevel = newArray.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)/ newArray.length;
console.log('sumLanguageLevel  :>> ', sumLanguageLevel );}


  



  // const savedIDsArrayUndefined = imageIDs.map((file: ImageDates) => {
  //   if (user && file.author.includes(user?.email)) return file;
  // });


  useEffect(() => {
  
    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${idQuery}?append_to_response=videos&language=en-US&api_key=${api_key}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((result) => setfile(result))
      .catch((error) => console.error(error));
      getCommentsByMovieId()
  }, []);
  

  return (
    <>
      <div className="pageLayout">
        <div className="movieContainerAll">
          <div className="movieImageContainer">
            <Image
              style={{ maxWidth: "20rem" }}
              fluid
              src={`https://image.tmdb.org/t/p/original${file?.poster_path}`}
            ></Image>
          </div>
          <div className="movieInfoContainer">
            <h5 className="movieTitel">{file?.title}</h5>
            <p>Original titel: {file?.original_title}</p>
            <div className="movie-details-container">
              {file &&
                file.genres.map((genre) => (
                  <i>
                    <div>{genre.name}</div>
                  </i>
                ))}
              <p>{file?.vote_average}</p>
            </div>
            <i>
              <div>{file?.tagline}</div>
            </i>


            <p className="movie-overview">{file?.overview}</p>
            <div className="dateAndTimeDiv">
              <p>{file && getFormattedDate(file.release_date)}</p>
              <p>{file?.runtime} min</p>
              <div>
                {" "}
                <FaCircle />
                <FaCircle />
                <FaRegCircle />
              </div>
            </div>
{/* {languageLevel && languageLevel.map((level)=>(
  <div>{level.language_level}</div>
))} */}

            <div className="buttonsDiv">
              <Link to={file?.homepage}>
                <Button variant="outline-primary">Homepage</Button>
              </Link>
{file &&   <WatchlistMovies poster={file.poster_path}/>}
            
              {/* <Button variant="outline-primary">Watch+</Button> */}

              {file &&
                file.videos.results
                  .filter((item: Result) => item.type === "Trailer")
                  .slice(0, 1)
                  .map((trailer) => (
                    <>
                      <Button variant="outline-primary" onClick={handleShow}>
                        Trailer
                      </Button>

                      <Modal size="xl" show={show} onHide={handleClose}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                          {" "}
                          <iframe
                            className="youtube"
                            style={{ width: "100%", height: "400px" }}
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </Modal.Body>
                        {/* <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer> */}
                      </Modal>
                    </>
                  ))}
            </div>
          </div>
        </div>
    <MovieComments />
      </div>
    </>
  );
}

export default MovieDetails;
