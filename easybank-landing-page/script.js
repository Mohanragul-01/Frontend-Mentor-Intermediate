const header = document.querySelector(".container");
const hero = document.querySelector(".hero");

const hambergur = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const mainNav = document.querySelector(".main-nav-list");

const section1 = document.querySelector("#section1");
const mainHeader = document.querySelector(".header");

const initialCoords = section1.getBoundingClientRect();

function reportWindowSize() {
  hero.style.marginLeft = getComputedStyle(header)["margin-left"];
}

reportWindowSize();
window.addEventListener("resize", reportWindowSize);

hambergur.addEventListener("click", function (e) {
  mainNav.classList.add("nav-open");
  hambergur.style.display = "none";

  close.style.display = "inline-block";
});

close.addEventListener("click", function () {
  mainNav.classList.remove("nav-open");
  hambergur.style.display = "inline-block";

  close.style.display = "none";
});

window.addEventListener("scroll", function () {
  if (window.scrollY > initialCoords.top) {
    mainHeader.classList.add("sticky");
  } 
  else   mainHeader.classList.remove("sticky");
});
