//Updates the DOM on page load by taking the data and putting it on the page
import addEventListenerFunction from './modalEventListeners.js';

const updateDomTrending = (data) => {

const mainVideoContainerSearchTrending = document.querySelector('.mainContainer__videoContainer___search');
const mainVideoContainerTrending = document.querySelector('.mainContainer__videoContainer___recommended');

    mainVideoContainerSearchTrending.classList.add('display');
    mainVideoContainerTrending.classList.remove('display');
    mainVideoContainerTrending.innerHTML = data;
    addEventListenerFunction()
}

export default updateDomTrending;