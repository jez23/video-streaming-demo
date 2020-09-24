import './css/style.css';

const theWholePage = document.querySelector('.mainContainer');
const mainVideoContainerSearch = document.querySelector('.mainContainer__videoContainer___search');
const mainVideoContainer = document.querySelector('.mainContainer__videoContainer___recommended');
const mainVideoContainerTitle = document.querySelector('.mainContainer__videoContainer__h3');
const create = document.querySelector(".header__create");
const createHover = document.querySelector(".header__create div");
const app = document.querySelector(".header__app");
const appHover = document.querySelector(".header__app div");
const settings = document.querySelector(".header__settings");
const settingsHover = document.querySelector(".header__settings div");
const mainSearchInput = document.querySelector(".header__input input");
const history = document.querySelector(".mainContainer__sideNavigation__history");
const historyMobile = document.querySelector(".mainContainer__modalNavigation__history")
const headerMenu  = document.querySelector(".header__menu");
const sideMenu = document.querySelector(".sideMenu");
const sideMenuClose = document.querySelector(".sideMenuClose");
const trendingButton = document.querySelector(".mainContainer__sideNavigation__trending");
const trendingButtonModal = document.querySelector(".mainContainer__modalNavigation__trending");
const mainContainerModalNavigationHome = document.querySelector(".mainContainer__modalNavigation__home");
const sideMenuMenu = document.querySelector(".sideMenu__menu");
const mainContainerSideNavigationHome = document.querySelector(".mainContainer__sideNavigation__home");

headerMenu.addEventListener('click', (e) => {
    sideMenu.classList.remove("display");
    theWholePage.style.position = "absolute";
    theWholePage.style.left = "102.5px";
});
sideMenuMenu.addEventListener('click', (e) => {
    e.stopPropagation();
})
sideMenuClose.addEventListener('click', (e) => {
    sideMenu.classList.add("display");
    theWholePage.style.position = "static";
    theWholePage.style.left = "0px";
});
sideMenu.addEventListener('click', () => {
    sideMenu.classList.add("display");
    theWholePage.style.position = "static";
    theWholePage.style.left = "0px";
    
})
/* create.addEventListener('mouseover', () => {
    createHover.classList.remove("display");
});
create.addEventListener('mouseout', () => {
    createHover.classList.add("display");
});
app.addEventListener('mouseover', () => {
    appHover.classList.remove("display");
});
app.addEventListener('mouseout', () => {
    appHover.classList.add("display");
});

settings.addEventListener('mouseover', () => {
    settingsHover.classList.remove("display");
});
settings.addEventListener('mouseout', () => {
    settingsHover.classList.add("display");
}); */

const trendingAction = [trendingButton, trendingButtonModal, mainContainerSideNavigationHome, mainContainerModalNavigationHome];

trendingAction.forEach(el => 
    el.addEventListener('click', (e) => {
        const data = updateTrendingHTML(videoTrending)
        updateDomTrending(data);
        if(el === trendingButton || el === trendingButtonModal){
            mainVideoContainerTitle.innerHTML = `Trending`;
        } else {
            mainVideoContainerTitle.innerHTML = `Home`;
        }
    })
)

const historyArray = [history, historyMobile];

historyArray.forEach(el => 

el.addEventListener('click', (e) => {
    let data = `<div class="historyStorageResults">
                    <h3>Here are your previous searches:</h3>
                 <p>${searchesPerformed.length} searchs were previously performed</p>
                 <ol>`;
    if(searchesPerformed.length > 0){
        for(let i = 0; i < searchesPerformed.length; i++){
            data += `<li>${searchesPerformed[i].toUpperCase()}</li>`
        }
    }
    data += `</ol></div>`
    mainVideoContainerTitle.innerHTML = `History`;
    updateDom(data)
})

)




//Makes new objects for all the JSON videos
class Video {
    constructor(id, title, description, thumbnail, channelTitle, publishedAt) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.thumbnail = thumbnail,
        this.channelTitle = channelTitle,
        this.publishedAt = new Date(publishedAt)
    }
    publishedWeeksAgo(){
        const publishedYear = this.publishedAt.getFullYear();
        const publishedMonth = this.publishedAt.getMonth();
        const publishedDay = this.publishedAt.getDay();
        const publishedHour = this.publishedAt.getHours();
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDay();
        const currentHour = new Date().getHours()
        if (publishedDay === currentDay) return `${currentHour - publishedHour} hours ago`;
        if (currentMonth === publishedMonth) return `${currentDay - publishedDay} days ago`;
        if (publishedYear === currentYear) return `${currentMonth - publishedMonth} months ago`;
        return `${currentYear - publishedYear} years ago`;
        
    }
}

//Makes a new array to store the search results in
const videoSearchResult = []; // keeps track of all the search videos
let videoTrending = []; //keeps track of the trending videos
let searchesPerformed = [];  //keep track of all the searchs
let videoCurrentlySelected = []; //Tracks the current selected video and plays it in the modal


if(localStorage.searchResults){
    let retrievedObject = localStorage.getItem('searchResults');
    searchesPerformed = JSON.parse(retrievedObject);
    console.log("Yes")
}

var retrievedObject = localStorage.getItem('testObject');
//Listens for change on input field and then shows new results
mainSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if(e.target.value === null || e.target.value === undefined || e.target.value === '') return
        searchesPerformed.push(e.target.value);
        localStorage.setItem('searchResults', JSON.stringify(searchesPerformed));
        fetchSearchResults(e.target.value);
        e.target.value = '';
    }
  }
)

//This funtion displays the trending videos
const trendingResults = () => {
    return fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=16&key=AIzaSyCzITvmAO8Q1gHaYdIxMk2YhJdjdylqbNM`)
    .then(repsonse => repsonse.json())
    .then(data =>  {
    
        let newTrendingVideos = createNewVideoObject(data, videoTrending);
        localStorage.setItem('TrendingVideos', JSON.stringify(newTrendingVideos));
        console.log(localStorage.TrendingVideos)

        return videoTrending;
})
.then(data => updateTrendingHTML(data))
.then(data => updateDomTrending(data))
.catch((err) => alert("Apologies, the daily number of search requests for this free public API has been reached. The limit is reset every day, so please try again in 24 hours."))
}
let videoType = "";

const updateModalHTML = (type) => {
    const placeholderVideoContainer = document.querySelector('.placeholderVideoContainer');
    const modalTitle = document.querySelector(".modalTitle");
    const modalDescriptionText = document.querySelector(".modalDescription__text");
    const modalmetaDataViewsChannelName = document.querySelector(".modalmetaDataViews__channelName");
    const modalmetaDataViewsUploaded = document.querySelector(".modalmetaDataViews__uploaded");

    let trendingVideoObj;

    if(type === "trending"){
        trendingVideoObj = videoTrending.find((el) => el.id === videoCurrentlySelected[0]);
    } else if (type === "searched") {
        trendingVideoObj = videoSearchResult.find((el) => el.id === videoCurrentlySelected[0]);
    }
  
    modalmetaDataViewsUploaded.innerHTML = `Uploaded: ${trendingVideoObj.publishedWeeksAgo()}`;
    modalTitle.innerHTML = trendingVideoObj.title;
    modalDescriptionText.innerHTML =  trendingVideoObj.description;
    modalmetaDataViewsChannelName.innerHTML = `Channel ID: ${trendingVideoObj.channelTitle}`;
    placeholderVideoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoCurrentlySelected[0]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}
//This one controls the displaying of the modal
const addEventListenerFunction = (data) => {
  
    const videoModalContainer = document.querySelector('.videoModal__container');
    const videoCardVideoInfo = document.querySelectorAll('.videoCard__VideoInfo');
    const videoCardSearched = document.querySelectorAll('.videoCardSearched');
    const videoModal = document.querySelector('.videoModal');
    const closer = document.querySelector('.closer');
    
    videoModal.addEventListener('click', (e) => {
        e.stopPropagation();
    })
    videoCardVideoInfo.forEach(video => {
        video.addEventListener('click', (e) => {
            videoCurrentlySelected = [video.id];
            videoModalContainer.classList.remove('display');
            updateModalHTML("trending");
            videoType = 'trending';
       })
    })
    videoCardSearched.forEach(videoSearched => {   
        videoSearched.addEventListener('click', (e) => {
            videoCurrentlySelected = [videoSearched.id];
            videoModalContainer.classList.remove('display');
            updateModalHTML("searched");
            videoType = 'searched';
        })
    })
    closer.addEventListener('click', () => {  
        videoModalContainer.classList.add('display');
            if(videoType === "trending"){
                    updateModalHTML("trending");
            } else {
                    updateModalHTML("searched");
            }
    })
    videoModalContainer.addEventListener('click', () =>{
        videoModalContainer.classList.add('display');
        if(videoType === "trending"){
            updateModalHTML("trending");
        } else {
                updateModalHTML("searched");
        }
    })
}




//Updates the HTML for the video searchers
const updateTrendingHTML = (data) => {

    let html = '';
    for(let i = 0; i < data.length; i++){
            html += `
                        <div class="videoCard__VideoInfo" id=${data[i].id}>
                            <div class="videoCard__VideoInfo__thumbnail">
                                <img src="${data[i].thumbnail}">
                            </div>
                            <div class="videoCard__VideoInfo__summary">
                                <div>
                                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                </div>
                                <div>
                                    <div>
                                        <p>${data[i].title}</p>
                                    </div>
                                    <div>
                                        <p>${data[i].channelTitle}</p>
                                    </div>
                                    <div>
                                        <p>${data[i].publishedWeeksAgo()}</p>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    `
    }
    
    return html;
    }

//Updates the DOM on page load by taking the data and putting it on the page
const updateDomTrending = (data) => {
    mainVideoContainerSearch.classList.add('display');
    mainVideoContainer.classList.remove('display');
    mainVideoContainer.innerHTML = data;
    addEventListenerFunction()
}
 
//First Search function ran on load
if(localStorage.TrendingVideos) {

    let retrieveTrending = JSON.parse(localStorage.getItem('TrendingVideos'));
    let retrieveTrendingNewObject = createNewVideoObject(retrieveTrending, videoTrending)
    videoTrending = [...retrieveTrendingNewObject];
    console.log("stored")
    let data = updateTrendingHTML(videoTrending)
    updateDomTrending(data)

   
} else {
    console.log("new"); 
    trendingResults();
}  


//Fetches searches after presing 'enter' on input
const fetchSearchResults = (searchString) => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchString}&key=AIzaSyCzITvmAO8Q1gHaYdIxMk2YhJdjdylqbNM`)
    .then(repsonse => repsonse.json())
    .then(data =>  {
                let newArray = createNewVideoObject(data, videoSearchResult);
                return newArray; 
    })
    .then(data => updateHTML(data))
    .then(data => updateDom(data))
    .catch((error) => {
        console.log(error); 
        alert("Apologies, the daily number of search requests for this free public API has been reached. The limit is reset every day, so please try again in 24 hours.")
    })
}

function createNewVideoObject(data, array){ 

    if(data.hasOwnProperty('items') && array === videoTrending){
        for(let i = 0; i < data.items.length; i++){
            array[i] = new Video (
                data.items[i].id,
                data.items[i].snippet.title,
                data.items[i].snippet.description,
                data.items[i].snippet.thumbnails.medium.url,
                data.items[i].snippet.channelTitle,
                data.items[i].snippet.publishedAt
            )
        }
    }  else if (data.hasOwnProperty('items') && array === videoSearchResult){
        for(let i = 0; i < data.items.length; i++){
            array[i] = new Video (
                data.items[i].id.videoId,
                data.items[i].snippet.title,
                data.items[i].snippet.description,
                data.items[i].snippet.thumbnails.medium.url,
                data.items[i].snippet.channelTitle,
                data.items[i].snippet.publishedAt
            )
        }
    }  else {
        for(let i = 0; i < data.length; i++){
            array[i] = new Video (
                data[i].id,
                data[i].title,
                data[i].description,
                data[i].thumbnail,
                data[i].channelTitle,
                data[i].publishedAt
            )
        }
    }
    return array;
}    


//Updates the HTML for the video searchers
const updateHTML = (data) => {
let html = '';
for(let i = 0; i < data.length; i++){
        html += `<div class="videoCardSearched" id=${data[i].id}>
                    <div class="videoCardSearched__image">
                        <img src="${data[i].thumbnail}">
                    </div>
                    <div class="videoCardSearched__VideoInfo">
                        <h3>${data[i].title}</h3>
                        <div>
                            <ul>
                                <li>${data[i].channelTitle}</li>
                                <li>${data[i].publishedWeeksAgo()}</li>
                            </ul>
                        </div>
                        <p>${data[i].description}</p>
                    </div>
                </div>
             `
}

return html;
}


//Updates the DOM (after performing a search) by taking the data and putting it on the page
const updateDom = (data) => {
    mainVideoContainerSearch.classList.remove('display');
    mainVideoContainer.classList.add('display');
    mainVideoContainerSearch.style["grid-template-columns"] = "repeat(1, 1fr)";
    mainVideoContainerSearch.innerHTML = data;
    addEventListenerFunction(data)
}




