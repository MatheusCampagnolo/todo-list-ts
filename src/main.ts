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

function renderTasks() {
  pendingTasksContainer.innerHTML = ""; // Limpa a lista antes de renderizar novamente

  tasks
    .filter((task) => !task.completed)
    .forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
          <div>
            <strong>${task.title}</strong>
            <p>${task.description}</p>
          </div>
        `;
      pendingTasksContainer.appendChild(taskItem);
    });
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

  renderTasks();
}

addTaskButton.addEventListener("click", addTask);