import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const source = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        });
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      fetchData();
      setLoading(false);
      return () => {
        source.cancel();
      };
    };
    
  }, [url]);

  const refetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, token, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, refetchData };
};

export default useFetch;
