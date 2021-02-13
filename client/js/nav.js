const btnMainHome = document.querySelector(".nav-main-home");
const btnAsideHome = document.querySelector(".nav-aside-home");
const btnMainPostList = document.querySelector(".nav-main-post-list");
const btnAsidePostList = document.querySelector(".nav-aside-post-list");
const btnAsidePostNew = document.querySelector(".nav-aside-post-new");
const btnMainProjectList = document.querySelector(".nav-main-project-list");
const btnAsideProjectList = document.querySelector(".nav-aside-project-list");
const btnAsideProjectNew = document.querySelector(".nav-aside-project-new");
const btnMainPlan = document.querySelector(".nav-main-plan");
const btnAsidePlan = document.querySelector(".nav-aside-plan");

function navMainSelect(navName) {
  const navMainList = document.querySelectorAll(".nav-main > li");
  navMainList.forEach((li) => {
    if (li.classList.contains(navName)) {
      if (!li.classList.contains("nav-main-selected")) {
        li.classList.add("nav-main-selected");
      }
    } else {
      if (!li.classList.contains("nav-main-selected")) {
        li.classList.remove("nav-main-selected");
      }
    }
  });
}

function navAsideSelect(navName) {
  const navAsideList = document.querySelectorAll(".nav-aside > li");
  navAsideList.forEach((li) => {
    if (li.classList.contains(navName)) {
      if (!li.classList.contains("nav-aside-selected")) {
        li.classList.add("nav-aside-selected");
      }
    } else {
      if (!li.classList.contains("nav-aside-selected")) {
        li.classList.remove("nav-aside-selected");
      }
    }
  });
}

function handleBtnHome() {
  location.assign("/client/adminIndex.html");
}

function handleBtnPostList() {
  location.assign("/client/postList.html");
}

function handleBtnPostNew() {
  location.assign("/client/postNew.html");
}

function handleBtnProjectList() {
  location.assign("/client/projectList.html");
}

function handleBtnProjectNew() {
  location.assign("/client/projectNew.html");
}

function handleBtnPlan() {
  location.assign("/client/plan.html");
}
function init() {
  btnMainHome.addEventListener("click", handleBtnHome);
  btnAsideHome.addEventListener("click", handleBtnHome);
  btnMainPostList.addEventListener("click", handleBtnPostList);
  btnAsidePostList.addEventListener("click", handleBtnPostList);
  btnAsidePostNew.addEventListener("click", handleBtnPostNew);
  btnMainProjectList.addEventListener("click", handleBtnProjectList);
  btnAsideProjectList.addEventListener("click", handleBtnProjectList);
  btnAsideProjectNew.addEventListener("click", handleBtnProjectNew);
  btnMainPlan.addEventListener("click", handleBtnPlan);
  btnAsidePlan.addEventListener("click", handleBtnPlan);
}
init();
