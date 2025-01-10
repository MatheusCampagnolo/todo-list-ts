interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const tasks: Task[] = [];

const taskTitleInput = document.getElementById(
  "task-title"
) as HTMLInputElement;
const taskDescInput = document.getElementById(
  "task-desc"
) as HTMLTextAreaElement;
const addTaskButton = document.getElementById(
  "add-task-btn"
) as HTMLButtonElement;

const pendingTasksContainer = document.getElementById(
  "pending-tasks"
) as HTMLUListElement;

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.push(...JSON.parse(storedTasks));
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  pendingTasksContainer.innerHTML = "";
  const completedTasksContainer = document.getElementById(
    "completed-tasks"
  ) as HTMLUListElement;
  completedTasksContainer.innerHTML = "";

  tasks
    .filter((task) => !task.completed)
    .forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
      <div class="task-content">
        <strong>${task.title}</strong>
        <p class="task-description">${task.description}</p>
      </div>
      <div class="task-actions">
        <button class="expand-desc-btn">⬇</button>
        <button class="edit-task-btn">✏</button>
        <button class="mark-complete-btn">✔</button>
        <button class="remove-task-btn">❌</button>
      </div>
    `;

      taskItem
        .querySelector(".expand-desc-btn")
        ?.addEventListener("click", () => toggleDescription(taskItem));
      taskItem
        .querySelector(".edit-task-btn")
        ?.addEventListener("click", () => editTask(task.id));
      taskItem
        .querySelector(".mark-complete-btn")
        ?.addEventListener("click", () => markAsComplete(task.id));
      taskItem
        .querySelector(".remove-task-btn")
        ?.addEventListener("click", () => removeTask(task.id));

      pendingTasksContainer.appendChild(taskItem);
    });

  tasks
    .filter((task) => task.completed)
    .forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
      <div class="task-content">
        <strong>${task.title}</strong>
        <p class="task-description">${task.description}</p>
      </div>
      <div class="task-actions">
        <button class="expand-desc-btn">⬇</button>
        <button class="mark-pending-btn">⏪</button>
        <button class="remove-task-btn">❌</button>
      </div>
    `;

      taskItem
        .querySelector(".expand-desc-btn")
        ?.addEventListener("click", () => toggleDescription(taskItem));
      taskItem
        .querySelector(".mark-pending-btn")
        ?.addEventListener("click", () => markAsPending(task.id));
      taskItem
        .querySelector(".remove-task-btn")
        ?.addEventListener("click", () => removeTask(task.id));

      completedTasksContainer.appendChild(taskItem);
    });
}

function toggleDescription(taskItem: HTMLElement) {
  const isExpanded = taskItem.classList.contains("expanded");

  if (isExpanded) {
    taskItem.classList.remove("expanded");
  } else {
    taskItem.classList.add("expanded");
  }
}

function editTask(taskId: number) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  const newTitle = prompt("Edit Task Title:", task.title);
  const newDescription = prompt("Edit Task Description:", task.description);

  if (newTitle !== null) task.title = newTitle;
  if (newDescription !== null) task.description = newDescription;

  renderTasks();
}

function addTask() {
  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  const newTask: Task = {
    id: Date.now(),
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);

  taskTitleInput.value = "";
  taskDescInput.value = "";

  saveTasksToLocalStorage();
  renderTasks();
}

function markAsComplete(taskId: number) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = true;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function markAsPending(taskId: number) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = false;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function removeTask(taskId: number) {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addTaskButton.addEventListener("click", addTask);

  loadTasksFromLocalStorage();
  renderTasks();
});
