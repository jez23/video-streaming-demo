import globalObject from './globalObject.js';
import fetchSearchResults from './fetchSearchResults.js';
import updateDomTrending from './updateDomTrending.js';
import updateDom from './updateDom.js';
import updateTrendingHTML from './updateTrendingHTML.js';

const eventListeners = () => {
        const theWholePage = document.querySelector('.mainContainer');

        const mainVideoContainerTitle = document.querySelector('.mainContainer__videoContainer__h3');

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

        const trendingAction = [trendingButton, trendingButtonModal, mainContainerSideNavigationHome, mainContainerModalNavigationHome];

        trendingAction.forEach(el => 
            el.addEventListener('click', (e) => {
                const data = updateTrendingHTML(globalObject.videoTrending)
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
                        <p>${globalObject.searchesPerformed.length} searchs were previously performed</p>
                        <ol>`;
            if(globalObject.searchesPerformed.length > 0){
                for(let i = 0; i < globalObject.searchesPerformed.length; i++){
                    data += `<li>${globalObject.searchesPerformed[i].toUpperCase()}</li>`
                }
            }
            data += `</ol></div>`
            mainVideoContainerTitle.innerHTML = `History`;
            updateDom(data)
        })

        )

        //Listens for change on input field and then shows new results
        mainSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if(e.target.value === null || e.target.value === undefined || e.target.value === '') return
                globalObject.searchesPerformed.push(e.target.value);
                localStorage.setItem('searchResults', JSON.stringify(globalObject.searchesPerformed));
                fetchSearchResults(e.target.value);
                e.target.value = '';
            }
        }
        )
}

export default eventListeners;