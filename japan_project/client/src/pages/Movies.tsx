import { useEffect, useState } from "react";


function Movies() {

    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const urls = Array.from({ length: 20 }, (_, i) => `https://jsonplaceholder.typicode.com/posts/${i + 1}`);



  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
        setData(responses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);
  return (
    <>
    </>
  )
}

export default Movies