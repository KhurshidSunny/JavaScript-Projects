const taskInput = document.querySelector("#task-input");
const taskDisplay = document.querySelectorAll(".task");
const checker = document.querySelector(".checker");
const addButton = document.querySelector(".add-button");
const categoryContainer = document.querySelector(".category");

const todoListContainer = document.querySelector(".todo-list");
const menuBox = document.querySelector(".menu-box");
const usernameInput = document.querySelector("#username-input");
const clearButton = document.querySelector("#clear-button");

let catValue;
let taskNo = 0;
let curTask = -1;
let numOftTasks = -1;
const taskArr = [];

const allTasks = JSON.parse(localStorage.getItem("taskArr"));
// create task function
const addTask = function (taskInput, catValue) {
  if (taskInput && catValue) {
    const todoTask = `<div class="task-container" data-task-no="${taskNo}">
    <div class="filled-${catValue} circle-task" data-task="${taskNo}"></div>
    <input data-desc="${taskNo}" class="task" type="text"  value="${taskInput}" />
    <i class="fas fa-ellipsis-v menu-button" data-button="${taskNo}"></i>
    <div class="menu-box hide"" >
              <button class="delete-button" >Delete</button>
              <button class="edit-button" >Edit</button>
            </div>
  </div>`;
    todoListContainer.insertAdjacentHTML("beforeend", todoTask);
  }

  const newTask = { cat: catValue, desc: taskInput };
  taskArr.push(newTask);

  // setting up the current number of tasks and all the tasks in local storage
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
  localStorage.setItem("curTask", curTask.toString());

  curTask++;
  numOftTasks++;
  taskNo++;
};

// Menu button handler
const menuHandler = function (e) {
  if (e.target.classList.contains("menu-button")) {
    const { button } = e.target.dataset;

    // Get the position of the clicked button
    const buttonRect = e.target.getBoundingClientRect();

    // console.log(buttonRect);

    // Position the menu box to the clicked button next
    // menuBox.style.top = `${buttonRect.top - 270}px`;
    // menuBox.style.left = `${buttonRect.right - 290}px`;
    // console.log(buttonRect);

    menuBox.classList.toggle("display-menu-box");
  }
};

// Edit and delete handlers
const editDeleteHanlders = function (e) {
  if (e.target.classList.contains("delete-button")) {
    const taskToDelete = document.querySelectorAll(".task-container");
    // delete the selected element
    taskToDelete[curTask].remove();
    // also hide the menu box
    menuBox.classList.remove("display-menu-box");
    curTask--;
  }
  if (e.target.classList.contains("edit-button")) {
    // selecting all the inputs
    const allInputs = document.querySelectorAll(".task");
    const el = e.target.closest(".menu-box");

    allInputs[curTask].focus();
    menuBox.classList.remove("display-menu-box");
  }
};

const checkOrUnCheckTask = function (e) {
  if (e.target.classList.contains("circle-task")) {
    const { task } = e.target.dataset;
    e.target.classList.toggle(`uncheck-task-${catValue}`);

    document
      .querySelectorAll(".task")
      [task].classList.toggle("line-through-desc");
  }
};

const chooseCategory = function (e) {
  if (e.target.classList.contains("cat-circle")) {
    const { cat } = e.target.dataset;
    catValue = cat;

    document.querySelectorAll(".cat-circle").forEach(function (catEl) {
      catEl.classList.remove(`filled-business`);
      catEl.classList.remove("filled-personal");
    });

    e.target.classList.add(`filled-${cat}`);
  }
};

// storing the current number of of tasks number in the local storage
const curTaskLocalStr = parseInt(localStorage.getItem("curTask")) || -1;

// gettting username from local storage
const savedUsername = localStorage.getItem("username");
if (savedUsername) {
  usernameInput.value = savedUsername;
}

// storing username in localstorage
usernameInput.addEventListener("input", function () {
  const enteredUsername = usernameInput.value.trim();

  // set the name to local storage
  localStorage.setItem("username", enteredUsername);
});

// Recreating the tasks elements when reload the page with its data
if (allTasks) {
  allTasks.forEach((task, i) => {
    addTask(task.desc, task.cat);
  });
}

// clearing all the local storage
clearButton.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Event handlers

addButton.addEventListener("click", function () {
  addTask(taskInput.value, catValue);
  taskInput.value = "";
});

todoListContainer.addEventListener("click", menuHandler);

menuBox.addEventListener("click", editDeleteHanlders);

todoListContainer.addEventListener("click", checkOrUnCheckTask);

categoryContainer.addEventListener("click", chooseCategory);
