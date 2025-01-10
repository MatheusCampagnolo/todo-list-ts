"use strict";
const tasks = [];
const taskTitleInput = document.getElementById("task-title");
const taskDescInput = document.getElementById("task-desc");
const addTaskButton = document.getElementById("add-task-btn");
const pendingTasksContainer = document.getElementById("pending-tasks");
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
    const completedTasksContainer = document.getElementById("completed-tasks");
    completedTasksContainer.innerHTML = "";
    tasks
        .filter((task) => !task.completed)
        .forEach((task) => {
        var _a, _b, _c, _d;
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
        (_a = taskItem
            .querySelector(".expand-desc-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => toggleDescription(taskItem));
        (_b = taskItem
            .querySelector(".edit-task-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => editTask(task.id));
        (_c = taskItem
            .querySelector(".mark-complete-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => markAsComplete(task.id));
        (_d = taskItem
            .querySelector(".remove-task-btn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => removeTask(task.id));
        pendingTasksContainer.appendChild(taskItem);
    });
    tasks
        .filter((task) => task.completed)
        .forEach((task) => {
        var _a, _b, _c;
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
        (_a = taskItem
            .querySelector(".expand-desc-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => toggleDescription(taskItem));
        (_b = taskItem
            .querySelector(".mark-pending-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => markAsPending(task.id));
        (_c = taskItem
            .querySelector(".remove-task-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => removeTask(task.id));
        completedTasksContainer.appendChild(taskItem);
    });
}
function toggleDescription(taskItem) {
    const isExpanded = taskItem.classList.contains("expanded");
    if (isExpanded) {
        taskItem.classList.remove("expanded");
    }
    else {
        taskItem.classList.add("expanded");
    }
}
function editTask(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task)
        return;
    const newTitle = prompt("Edit Task Title:", task.title);
    const newDescription = prompt("Edit Task Description:", task.description);
    if (newTitle !== null)
        task.title = newTitle;
    if (newDescription !== null)
        task.description = newDescription;
    renderTasks();
}
function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    if (!title) {
        alert("Task title is required!");
        return;
    }
    const newTask = {
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
function markAsComplete(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        task.completed = true;
        saveTasksToLocalStorage();
        renderTasks();
    }
}
function markAsPending(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        task.completed = false;
        saveTasksToLocalStorage();
        renderTasks();
    }
}
function removeTask(taskId) {
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
