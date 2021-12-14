import React, {useEffect, useState} from "react";

function DataFetch() {
    const [ myFetchedList, setMyFetchedList] = useState([]);
    useEffect(() => {
        fetchData();
    },[]);

    function fetchData(){
        const url = `https://jsonplaceholder.typicode.com/users`;
        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                setMyFetchedList(result);
            });
      }
    
    return (
      <div>
        <ul>
          {myFetchedList.map((item) => 
            <li key={item.id}>{item.name}</li>  
          )}
        </ul>
      </div>
    );
  }
  
export default DataFetch;