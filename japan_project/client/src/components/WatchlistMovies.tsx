import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function WatchlistMovies({ poster }) {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  // console.log("idQuery :>> ", typeof idQuery);

  const imageUrl = `https://image.tmdb.org/t/p/original${poster}`;

  const [file, setFile] = useState([]);
  const [message, setMessage] = useState(null);

  const getMovieWatchlist = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };


    try {
      const response = await fetch(
        `http://localhost:4000/api/movie/watchlist/user_id/${user._id}`,
        requestOptions
      );
      const result = await response.json();
      setFile(result.movieWatchlistById);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("file :>> ", file);

  const handleDeleteWatchlist = async (e) => {
    e.preventDefault();
    
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (user) {
        urlencoded.append("user_id", user._id);
      }
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `http://localhost:4000/api/movie/watchlist/delete/movie_id/${idQuery}`,
        requestOptions
      );
      const result = await response.json();
      // console.log("result :>> ", result);
    } catch (error) {
      console.error(error);
    }
    await getMovieWatchlist();
  };

  const handleAddWatchlist = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    if (idQuery) {
      urlencoded.append("movie_id", idQuery);
    }
    if (user) {
      urlencoded.append("user_id", user._id);
    }
    if (imageUrl) {
      urlencoded.append("imageUrl", imageUrl);
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const response = await fetch(
      "http://localhost:4000/api/movie/watchlist/post/user_id",
      requestOptions
    );
    const result = await response.json();
    setMessage(result);   
    await  getMovieWatchlist();

    } catch (error) {
      console.error(error);
    }
      
   };
  console.log("message :>> ", message);
console.log('watchlist :>> ', file);
  const isMovieInWatchlist = file?.some((item) => item.movie_id === idQuery);

  // console.log("isMovieInWatchlist :>> ", isMovieInWatchlist);
  useEffect(() => {
    if (user) {
      getMovieWatchlist();
    }
  }, [isMovieInWatchlist]);

  return (
    <>
      {user &&
        (isMovieInWatchlist ? (
          <Button variant="outline-danger" onClick={handleDeleteWatchlist}>Watch(-)</Button>
        ) : (
          <Button  variant="outline-primary" type="submit" onClick={handleAddWatchlist}>
            Watch+
          </Button>
        ))}

      
    </>
  );
}

export default WatchlistMovies;
