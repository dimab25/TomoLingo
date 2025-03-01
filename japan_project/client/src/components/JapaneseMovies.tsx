import { useEffect, useState } from "react";

function JapaneseMovies() {
  const [file, setfile] = useState("");

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=JP&without_genres=10749",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setfile(result.results))
      .catch((error) => console.error(error));
  }, []);

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWQwMGIxZGU3MTJkZjAyNGRkM2E1ZmRlYTIwMDA0MSIsIm5iZiI6MTczMzY4NzI3Ni44NDUsInN1YiI6IjY3NTVmN2VjZjE4MjliNjZmYmI1MDA2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5tZCU2M8ZoNBm9D21tmfXw9IDN2sk2JUb0vOFT6a2KM"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  console.log("file :>> ", file);
  return (
    <>
      <div>JapaneseMovies</div>
      {file &&
        file.map((item) => (
          <>
            <p>{item.original_title}</p>
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              style={{ width: "300px" }}
              alt=""
            />
          </>
        ))}
    </>
  );
}

export default JapaneseMovies;
