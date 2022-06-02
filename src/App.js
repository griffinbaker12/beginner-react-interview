import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState();
  const [users, setUsers] = useState([]);
  const [userSearchNum, setUserSearchNum] = useState(0);

  const fetchData = async (page) => {
    const response = await fetch(`https://randomuser.me/api${page}`);
    // JS object
    const data = await response.json();
    // Converts JS object or value to JSON string
    return data;
  };

  useEffect(() => {
    const fetchDataEffect = async () => {
      const apiData = await fetchData();
      setData(apiData);
      console.log("yo", apiData.results);
      setUsers((prevState) => [...prevState, apiData.results[0]]);
    };
    try {
      fetchDataEffect();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleFetchUser = async () => {
    const apiData = await fetchData(`?page=${userSearchNum}`);
    console.log("data fetch", data);
    setUserSearchNum(userSearchNum + 1);
    setUsers((prevState) => [...prevState, apiData.results[0]]);
  };

  const handleClick = () => setCount(count + 1);

  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={handleClick}>Increment</button>
      <button onClick={handleFetchUser}>FetchUser</button>
      <pre>
        {users.length > 0 &&
          users.map((result, i) => {
            console.log("res", result);
            return (
              <div key={i}>
                <p>
                  {result.name.title +
                    " " +
                    result.name.first +
                    " " +
                    result.name.last}
                </p>
                <img src={result.picture.thumbnail} alt="user" />
              </div>
            );
          })}
      </pre>
    </div>
  );
}
