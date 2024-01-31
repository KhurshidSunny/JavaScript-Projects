const taskInput = document.querySelector("#task-input");
const taskDisplay = document.querySelectorAll(".task");
const checker = document.querySelector(".checker");
const addButton = document.querySelector(".add-button");
const categoryContainer = document.querySelector(".category");

const todoListContainer = document.querySelector(".todo-list");

let catValue;
let taskNo = 0;
addButton.addEventListener("click", function () {
  const todoTask = `<div class="task-container">
  <div class="filled-${catValue} circle-task" data-task="${taskNo}"></div>
  <input data-desc="${taskNo}" class="task" type="text"  value="${taskInput.value}" />
  <i class="fas fa-ellipsis-v menu-button"></i>
</div>`;

  todoListContainer.insertAdjacentHTML("beforeend", todoTask);

  taskInput.value = "";
  taskNo++;
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
