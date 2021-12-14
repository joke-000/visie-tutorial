# Tutorial: Hoe bouw ik een basic (maar complete) React app?

In deze tutorial vind je een stappenplan voor het maken van een eenvoudige React app.

Deze app haalt een JSON file op van een externe API. Hij geeft die inhoud vervolgens weer in een lijst. Aan die lijst wordt vervolgens ook nog wat interactiviteit toegevoegd in de vorm van een zoekfunctie.

Deze zaken (Data ophalen, tonen, interactiviteit) komen bijna altijd terug in React apps. Als je dit kunt bouwen heb je de basis van het gemiddelde React project. Die basis kun je dan vervolgens uitbouwen naar iets groters.

Als je al eens een React app aangemaakt hebt (met create-react-app) kun je stap 1 overslaan.

## Stap 1: App aanmaken
Open een terminal. Maak in de terminal een nieuwe folder waar je je app in wil maken . Of, als je een bestaande folder wil gebruiken, ga naar die bestaande folder met het command cd bestaande-folder.
Voer daarna het volgende commando in: 
```npx create-react-app my-app ```
(voor my-app kun je een eigen titel invullen, hoe je de app ook maar wilt noemen)

Het kan zijn dat je om toestemming gevraagd wordt om React te installeren. Je antwoord is dan uiteraard een ‘yes’.
Als de installatie klaar is, zie je een nieuwe folder.  Ga met je terminal daarin. Geef dan het commando ‘npm start’. De nieuwe app opent vanzelf. Je kunt hem stoppen door in de terminal control c in te drukken.
Zie ook [dit artikel:](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/react-on-windows) 
 

Open de nieuwe folder nu met je code editor. Als het goed is zie je de code files. Je kunt nu beginnen met coden.

## Stap 2: Maak een nieuwe component om je data op te halen.
Open de file App js. Daar staat een hoop code die je niet nodig hebt. Haal die weg en vervang die voor het volgende.

``` import './App.css';

function App() {
  return (
    <div className="App">
      Dit is App js
    </div>
  );
}

export default App; 
```
Maak nu in de source folder (waar ook App.js in staat) een nieuwe file aan. Noem die file DataFetch.js. Zet het volgende in die file. 

```
function DataFetch() {
    return (
      <div>
        Dit is DataFetch
      </div>
    );
  }
  
export default DataFetch;
```
Zorg nu dat App.js de nieuwe component weergeeft.  Eerst importeer je de nieuwe file in je App.js (tweede regel). Vervolgens zet je het component in je tsx  (regel 8).

```
import './App.css';
import DataFetch from './DataFetch';
 
function App() {
  return (
    <div className="App">
      dit is App.js
      <DataFetch />
    </div>
  );
}

export default App;
```



```
mport React, {useEffect} from "react";

function DataFetch() {
    useEffect(() => {
    },[]);
    
    return (
      <div>
        Dit is DataFetch
      </div>
    );
  }
  
export default DataFetch;
```

```
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

```


```
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
```


```
function User() {
    return (
      <div>
        Dit is de user component
      </div>
    );
  }
  
export default User;
```
```
import React, {useEffect, useState} from "react";
import User from "./User";

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
            <User key={item.id}/>  
          )}
        </ul>
      </div>
    );
  }
  
export default DataFetch;
```

```
function User(props) {
    return (
      <div>
         <div>
            <h3>{props.userProp.name}</h3>
            <p>Username: {props.userProp.username}</p>
            <p>Street: {props.userProp.address.street}</p>
            <p>Suite: {props.userProp.address.suite}</p>
        </div>
      </div>
    );
  }
  
export default User;

```
```
import React, {useEffect, useState} from "react";
import User from "./User";

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
            <User key={item.id} userProp={item}/>  
          )}
        </ul>
      </div>
    );
  }
  
export default DataFetch;
```

```
import React, {useEffect, useState} from "react";
import User from "./User";

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
          {myFetchedList
          .filter((item) => 
            (item.name.toLowerCase().includes("clementin") )  
          )
          .map((item) => 
            <User key={item.id} userProp={item}/>  
          )}
        </ul>
      </div>
    );
  }
  
export default DataFetch;
```


```
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
    
    return (
      <div>
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

```

```
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
```

## Stap 3: haal de data op 

Nu gaan we de zorgen dat de DataFetch component ook daadwerkelijk data ophaalt. Zie de code hieronder.  Bovenaan DataFetch wordt nieuwe regel toegevoegd. Met deze regel importeer je useEffect. 
Je gaat useEffect gebruiken om je data op te halen. 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
