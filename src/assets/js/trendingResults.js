import createNewVideoObject from "./createNewVideoObject.js";
import updateTrendingHTML from "./updateTrendingHTML.js";
import updateDomTrending from "./updateDomTrending.js";
import globalObject from "./globalObject.js";

//This funtion displays the trending videos
const trendingResults = () => {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=16&key=AIzaSyCzITvmAO8Q1gHaYdIxMk2YhJdjdylqbNM`
  )
    .then((repsonse) => repsonse.json())
    .then((data) => {
      let newTrendingVideos = createNewVideoObject(
        data,
        globalObject.videoTrending
      );
      localStorage.setItem("TrendingVideos", JSON.stringify(newTrendingVideos));
      return globalObject.videoTrending;
    })
    .then((data) => updateTrendingHTML(data))
    .then((data) => updateDomTrending(data))
    .catch((err) => {
      alert(
        "Apologies, the daily number of search requests for this free public API has been reached. The limit is reset every day, so please try again in 24 hours."
      );
      throw err;
    });
};

export default trendingResults;
