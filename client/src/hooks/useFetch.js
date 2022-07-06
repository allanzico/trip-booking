import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endPoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const source = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/${endPoint}`, {
          cancelToken: source.token,
        });
        setData(res.data);
      } catch (error) {
        setError(error);
      }

    };

    fetchData();
    setLoading(false);
    return () => {
      source.cancel();
    };
    
  }, [endPoint]);

  const refetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/${endPoint}`);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, refetchData };
};

export default useFetch;
