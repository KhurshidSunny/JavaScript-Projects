const taskInput = document.querySelector("#task-input");
const taskDisplay = document.querySelectorAll(".task");
const checker = document.querySelector(".checker");
const addButton = document.querySelector(".add-button");
const categoryContainer = document.querySelector(".category");

const todoListContainer = document.querySelector(".todo-list");

let catValue;

addButton.addEventListener("click", function () {
  const todoTask = `<div class="task-container">
  <input class="checker-${catValue}"   type="radio" />
  <input class="task" type="text"  value=${taskInput.value} />
  <i class="fas fa-ellipsis-v menu-button"></i>
</div>`;

  todoListContainer.insertAdjacentHTML("afterbegin", todoTask);

  taskInput.value = "";
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
