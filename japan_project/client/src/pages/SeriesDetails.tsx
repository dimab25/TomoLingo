import { useEffect, useState } from "react";
import { Series_Details } from "../types/customTypes";


function SeriesDetails() {
      const queryParameters = new URLSearchParams(window.location.search);
    const idQuery = queryParameters.get("id");
    console.log('idQuery :>> ', idQuery);


    const [file, setfile] = useState<Series_Details | string>("");
    
        useEffect(() => {
          const api_key = import.meta.env.VITE_TMDB_API_KEY;
          const url = `https://api.themoviedb.org/3/tv/${idQuery}?append_to_response=videos&language=en-US&api_key=${api_key}`
         
          fetch(url)
            .then((response) => response.json())
            .then((result) => setfile(result))
            .catch((error) => console.error(error));
      
            
        }, []);
console.log(file);
  return (
    <div>SeriesDetails</div>
  )
}

export default SeriesDetails