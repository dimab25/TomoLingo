import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { Movies } from "../types/customTypes";

function JapaneseMovies() {
  const [file, setfile] = useState<Movies | string>("");

  useEffect(() => {
    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/list/8516177?api_key=${api_key}`)
      .then((response) => response.json())
      .then((result) => setfile(result.items))
      .catch((error) => console.error(error));
  }, []);

  console.log("file :>> ", file);
  return (
    <>
    <div className="moviesAllDiv">
      {/* <Row xs={1} md={2} className="g-4"> */}
        {file &&
          file.map((item: Movies) => (
            <>
              <Card style={{ width: "16rem" }}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  
                />
                <Card.Body>
                  <Card.Title>
                    {item.title}
                   
                
                  
                  </Card.Title> <div className="LevelRatingDiv">  <div>Level</div> <div>Rating</div></div>
                  <Card.Text>{item.original_title}</Card.Text>
                 
                </Card.Body>
              </Card>
            </>
          ))}
      {/* </Row> */}</div>
    </>
  );
}

export default JapaneseMovies;
