import './assets/css/imports.css';

import globalObject from './assets/js/globalObject.js';
import updateTrendingHTML from './assets/js/updateTrendingHTML.js';
import createNewVideoObject from './assets/js/createNewVideoObject.js';
import updateDomTrending from './assets/js/updateDomTrending.js';
import trendingResults from './assets/js/trendingResults.js';
import eventListeners from './assets/js/eventListeners.js';

eventListeners();
if(localStorage.searchResults){
    let retrievedObject = localStorage.getItem('searchResults');
    globalObject.searchesPerformed = JSON.parse(retrievedObject);
}
 
//First Search function ran on load
if(localStorage.TrendingVideos) {
    let retrieveTrending = JSON.parse(localStorage.getItem('TrendingVideos'));
    let retrieveTrendingNewObject = createNewVideoObject(retrieveTrending, globalObject.videoTrending)
    globalObject.videoTrending = [...retrieveTrendingNewObject];
    console.log("stored")
    let data = updateTrendingHTML(globalObject.videoTrending)
    updateDomTrending(data)
} else {
    console.log("new"); 
    trendingResults();
}  

