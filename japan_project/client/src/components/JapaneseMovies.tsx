import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { Movies } from "../types/customTypes";
import { Link } from "react-router";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

function JapaneseMovies() {
  const [file, setfile] = useState<Movies | string>("");

  // hover function
  const [ishover, setIshover] = useState({});

  const handleOnMouseOver =(id)=>{
    setIshover((prev) => ({ ...prev, [id]: true }))
  }
  const handleMouseOut =(id)=>{
    setIshover((prev) => ({ ...prev, [id]: false }))
  }

  const TextDisplay=()=>{
    return(
      <>
      <div className="hideLevel">Level</div>
      </>
    )
  }

  useEffect(() => {
    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/list/8516177?api_key=${api_key}&page=1`)
      .then((response) => response.json())
      .then((result) => setfile(result.items))
      .catch((error) => console.error(error));
  }, []);

  console.log("file :>> ", file);
  return (
    <><div className="pageLayout">
      <h5>Movies</h5>
      <div className="moviesAllDiv">
        {/* <Row xs={1} md={2} className="g-4"> */}

        {file &&
          file.map((item: Movies) => (
            <>
              <Card style={{ width: "18rem" }}>
                <Link to={`/moviesDetails/?id=${item.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  />
                </Link>
                <Card.Title>{item.title}</Card.Title>
                <Card.Title>
                  <div className="LevelRatingDiv">
                    {" "}
                    <div className="levelDiv" onMouseOver={() =>handleOnMouseOver(item.id)} onMouseOut={() =>handleMouseOut(item.id)} >
                      
                
                         <FaCircle />
                        <FaCircle />
                        <FaRegCircle />
                        {ishover[item.id] &&  <TextDisplay/>}
                    </div>{" "}
                    <div className="voteDiv">{item.vote_average}</div>
                  </div>
                  
                
                  {/* <Card.Text>{item.original_title}</Card.Text> */}
                </Card.Title>
              </Card>
            </>
          ))}
        {/* </Row> */}
      </div>
      </div>
    </>
  );
}

export default JapaneseMovies;
