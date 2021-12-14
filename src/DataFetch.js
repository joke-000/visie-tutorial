import React, {useEffect, useState} from "react";
import User from "./User";

function DataFetch() {
    const [ myFetchedList, setMyFetchedList] = useState([]);
    const [ searchTerms, setSearchTerms]= useState(""); 
    

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

    function handleSearch(event) {
        console.log(event.target.value);
        setSearchTerms(event.target.value.toLowerCase());
    }
    
    return (
      <div>
        <p>Zoek op naam</p>
            <input type='text' onChange={(event)=>handleSearch(event)}></input>
        <ul>
          {myFetchedList
          .filter((item) => 
            (item.name.toLowerCase().includes(searchTerms))  
          )
          .map((item) => 
            <User key={item.id} userProp={item}/>  
          )}
        </ul>
      </div>
    );
  }
  
export default DataFetch;