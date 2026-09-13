/* =========================================
   TASKFLOW — SaaS TASK MANAGER
   ========================================= */

const STORAGE_KEYS = {
  user: "taskflowUser",
  tasks: "taskflowTasks"
};


/* =========================================
   APPLICATION STATE
   ========================================= */

let currentUser = JSON.parse(
  localStorage.getItem(STORAGE_KEYS.user)
) || null;

let tasks = JSON.parse(
  localStorage.getItem(STORAGE_KEYS.tasks)
) || [];

let editingTaskId = null;


/* =========================================
   DOM ELEMENTS
   ========================================= */

const authScreen = document.querySelector("#auth-screen");
const appScreen = document.querySelector("#app-screen");

const loginForm = document.querySelector("#login-form");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const authMessage = document.querySelector("#auth-message");

const logoutBtn = document.querySelector("#logout-btn");
const userEmail = document.querySelector("#user-email");

const totalTasks = document.querySelector("#total-tasks");
const pendingTasks = document.querySelector("#pending-tasks");
const progressTasks = document.querySelector("#progress-tasks");
const completedTasks = document.querySelector("#completed-tasks");

const addTaskBtn = document.querySelector("#add-task-btn");
const emptyAddBtn = document.querySelector("#empty-add-btn");

const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const priorityFilter = document.querySelector("#priority-filter");

const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

const taskModal = document.querySelector("#task-modal");
const closeModalBtn = document.querySelector("#close-modal");
const cancelTaskBtn = document.querySelector("#cancel-task");

const taskForm = document.querySelector("#task-form");
const taskIdInput = document.querySelector("#task-id");
const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const taskStatus = document.querySelector("#task-status");
const taskPriority = document.querySelector("#task-priority");
const taskDate = document.querySelector("#task-date");

const modalTitle = document.querySelector("#modal-title");


/* =========================================
   INITIALIZE APPLICATION
   ========================================= */

function initializeApp() {

  if (currentUser) {
    showApp();
  } else {
    showAuth();
  }

}


/* =========================================
   AUTHENTICATION SIMULATION
   ========================================= */

loginForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!email || !password) {
    authMessage.textContent =
      "Please enter your email and password.";
    return;
  }

  if (!email.includes("@")) {
    authMessage.textContent =
      "Please enter a valid email address.";
    return;
  }

  currentUser = {
    email: email
  };

  localStorage.setItem(
    STORAGE_KEYS.user,
    JSON.stringify(currentUser)
  );

  authMessage.textContent = "";

  showApp();

});


function showAuth() {

  authScreen.classList.remove("hidden");
  appScreen.classList.add("hidden");

}


function showApp() {

  authScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");

  userEmail.textContent = currentUser.email;

  updateAvatar();
  renderTasks();
  updateStats();

}


function updateAvatar() {

  const avatar = document.querySelector(".avatar");

  if (!avatar || !currentUser) {
    return;
  }

  avatar.textContent =
    currentUser.email.charAt(0).toUpperCase();

}


logoutBtn.addEventListener("click", function () {

  currentUser = null;

  localStorage.removeItem(STORAGE_KEYS.user);

  showAuth();

  loginForm.reset();

});


/* =========================================
   TASK MODAL
   ========================================= */

addTaskBtn.addEventListener("click", function () {

  openCreateModal();

});


emptyAddBtn.addEventListener("click", function () {

  openCreateModal();

});


closeModalBtn.addEventListener("click", function () {

  closeModal();

});


cancelTaskBtn.addEventListener("click", function () {

  closeModal();

});


taskModal.addEventListener("click", function (event) {

  if (event.target === taskModal) {
    closeModal();
  }

});


function openCreateModal() {

  editingTaskId = null;

  modalTitle.textContent = "Create New Task";

  taskForm.reset();

  taskIdInput.value = "";

  taskStatus.value = "pending";
  taskPriority.value = "medium";

  taskModal.classList.remove("hidden");

  taskTitle.focus();

}


function openEditModal(task) {

  editingTaskId = task.id;

  modalTitle.textContent = "Edit Task";

  taskIdInput.value = task.id;

  taskTitle.value = task.title;
  taskDescription.value = task.description;
  taskStatus.value = task.status;
  taskPriority.value = task.priority;
  taskDate.value = task.dueDate || "";

  taskModal.classList.remove("hidden");

  taskTitle.focus();

}


function closeModal() {

  taskModal.classList.add("hidden");

  editingTaskId = null;

  taskForm.reset();

}


/* =========================================
   CREATE / UPDATE TASK
   ========================================= */

taskForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const title = taskTitle.value.trim();

  if (!title) {
    return;
  }

  if (editingTaskId !== null) {

    updateTask(editingTaskId);

  } else {

    createTask();

  }

});


function createTask() {

  const newTask = {

    id: Date.now(),

    title: taskTitle.value.trim(),

    description:
      taskDescription.value.trim(),

    status:
      taskStatus.value,

    priority:
      taskPriority.value,

    dueDate:
      taskDate.value,

    createdAt:
      new Date().toISOString()

  };

  tasks.unshift(newTask);

  saveTasks();

  closeModal();

  renderTasks();

  updateStats();

}


function updateTask(id) {

  const task = tasks.find(
    (item) => item.id === id
  );

  if (!task) {
    return;
  }

  task.title = taskTitle.value.trim();

  task.description =
    taskDescription.value.trim();

  task.status =
    taskStatus.value;

  task.priority =
    taskPriority.value;

  task.dueDate =
    taskDate.value;

  saveTasks();

  closeModal();

  renderTasks();

  updateStats();

}


/* =========================================
   DELETE TASK
   ========================================= */

function deleteTask(id) {

  const confirmed = confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) {
    return;
  }

  tasks = tasks.filter(
    (task) => task.id !== id
  );

  saveTasks();

  renderTasks();

  updateStats();

}


/* =========================================
   COMPLETE TASK
   ========================================= */

function toggleTaskStatus(id) {

  const task = tasks.find(
    (item) => item.id === id
  );

  if (!task) {
    return;
  }

  if (task.status === "completed") {

    task.status = "pending";

  } else {

    task.status = "completed";

  }

  saveTasks();

  renderTasks();

  updateStats();

}


/* =========================================
   SEARCH & FILTER
   ========================================= */

searchInput.addEventListener(
  "input",
  renderTasks
);

statusFilter.addEventListener(
  "change",
  renderTasks
);

priorityFilter.addEventListener(
  "change",
  renderTasks
);


function getFilteredTasks() {

  const searchTerm =
    searchInput.value
      .trim()
      .toLowerCase();

  const selectedStatus =
    statusFilter.value;

  const selectedPriority =
    priorityFilter.value;

  return tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchTerm) ||
      task.description
        .toLowerCase()
        .includes(searchTerm);

    const matchesStatus =
      selectedStatus === "all" ||
      task.status === selectedStatus;

    const matchesPriority =
      selectedPriority === "all" ||
      task.priority === selectedPriority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );

  });

}


/* =========================================
   RENDER TASKS
   ========================================= */

function renderTasks() {

  const filteredTasks =
    getFilteredTasks();

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {

    emptyState.classList.remove("hidden");

    return;

  }

  emptyState.classList.add("hidden");

  filteredTasks.forEach((task) => {

    const card =
      createTaskCard(task);

    taskList.appendChild(card);

  });

}


function createTaskCard(task) {

  const article =
    document.createElement("article");

  article.className = "task-card";

  const checkbox =
    document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.className = "task-check";

  checkbox.checked =
    task.status === "completed";

  checkbox.setAttribute(
    "aria-label",
    "Mark task as completed"
  );

  checkbox.addEventListener(
    "change",
    function () {
      toggleTaskStatus(task.id);
    }
  );


  const info =
    document.createElement("div");

  info.className = "task-info";


  const title =
    document.createElement("h3");

  title.className = "task-title";

  title.textContent =
    task.title;


  const description =
    document.createElement("p");

  description.className =
    "task-description";

  description.textContent =
    task.description ||
    "No description provided.";


  const meta =
    document.createElement("div");

  meta.className =
    "task-meta";


  const statusBadge =
    document.createElement("span");

  statusBadge.className =
    `task-badge badge-${task.status}`;

  statusBadge.textContent =
    formatStatus(task.status);


  const priorityBadge =
    document.createElement("span");

  priorityBadge.className =
    `task-badge badge-${task.priority}`;

  priorityBadge.textContent =
    `${capitalize(task.priority)} Priority`;


  if (task.dueDate) {

    const dateBadge =
      document.createElement("span");

    dateBadge.className =
      "task-badge";

    dateBadge.textContent =
      `Due: ${formatDate(task.dueDate)}`;

    meta.appendChild(dateBadge);

  }


  meta.appendChild(statusBadge);
  meta.appendChild(priorityBadge);


  info.appendChild(title);
  info.appendChild(description);
  info.appendChild(meta);


  const actions =
    document.createElement("div");

  actions.className =
    "task-actions";


  const editButton =
    document.createElement("button");

  editButton.type = "button";

  editButton.className =
    "task-action";

  editButton.textContent =
    "Edit";

  editButton.addEventListener(
    "click",
    function () {
      openEditModal(task);
    }
  );


  const deleteButton =
    document.createElement("button");

  deleteButton.type = "button";

  deleteButton.className =
    "task-action delete";

  deleteButton.textContent =
    "Delete";

  deleteButton.addEventListener(
    "click",
    function () {
      deleteTask(task.id);
    }
  );


  actions.appendChild(editButton);
  actions.appendChild(deleteButton);


  article.appendChild(checkbox);
  article.appendChild(info);
  article.appendChild(actions);


  return article;

}


/* =========================================
   DASHBOARD STATISTICS
   ========================================= */

function updateStats() {

  const total =
    tasks.length;

  const pending =
    tasks.filter(
      (task) => task.status === "pending"
    ).length;

  const progress =
    tasks.filter(
      (task) => task.status === "progress"
    ).length;

  const completed =
    tasks.filter(
      (task) => task.status === "completed"
    ).length;

  totalTasks.textContent =
    total;

  pendingTasks.textContent =
    pending;

  progressTasks.textContent =
    progress;

  completedTasks.textContent =
    completed;

}


/* =========================================
   LOCAL STORAGE
   ========================================= */

function saveTasks() {

  localStorage.setItem(
    STORAGE_KEYS.tasks,
    JSON.stringify(tasks)
  );

}


/* =========================================
   UTILITY FUNCTIONS
   ========================================= */

function capitalize(value) {

  return value.charAt(0).toUpperCase() +
    value.slice(1);

}


function formatStatus(status) {

  const labels = {

    pending: "Pending",

    progress: "In Progress",

    completed: "Completed"

  };

  return labels[status] ||
    capitalize(status);

}


function formatDate(dateString) {

  const date =
    new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );

}


/* =========================================
   START APPLICATION
   ========================================= */

initializeApp();
