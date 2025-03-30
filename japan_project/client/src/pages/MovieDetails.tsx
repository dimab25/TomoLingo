import { useEffect, useState } from "react";
import { Movie_Details, Result } from "../types/customTypes";
import { Button, Image, Modal } from "react-bootstrap";
import { Link } from "react-router";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import MovieComments from "../components/MovieComments";
import WatchlistMovies from "../components/WatchlistMovies";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import "../css_pages/movie.css";
import { getFormattedDateAndDay } from "../utilities/changeDate";


type LanguageLevel = {
  _id: string;
  language_level: number;
  movie_id: string;
  rating: number;

};
function MovieDetails() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  // console.log("idQuery :>> ", idQuery);

  const [show, setShow] = useState(false);
  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setfile] = useState<Movie_Details | null>(null);
  const [languageLevel, setLanguageLevel] = useState<LanguageLevel[]| null>(null);

  const getCommentsByMovieId = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/movie/comments/all/id/${idQuery}`
      );
      const result = await response.json();
      setLanguageLevel(result.movieById);
    } catch (error) {
      console.error("Error fetching comments");
    }
  };
  console.log("languageLevel :>> ", languageLevel);
console.log('file :>> ', file);
  const newArrayLanguageLevel = languageLevel?.map((file) => {
    return file.language_level;
  });

  console.log("newArrayLanguageLevel :>> ", newArrayLanguageLevel);
  let sumLanguageLevel = 0;
  if (newArrayLanguageLevel) {
    sumLanguageLevel =
      newArrayLanguageLevel.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ) / newArrayLanguageLevel.length;
  }
  console.log("sumLanguageLevel  :>> ", sumLanguageLevel);

  const newArrayRatings = languageLevel?.map((xfile) => {
    return xfile.rating;
  });

  console.log("newArrayRatings :>> ", newArrayRatings);
  let sumRatings = 0;
  if (newArrayRatings) {
    sumRatings =
      newArrayRatings.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ) / newArrayRatings.length;
  }
  console.log("sumRatings  :>> ", sumRatings);

  useEffect(() => {
    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${idQuery}?append_to_response=videos&language=en-US&api_key=${api_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => setfile(result))
      .catch((error) => console.error(error));
    getCommentsByMovieId();
  }, []);

  return (
    <>
      <div className="pageLayout">
        <div className="movieContainerAll">
          <div className="movieImageContainer">
            <div style={{ maxWidth: "20rem", minWidth:"10rem" }}>
              <Image
              
              fluid
              src={`https://image.tmdb.org/t/p/original${file?.poster_path}`}
            ></Image></div>
            
          </div>
          <div className="movieInfoContainer" style={{ maxWidth: "24rem" }}>
            <h5 className="movieTitel">{file?.title}</h5>
            <p>Original titel: {file?.original_title}</p>
            <div className="movie-details-container">
              {file &&
                file.genres.map((genre) => (
                  <i>
                    <div>{genre.name}</div>
                  </i>
                ))}
              <p>TMDB Vote: {file?.vote_average.toFixed(1)}</p>
            </div>
            <i>
              <div>{file?.tagline}</div>
            </i>

            <p className="movie-overview">{file?.overview}</p>
            <div className="dateAndTimeDiv">
              <p>{file && getFormattedDateAndDay(file.release_date)}</p>
              <p>{file?.runtime} min</p>
              </div>
              <div className="movieLanguageLevel">
         
                {sumLanguageLevel == 0 && (
                  <> <div>Language Level</div> &nbsp;
                    <FaRegCircle />
                    <FaRegCircle />
                    <FaRegCircle />
                  </>
                )}
                {sumLanguageLevel < 1.4 && sumLanguageLevel > 0 && (
                  <>
                   <div>Beginner</div> &nbsp;
                    <FaCircle />
                    <FaRegCircle />
                    <FaRegCircle />
                  </>
                )}
                {sumLanguageLevel >= 1.4 && sumLanguageLevel < 2.4 && (
                  <>
                    <div>Intermediate</div> &nbsp;
                    
                    <FaCircle />
                    <FaCircle />
                    <FaRegCircle />
                  </>
                )}
                {sumLanguageLevel >= 2.4 && (
                  <>
                  <div>Advanced</div> &nbsp;
                    
                    <FaCircle />
                    <FaCircle />
                    <FaCircle />
                  </>
                )}
              </div>
              <div className="ratings">
                <div> Rating </div>&nbsp;
               
                {sumRatings === 0 && (
                    <>
                    {" "}
                    <IoIosStarOutline /> <IoIosStarOutline />
                    <IoIosStarOutline /> <IoIosStarOutline />
                    <IoIosStarOutline /> 
                    </>
                )}
                {sumRatings > 0 && sumRatings < 20 && (
                  <>
                    <IoIosStar />
                    <IoIosStarOutline /> <IoIosStarOutline />{" "}
                    <IoIosStarOutline /> <IoIosStarOutline />{" "}
                    </>
                )}
                {sumRatings >= 20 && sumRatings <= 40 && (
                   <>
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStarOutline /> <IoIosStarOutline />{" "}
                    <IoIosStarOutline />{" "}
                    </>
                )}
                {sumRatings > 40 && sumRatings <= 60 && (
                    <>
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStarOutline /> <IoIosStarOutline />{" "}
                    </>
                )}
                {sumRatings > 60 && sumRatings <= 80 && (
                   <>
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStarOutline />{" "}
                    </>
                )}
                {sumRatings > 80 && (
                    <>
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />{" "}
                    </>
                )}
              </div>
           

            <div className="buttonsDiv">
              {file?.homepage &&  <Link  target="_blank" to={file.homepage}>
                <Button variant="outline-primary">Homepage</Button>
              </Link>}
             
              {file && <WatchlistMovies poster={file.poster_path} />}

             

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
                                            </Modal>
                    </>
                  ))}
            </div>
          </div>
        </div>
        <MovieComments getCommentsByMovieId={getCommentsByMovieId} />
      </div>
    </>
  );
}

export default MovieDetails;
