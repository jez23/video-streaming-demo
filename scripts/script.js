

const create = document.querySelector(".header__create");
const createHover = document.querySelector(".header__create div");
const app = document.querySelector(".header__app");
const appHover = document.querySelector(".header__app div");
const settings = document.querySelector(".header__settings");
const settingsHover = document.querySelector(".header__settings div");


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