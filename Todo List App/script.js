const taskInput = document.querySelector("#task-input");
const taskDisplay = document.querySelectorAll(".task");
const checker = document.querySelector(".checker");
const addButton = document.querySelector(".add-button");
const categoryContainer = document.querySelector(".category");

const todoListContainer = document.querySelector(".todo-list");
const menuBox = document.querySelector(".menu-box");

let catValue;
let taskNo = 0;
let allTasks = -1;

addButton.addEventListener("click", function () {
  if (!taskInput.value) return;
  const todoTask = `<div class="task-container" data-task-no="${taskNo}">
  <div class="filled-${catValue} circle-task" data-task="${taskNo}"></div>
  <input data-desc="${taskNo}" class="task" type="text"  value="${taskInput.value}" />
  <i class="fas fa-ellipsis-v menu-button" data-button="${taskNo}"></i>
  <div class="menu-box hide" >
            <button class="delete-button" data-task="${taskNo}">Delete</button>
            <button class="edit-button">Edit</button>
          </div>
</div>`;

  todoListContainer.insertAdjacentHTML("beforeend", todoTask);

  taskInput.value = "";
  taskNo++;
  allTasks++;
});

// show menu button box

todoListContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("menu-button")) {
    const { button } = e.target.dataset;

    // Get the position of the clicked button
    const buttonRect = e.target.getBoundingClientRect();
    // console.log(buttonRect);

    // Position the menu box to the clicked button next
    // menuBox.style.top = `${buttonRect.top}px`;
    // menuBox.style.left = `${buttonRect.right}px`;

    menuBox.classList.toggle("display-menu-box");
  }
});

// delete a task

menuBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-button")) {
    let curData;
    const taskToDelete = document.querySelectorAll(".task-container");
    // delete the selected element
    taskToDelete[allTasks].remove();
    // also hide the menu box
    menuBox.classList.remove("display-menu-box");
    allTasks--;
  }
});

todoListContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("circle-task")) {
    const { task } = e.target.dataset;
    e.target.classList.toggle(`uncheck-task-${catValue}`);
    console.log(task);

    document
      .querySelectorAll(".task")
      [task].classList.toggle("line-through-desc");
  }
});

// selecting the category
categoryContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("cat-circle")) {
    const { cat } = e.target.dataset;
    catValue = cat;

    document.querySelectorAll(".cat-circle").forEach(function (catEl) {
      catEl.classList.remove(`filled-business`);
      catEl.classList.remove("filled-personal");
    });

    e.target.classList.add(`filled-${cat}`);
  }
});
