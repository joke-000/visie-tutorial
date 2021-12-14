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
Zorg nu dat App.js de nieuwe component weergeeft.  Eerst importeer je de nieuwe file in je App.js (tweede regel). Vervolgens zet je het component in de JSX van App.js.

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
## Stap 3: haal de data op 
Nu gaan we er voor zorgen dat de DataFetch component ook daadwerkelijk JSON data op gaat halen.
Wat dit betekent: Op het moment dat deze component geladen wordt, wil je dat hij een fetch doet naar de backend. 
Hiervoor gebruik je een React hook, useEffect. 

Deze hook heeft een aantal overeenkomsten met hooks in Wordpress. Net als een Wordpress hook is useEffect een stuk code dat op een specifiek moment wordt uitgevoerd. UseEffect runt iedere keer dat het component geladen wordt. Dat is precies het moment waarop wij de data willen ophalen.  

Net als bij een Wordpress hook kan je je eigen code aan useEffect toevoegen. Op het moment dat useEffect runt wordt jouw code dan ook uitgevoerd. 

Om useEffect te kunnen gebruiken moet je useEffect eerst importeren. Zie de code hieronder. Daarna zet je de hook in je component (meteen onder function DataFetch). useEffect is nu klaar om te gebruiken. Als je nu eigen code binnenin de hook zet wordt die gerund wanneer useEffect runt. Dat is de volgende stap. 
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

We maken een functie die de data ophaalt (fetchData) en roepen die functie aan binnen de hook useEffect. Zie code hieronder. 

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

FetchData haalt de JSON van de backend en logt die in de console. Verder niets. Je kan je data dus nog niet op je scherm zien (tenzij je de inspector opent uiteraard). De data gaan we vertonen in stap 4. 

## Stap 4: toon de data in je component

De app haalt dus een stuk JSON van de backend. De ‘backend’ is in dit geval de [JSON placeholder API](https://jsonplaceholder.typicode.com/). Dit is een online mock API die gratis te gebruiken is voor testdoeleinden. De data bestaat uit een lijst met fictieve ‘users’.  
In plaats van direct naar de console te loggen, slaan we de data op in een variabele. Vervolgens laten we die variabele zien in onze JSX. Dit is de code die we hiervoor gebruiken. Alles wordt hieronder verder toegelicht. 
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
 
Om de data in een variabele op te kunnen slaan, moeten we opnieuw iets importeren: useState. Zie bovenste regel. Met die import kunnen we de syntax gebruiken die we hiervoor nodig hebben. 

Deze syntax staat (onder andere) op de vierde regel. Die regel is interessant, want deze code doet een aantal dingen tegelijk:

Hij declareert een variabele voor onze data. Die variabele heet myFetchedList.

Vervolgens maakt hij een nieuwe functie aan: setMyFetchedList. Dit is een kant en klare functie. Deze functie kun je gebruiken om myFetchedList een nieuwe waarde mee te geven. Die methode hoef je dus niet zelf te schrijven. Dat doet React voor je. 

Het laatste stukje syntax in de regel (useState([]) ) zet een lege lijst in deze net gemaakte variabele. 

Die lege lijst is nu klaar om te vullen met opgehaalde users. Dat doen we als volgt: 

In fetchData  vervangen we console.log(result) door setMyFetchedList(result). Hiermee pakken we de opgehaalde data (result) en zetten die in de variabele myFetchedList.  Hierbij wordt dus de kant en klare methode uit regel vier gebruikt (setMyFetchedList)  

Nu wordt de lijst met users in onze variabele gezet, iedere keer dat hij wordt opgehaald. Die variabele kunnen we nu in de app laten zien. 

We zetten de variabele in onze JSX. Vervolgens maken we daar een map van. Wat de map doet:  voor ieder item in de lijst maakt hij een list element die de naam van de user weergeeft. Dat zie je vervolgens in de browser.

## Stap 5: Haal het ophalen en het vertonen van de data uit elkaar.

De DataFetch component vervult nu twee taken tegelijk. Hij haalt de lijst met users van de backend op en vertoont die lijst vervolgens in de browser. Dat werkt op zich prima. Maar de React filosofie is dat de verschillende taken worden opgesplitst in componenten. Iedere taak heeft zijn eigen component. Dat wordt de volgende stap. 

We gaan voor het vertonen van de users een nieuw component maken. Maak in je source map (waar ook App.js en DataFetch.js staan) een nieuwe file. Noem die User.js. Zet daar de volgende code in. 

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

Importeer de user nu in DataFetch.js (zie code hieronder). De JSX in dataFetch zet elke user nu in een list element. Vervang dat list element door een User component. Nu wordt er voor elke user in de lijst een User component gegenereerd. 

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
In de browser zie je nu tien keer een User component. Dat is niet bijster interessant: elk user component is hetzelfde. We willen ook informatie van de user in het component laten zien. Daarvoor zullen we die informatie door moeten geven, van de DataFetch naar het User component. 

Dat doen we als volgt. Zie code voorbeeld hieronder. Voeg in de eerste regel 1 van User.js (tussen de haakjes) het woordje props toe. Neem ook de code uit de JSX  over. React gaat nu even op zijn bek, maar dat is niet erg.

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

Voeg in de MyFetchedList.map in DataFetch.js het volgende stukje code toe: userProp={item}. Zie code hieronder. 

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

Als het goed is doet React het nu weer. Wat je gedaan hebt: DataFetch maakt voor ieder item in de lijst met users een User Component. Via de nieuwe userProp krijgt ieder User component het bijbehorende user item nu mee. Die informatie kan het user component vervolgens vertonen in zijn JSX.

Nu zien we in onze browser een mooie lijst met users: hun naam, hun usernaam, hun straat en hun ‘suite’. Nu wordt het tijd om wat interactiviteit toe te voegen. 
















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
