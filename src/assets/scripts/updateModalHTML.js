import globalObject from './globalObject.js';

const updateModalHTML = (type) => {
    const placeholderVideoContainer = document.querySelector('.placeholderVideoContainer');
    const modalTitle = document.querySelector(".modalTitle");
    const modalDescriptionText = document.querySelector(".modalDescription__text");
    const modalmetaDataViewsChannelName = document.querySelector(".modalmetaDataViews__channelName");
    const modalmetaDataViewsUploaded = document.querySelector(".modalmetaDataViews__uploaded");
   
    let trendingVideoObj;

    if(!type || type === undefined){
        let search = globalObject.videoSearchResult.find((el) => el.id === globalObject.videoCurrentlySelected[0]);
        let trending = globalObject.videoTrending.find((el) => el.id === globalObject.videoCurrentlySelected[0]);
       
        trendingVideoObj = search || trending;
    } else if(type === "trending"){
        trendingVideoObj = globalObject.videoTrending.find((el) => el.id === globalObject.videoCurrentlySelected[0]);
       
    } else if (type === "searched") {
        trendingVideoObj = globalObject.videoSearchResult.find((el) => el.id === globalObject.videoCurrentlySelected[0]);

    } 
    trendingVideoObj? modalmetaDataViewsUploaded.innerHTML = `Uploaded: ${trendingVideoObj.publishedWeeksAgo()}`: modalmetaDataViewsUploaded.innerHTML = "";
    trendingVideoObj? modalTitle.innerHTML = trendingVideoObj.title : modalTitle.innerHTML = " ";
    trendingVideoObj?  modalDescriptionText.innerHTML =  trendingVideoObj.description:  modalDescriptionText.innerHTML = "";
    trendingVideoObj? modalmetaDataViewsChannelName.innerHTML = `Channel ID: ${trendingVideoObj.channelTitle}` : modalmetaDataViewsChannelName.innerHTML =  "";
    placeholderVideoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${globalObject.videoCurrentlySelected[0]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

export default updateModalHTML;