import { useEffect, useState } from "react";

type HookReturnType<T> = {
  data: T | null;
};
//REVIEW very nice implementation of a useFetch custom hook. Why not using it ?
function useFetchHook<T>(url: string): HookReturnType<T> {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = (await response.json()) as T;
      setData(result);
    };
    fetchData();
  }, [url]);

  return { data: data };
}

export default useFetchHook;
