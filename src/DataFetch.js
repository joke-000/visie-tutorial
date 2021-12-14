import React, {useEffect} from "react";

function DataFetch() {
    useEffect(() => {
        fetchData();
    },[]);

    function fetchData(){
        const url = `https://jsonplaceholder.typicode.com/users`;
        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                console.log(result);
            });
      }
    
    return (
      <div>
        Dit is DataFetch
      </div>
    );
  }
  
export default DataFetch;