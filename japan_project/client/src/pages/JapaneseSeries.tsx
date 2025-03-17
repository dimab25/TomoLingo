import { useEffect, useState } from "react";
import { Series } from "../types/customTypes";
import { Card } from "react-bootstrap";
import { Link } from "react-router";


function JapaneseSeries() {
    const [file, setfile] = useState<Series | string>("");

    useEffect(() => {
      const api_key = import.meta.env.VITE_TMDB_API_KEY;
      fetch(`https://api.themoviedb.org/3/list/8516245?api_key=${api_key}`)
        .then((response) => response.json())
        .then((result) => setfile(result.items))
        .catch((error) => console.error(error));
  
        
    }, []);
  
    console.log("file :>> ", file);
    return (
      <><h5>Series</h5>
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
                    
                  /></Link>
                  <Card.Body>
                    <div className="LevelRatingDiv">  <div>Level</div> <div>Rating</div></div>
                    <Card.Text>{item.original_name}</Card.Text>
                   
                  </Card.Body>
                </Card>
              </>
            ))}
        {/* </Row> */}</div>
        
      </>
    );
}

export default JapaneseSeries