import globalObject from './globalObject.js';
import updateHTML from './updateHTML.js';
import createNewVideoObject from './createNewVideoObject.js';
import updateDom from './updateDom.js';

//Fetches searches after presing 'enter' on input
const fetchSearchResults = (searchString) => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchString}&key=AIzaSyCzITvmAO8Q1gHaYdIxMk2YhJdjdylqbNM`)
    .then(repsonse => repsonse.json())
    .then(data =>  {
                let newArray = createNewVideoObject(data, globalObject.videoSearchResult);
                return newArray; 
    })
    .then(data => updateHTML(data))
    .then(data => updateDom(data))
    .catch((error) => {
        alert("Apologies, the daily number of search requests for this free public API has been reached. The limit is reset every day, so please try again in 24 hours.");
        throw error;
    })
}

export default fetchSearchResults;