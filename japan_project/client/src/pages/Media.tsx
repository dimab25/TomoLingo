import { useEffect, useState } from "react";
import JapaneseMovies from "../components/JapaneseMovies";


function Media() {
     const [file, setFile] = useState<[]|string>("");
    
      const fetchAllMovies = async () => {
        fetch("http://localhost:4000/api/movies/all")
          .then((response) => response.json())
          .then((result) => setFile(result.allMovies))
    
          .catch((error) => console.error(error));
      };
    
      console.log(file);
      useEffect(() => {
        fetchAllMovies();
      }, []);
  return (
    <>
    <JapaneseMovies/>
    {file && file?.map((item) => (<>
      <p>{item.title}</p>
      <p>{item.country}</p>
      <img src={item.imgUrl} alt="" style={{width:"400px"}}/></>
    ))}
    
  </>
);
  
}

export default Media