
const mainVideoContainerSearch = document.querySelector('.mainContainer__videoContainer___search');
const mainVideoContainer = document.querySelector('.mainContainer__videoContainer___recommended');
const create = document.querySelector(".header__create");
const createHover = document.querySelector(".header__create div");
const app = document.querySelector(".header__app");
const appHover = document.querySelector(".header__app div");
const settings = document.querySelector(".header__settings");
const settingsHover = document.querySelector(".header__settings div");
const mainSearchInput = document.querySelector(".header__input input");
const history = document.querySelector(".history");


let searchesPerformed = [];

create.addEventListener('mouseover', () => {
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
});

history.querySelector('click', () => {
    
})


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
        if(publishedDay === currentDay) {
            return `${currentHour - publishedHour} hours ago`;
        } else if (currentMonth === publishedMonth) {
            return `${currentDay - publishedDay} days ago`;
        } else if(publishedYear === currentYear){
            return `${currentMonth - publishedMonth} months ago`;
        } else {
            return `${currentYear - publishedYear} years ago`;
        }
    }
}

//Makes a new array to store the search results in
const videoSearchResult = [];

//Listens for change on input field and then shows new results
mainSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchesPerformed.push(e.target.value);
        fetchSearchResults(e.target.value);
    }
  }
)

//This funtion displays the trending videos
const trendingResults = () => {
    return fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&key=AIzaSyCzITvmAO8Q1gHaYdIxMk2YhJdjdylqbNM`)
    .then(repsonse => repsonse.json())
    .then(data =>  {
        console.log(data)
        for(let i = 0; i < data.items.length; i++){
            videoSearchResult[i] = new Video (
                data.items[i].id.videoId,
                data.items[i].snippet.title,
                data.items[i].snippet.description,
                data.items[i].snippet.thumbnails.medium.url,
                data.items[i].snippet.channelTitle,
                data.items[i].snippet.publishedAt
            )
        }
        return videoSearchResult;
})
.then(data => updateHTML(data))
.then(data => updateDom(data))
}

//First Search function ran on load
//trendingResults()


//Fetches searches after presing 'enter' on input
const fetchSearchResults = (searchString) => {
    if (searchString === "trending") trendingResults(); 
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchString}&key=AIzaSyCzITvmAO8Q1gHaYdIxMk2YhJdjdylqbNM`)
    .then(repsonse => repsonse.json())
    .then(data =>  {
                console.log(data)
                for(let i = 0; i < data.items.length; i++){
                    videoSearchResult[i] = new Video (
                        data.items[i].id.videoId,
                        data.items[i].snippet.title,
                        data.items[i].snippet.description,
                        data.items[i].snippet.thumbnails.medium.url,
                        data.items[i].snippet.channelTitle,
                        data.items[i].snippet.publishedAt
                    )
                }
                return videoSearchResult;
    })
    .then(data => updateHTML(data))
    .then(data => updateDom(data))
}




//Updates the HTML for the video searchers
const updateHTML = (data) => {
console.log(data);
html = '';
for(let i = 0; i < data.length; i++){
        html += `<a href="https://www.youtube.com/watch?v=${data[i].id}">
                    <div class="videoCardSearched">
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
                </a>`
}
return html;
}


//Updates the DOM by taking the data and putting it on the page
const updateDom = (data) => {
    mainVideoContainer.classList.add('display');
    mainVideoContainerSearch.style["grid-template-columns"] = "repeat(1, 1fr)";
    mainVideoContainerSearch.innerHTML = data;
}



