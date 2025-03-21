import { useEffect } from "react";
import { useNavigate } from "react-router";


const DelayedLink = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      return navigate("/");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return <div></div>;
};


export default DelayedLink