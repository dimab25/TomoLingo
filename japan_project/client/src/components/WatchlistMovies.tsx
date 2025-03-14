import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function WatchlistMovies({poster}) {
  const { user } = useContext(AuthContext);
 
  
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  // console.log("idQuery :>> ", idQuery);

  const imageUrl = `https://image.tmdb.org/t/p/original${poster}`;


  const [file, setFile] = useState(null);

  const getMovieWatchlist = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://localhost:4000/api/movie/watchlist/user_id/${user?._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setFile(result.movieWatchlistById))
      .catch((error) => console.error(error));
  };

  // console.log("file :>> ", file);


  const handleDeleteWatchlist = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
if (user)
{urlencoded.append("user_id", user._id)};

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

fetch(`http://localhost:4000/api/movie/watchlist/delete/movie_id/${idQuery}`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));



  
  }


  const handleAddWatchlist = (e) => {
    e.preventDefault();
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

    fetch(
      "http://localhost:4000/api/movie/watchlist/post/user_id",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

      // console.log('user.id :>> ', user._id);
  };

  useEffect(() => {
    getMovieWatchlist();
  }, []);

  return (
    <>
 <Button type="submit" onClick={handleAddWatchlist}>
              Watch+
            </Button>
<Button onClick={handleDeleteWatchlist}>Delete</Button> 
      {/* {user && !file && (
        <Button type="submit" onClick={handleAddWatchlist}>
          Watch+
        </Button>
      )}


      {file &&
        file.map((item) =>
          item.movie_id.includes(idQuery) ? (
            <Button onClick={handleDeleteWatchlist}>Delete</Button>
          ) : (
            <Button type="submit" onClick={handleAddWatchlist}>
              Watch+
            </Button>
          )
        )}

        <Button onClick={handleDeleteWatchlist}>Delete</Button> */}
    </>
  );
}

export default WatchlistMovies;
