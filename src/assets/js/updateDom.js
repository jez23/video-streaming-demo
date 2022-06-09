import addEventListenerFunction from "./modalEventListeners.js";

//Updates the DOM (after performing a search) by taking the data and putting it on the page
const updateDom = (data) => {
  const mainVideoContainerSearch = document.querySelector(
    ".mainContainer__videoContainer___search"
  );
  const mainVideoContainer = document.querySelector(
    ".mainContainer__videoContainer___recommended"
  );

  mainVideoContainerSearch.classList.remove("display");
  mainVideoContainer.classList.add("display");
  mainVideoContainerSearch.style["grid-template-columns"] = "repeat(1, 1fr)";
  mainVideoContainerSearch.innerHTML = data;
  addEventListenerFunction(data);
};

export default updateDom;
