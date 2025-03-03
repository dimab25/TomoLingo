import { useEffect, useState } from "react";
import { Movie_Details, Result } from "../types/customTypes";
import { Button, Image, Modal } from "react-bootstrap";

function MovieDetails() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  console.log("idQuery :>> ", idQuery);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setfile] = useState<Movie_Details | null>(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${idQuery}?append_to_response=videos&language=en-US&api_key=${api_key}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((result) => setfile(result))
      .catch((error) => console.error(error));
  }, []);
  console.log(file);
  return (
    <>
      <div className="movieContainerAll">
        <Image
          style={{ width: "20rem" }}
          fluid
          src={`https://image.tmdb.org/t/p/original${file?.backdrop_path}`}
        ></Image>
        <h5>{file?.title}</h5>
        <p>{file?.overview}</p>
        <div>{file?.tagline}</div>
        <Button variant="outline-primary">Watch</Button>
        <Button variant="outline-primary">Level</Button>

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

        <div className="movieCommentsDiv">Comments</div>
      </div>
    </>
  );
}

export default MovieDetails;
