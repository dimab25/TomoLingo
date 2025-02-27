// import useFetchHook from "../hooks/useFetchHook";

import { useEffect, useState } from "react";

function DisplayPage() {
  // const { data } =useFetchHook(
  //     "http://localhost:4000/api/movies/all"
  //   );
  // console.log('data :>> ', data);

  const [file, setFile] = useState<[]|string>("");

  const fetchAllMovies = async () => {
    fetch("http://localhost:4000/api/users/all")
      .then((response) => response.json())
      .then((result) => setFile(result.allUsers))

      .catch((error) => console.error(error));
  };

  // console.log(file);
  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <>
      {file && file?.map((item) => (
        <p>{item.name}</p>
      ))}
   
    </>
  );
}

export default DisplayPage;
