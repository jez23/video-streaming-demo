import './css/style.css';

import globalObject from './assets/scripts/globalObject.js';
import updateTrendingHTML from './assets/scripts/updateTrendingHTML.js';
import createNewVideoObject from './assets/scripts/createNewVideoObject.js';
import updateDomTrending from './assets/scripts/updateDomTrending.js';
import trendingResults from './assets/scripts/trendingResults.js';
import eventListeners from './assets/scripts/eventListeners.js';



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

