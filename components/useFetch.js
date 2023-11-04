import {useState, useEffect} from 'react';
import axios from 'axios';
import {API_KEY} from '@env'

const useFetch = (url) => { 
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          url + "?key=" + API_KEY,
        )
        setData(response.data)
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };
      fetchData();
  }, [url]);

  return { data, isLoading, error }

}

export default useFetch;