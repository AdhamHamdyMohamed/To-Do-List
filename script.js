const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const introScreen = document.getElementById("intro-screen");

window.addEventListener("load", function () {
  introScreen.classList.add();

  setTimeout(() => {
    introScreen.classList.add("fade");
    introScreen.style.transition = "opacity 1s ease";
    introScreen.style.opacity = "0";

    setTimeout(() => {
      introScreen.style.display = "none";
    }, 1000);
  }, 2000);
});

function dangerAlert(message) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", "alert-danger", "mt-3");
  alertDiv.setAttribute("role", "alert");
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}

function successAlert(message) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", "alert-success", "mt-3");
  alertDiv.setAttribute("role", "alert");
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    dangerAlert("Please, enter a task!");
    return;
  }

  const item = document.createElement("li");
  item.classList.add(
    "list-group-item",
    "d-flex",
    "align-items-center",
    "bg-light",
    "text-dark",
    "fs-5",
    "fw-semibold",
    "w-75",
    "mx-auto"
  );

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  item.appendChild(taskSpan);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("ms-auto", "d-flex", "gap-2");
  item.appendChild(buttonContainer);

  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("btn", "btn-sm", "btn-outline-secondary");
  buttonEdit.textContent = "Edit";
  buttonEdit.addEventListener("click", function () {
    const newText = prompt("Edit your task:", taskSpan.textContent);
    if (newText !== null && newText.trim() !== "") {
      taskSpan.textContent = newText.trim();
    }
  });

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("btn", "btn-sm", "btn-outline-danger");
  buttonDelete.textContent = "Delete";
  buttonDelete.addEventListener("click", function () {
    taskList.removeChild(item);
  });

  const buttonDone = document.createElement("button");
  buttonDone.classList.add("btn", "btn-sm", "btn-outline-success");
  buttonDone.textContent = "Done";
  buttonDone.addEventListener("click", function () {
    successAlert("Task completed!");
    item.style.transition = "opacity 0.5s";
    item.style.opacity = "0";
    setTimeout(() => taskList.removeChild(item), 500);
  });

  buttonContainer.append(buttonEdit, buttonDelete, buttonDone);

  taskList.appendChild(item);
  taskInput.value = "";
});
