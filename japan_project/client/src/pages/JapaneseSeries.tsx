import { useEffect, useState } from "react";
import { Series } from "../types/customTypes";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import getFormattedDate from "../utilities/changeDate";

function JapaneseSeries() {
  const [file, setfile] = useState<Series[] | null>(null);

  // hover function
  const [ishover, setIshover] = useState({});

  const handleOnMouseOver = (id: string) => {
    //REVIEW very nice the use of the functional update :)
    setIshover((prev) => ({ ...prev, [id]: true }));
  };
  const handleMouseOut = (id: string) => {
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
    //REVIEW enclose the fetch in a function, and call the function
    fetch(`https://api.themoviedb.org/3/list/8516245?api_key=${api_key}`)
      .then((response) => response.json())
      .then((result) => setfile(result.items))
      .catch((error) => console.error(error));
  }, []);

  console.log("file :>> ", file);
  return (
    <>
      <h2 className="headline">Series</h2>
      <div className="moviesAllDiv">
        {/* <Row xs={1} md={2} className="g-4"> */}

        {file &&
          file.map((item: Series) => (
            <>
              <Card style={{ width: "18rem" }}>
                <Link to={`/seriesDetails/?id=${item.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  />
                </Link>
                <Card.Title className="headTitel">{item.name}</Card.Title>
                <Card.Title>
                  <div className="LevelRatingDiv">
                    {" "}
                    <div
                      className="levelDiv"
                      onMouseOver={() => handleOnMouseOver(item.id)}
                      onMouseOut={() => handleMouseOut(item.id)}
                    >
                      <div className="voteDiv">
                        {item.vote_average.toFixed(1)}
                      </div>

                      {ishover[item.id] && <TextDisplay />}
                    </div>{" "}
                    <div className="voteDiv">
                      {getFormattedDate(item.first_air_date)}
                    </div>
                  </div>
                </Card.Title>
              </Card>
            </>
          ))}
        {/* </Row> */}
      </div>
    </>
  );
}

export default JapaneseSeries;
