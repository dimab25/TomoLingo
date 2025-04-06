import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Watchlist } from "../types/customTypes";
import { baseURL } from "../utilities/urls";

type WatchlistMoviesProps = {
  poster: string;
};
function WatchlistMovies( {poster}: WatchlistMoviesProps) {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  // console.log("idQuery :>> ", typeof idQuery);

  const imageUrl = `https://image.tmdb.org/t/p/original${poster}`;

  const [file, setFile] = useState<Watchlist[]| []>([]);
  const [message, setMessage] = useState(null);

  const getMovieWatchlist = async () => {
    const requestOptions : RequestInit = {
      method: "GET",
      redirect: "follow",
    };


    try {
      const response = await fetch(
        `${baseURL}/api/movie/watchlist/user_id/${user?._id}`,
        requestOptions
      );
      const result = await response.json();
      setFile(result.movieWatchlistById);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("file :>> ", file);

  const handleDeleteWatchlist = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (user) {
        urlencoded.append("user_id", user._id);
      }
      const requestOptions: RequestInit  = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/movie/watchlist/delete/movie_id/${idQuery}`,
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
    } catch (error) {
      console.error(error);
    }
    await getMovieWatchlist();
  };

  const handleAddWatchlist = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    const requestOptions : RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const response = await fetch(
      `${baseURL}/api/movie/watchlist/post/user_id`,
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
