const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector(".add-button");
const catCircleBusiness = document.querySelector(".cat1-circle");
const catCirclePersonal = document.querySelector(".cat2-circle");

addButton.addEventListener("click", function () {
  console.log(taskInput.value);
});

catCircleBusiness.addEventListener("click", function () {
  catCircleBusiness.style.backgroundColor = `rgb(235, 21, 168)`;
});
