var tasks = [];
var dt = new Date();

const newTask = document.getElementById("new_task");
const taskInput = document.getElementById("task_input");
const taskList = document.getElementById("task_list");
const progressBar = document.getElementById("progress");
const progressNumbers = document.getElementById("numbers");
const date = document.getElementById("datetime");

date.innerHTML = dt.toLocaleString();

document.addEventListener("DOMContentLoaded", () => {
  var storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  var text = taskInput.value.trim();

  if (text) {
    tasks.push({
      text: text,
      done: false,
      id: crypto.randomUUID(),
    });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTask();
    // console.log(tasks);
  }
}

function updateTaskList() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    var taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <div class="taskItem">
      <div class="task ${task.done ? "done" : ""}">
      <input type="checkbox" class="checkbox" ${task.done ? "checked" : ""}>
      <p>${task.text}</p>
      </div>
      <div class="icons">
      <img src="./img/edit.png" alt="edit" onClick="editTask(${index})">
      <img src="./img/bin.png" alt="bin" onClick="deleteTask(${index})">
      </div>
      </div>
        `;

    taskItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(taskItem);

    // console.log(taskList);
  });
}
function updateStats() {
  var completedTask = tasks.filter((task) => task.done).length;
  var totalTask = tasks.length;
  var progress = (completedTask / totalTask) * 100;
  progressBar.style.width = `${progress}%`;

  progressNumbers.innerHTML = `${completedTask} / ${totalTask}`;

  if (tasks.length && completedTask === totalTask) {
    blastEffect();
  }
}
function toggleTaskComplete(index) {
  tasks[index].done = !tasks[index].done;
  updateTaskList();
  updateStats();
  saveTask();
}

function editTask(index) {
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
}

newTask.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

function blastEffect() {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

