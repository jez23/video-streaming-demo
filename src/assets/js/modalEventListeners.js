import updateModalHTML from "./updateModalHTML.js";
import globalObject from "./globalObject.js";

//This one controls the displaying of the modal
const addEventListenerFunction = () => {
  let videoType = "";
  const videoModalContainer = document.querySelector(".videoModal__container");
  const videoCardVideoInfo = document.querySelectorAll(".videoCard__VideoInfo");
  const videoCardSearched = document.querySelectorAll(".videoCardSearched");
  const videoModal = document.querySelector(".videoModal");
  const closer = document.querySelector(".closer");

  videoModal.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  videoCardVideoInfo.forEach((video) => {
    video.addEventListener("click", (e) => {
      globalObject.videoCurrentlySelected = [video.id];
      videoModalContainer.classList.remove("display");
      updateModalHTML("trending");
      videoType = "trending";
    });
  });
  videoCardSearched.forEach((videoSearched) => {
    videoSearched.addEventListener("click", (e) => {
      globalObject.videoCurrentlySelected = [videoSearched.id];
      videoModalContainer.classList.remove("display");
      updateModalHTML("searched");
      videoType = "searched";
    });
  });
  closer.addEventListener("click", () => {
    videoModalContainer.classList.add("display");
    if (videoType === "trending") {
      updateModalHTML("trending");
    } else {
      updateModalHTML("searched");
    }
  });
  videoModalContainer.addEventListener("click", () => {
    videoModalContainer.classList.add("display");
    if (videoType === "trending") {
      updateModalHTML("trending");
    } else {
      updateModalHTML("searched");
    }
  });
};

export default addEventListenerFunction;
