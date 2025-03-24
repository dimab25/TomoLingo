import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Movies } from "../types/customTypes";
import { Link } from "react-router";
import "../css_pages/movies.css";
import getFormattedDate from "../utilities/changeDate";


function JapaneseMovies() {
  const [file, setfile] = useState<Movies[] | null>(null);

  // hover function
  const [ishover, setIshover] = useState({});

  const handleOnMouseOver = (id: number) => {
    setIshover((prev) => ({ ...prev, [id]: true }));
  };
  const handleMouseOut = (id: number) => {
    setIshover((prev) => ({ ...prev, [id]: false }));
  };

  const TextDisplay = () => {
    return (
      <>
        <div className="hideLevel">The Movie Database Vote Average</div>
      </>
    );
  };

  useEffect(() => {
    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/list/8516177?api_key=${api_key}&page=1`)
      .then((response) => response.json())
      .then((result) => setfile(result.items))
      .catch((error) => console.error(error));
  }, []);

  console.log("file :>> ", file);
  return (
    <>
      <div className="pageLayout">
        <h2 className="headline">Movies</h2>
        <div className="moviesAllDiv">
     
          {file &&
            file.map((item: Movies) => (
              <>
                <Card className="movieCard" >
                  <Link to={`/moviesDetails/?id=${item.id}`}>
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                    />
                  </Link>
                  
                  <Card.Title className="headTitel">{item.title}</Card.Title>
                  <Card.Title>
                    <div className="LevelRatingDiv">
                      {" "}
                      <div
                        className="levelDiv"
                        onMouseOver={() => handleOnMouseOver(item.id)}
                        onMouseOut={() => handleMouseOut(item.id)}
                      >
                        <div className="voteDiv">{item.vote_average.toFixed(1)}</div>

                        {ishover[item.id] && <TextDisplay />}
                      </div>{" "}
                      <div className="voteDiv">{getFormattedDate(item.release_date)}</div>
                    </div>

                                      </Card.Title>
                </Card>
              </>
            ))}
               </div>
      </div>
    </>
  );
}

export default JapaneseMovies;
