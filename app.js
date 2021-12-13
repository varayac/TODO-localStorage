// Capture Elements
const alert = document.getElementById("alert");
const form = document.getElementById("todoForm");
const todoPrint = document.getElementById("todoPrint");
const todoTemplate = document.getElementById("todoTemplate").content;
const fragment = new DocumentFragment();

let todoArray = [];

const addTask = (task) => {
  const objectTodo = {
    name: task,
    id: `${Date.now()}`,
  };

  todoArray.push(objectTodo);
};

const printTask = () => {
  localStorage.setItem("todoKey", JSON.stringify(todoArray));
  todoPrint.textContent = "";

  todoArray.forEach((item) => {
    const clone = todoTemplate.cloneNode(true);
    clone.querySelector(".lead").textContent = item.name;
    clone.querySelector(".btn-danger").dataset.id = item.id;
    fragment.append(clone);
  });

  todoPrint.append(fragment);
};

document.addEventListener("click", (e) => {
  //console.log(e.target.dataset.id);
  //console.log(e.target.matches(".btn-danger"));

  if (e.target.matches(".btn-danger")) {
    todoArray = todoArray.filter((item) => item.id !== e.target.dataset.id);
    printTask();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");

  const data = new FormData(form);
  const [taskInput] = [...data.values()];

  if (!taskInput.trim()) {
    alert.classList.remove("d-none");
    return;
  }

  addTask(taskInput);
  printTask();
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todoKey")) {
    todoArray = JSON.parse(localStorage.getItem("todoKey"));
    printTask();
  }
});
