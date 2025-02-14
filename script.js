ocument.addEventListener("DOMContentLoaded", init); // Correct event for page load

function init() {
    loadTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const tasksInput = document.getElementById("taskInput");
    const task = tasksInput.value.trim();
    if (task === "") return;

    addTaskToDOM(task);
    saveTask(task);
    tasksInput.value = "";
}

function addTaskToDOM(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `${task} <button class="remove-btn">Remove</button>`;

    taskList.appendChild(li);
    li.querySelector(".remove-btn").addEventListener("click", function () {
        removeTask(task, li);
    });
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task, element) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Correct method to stringify the array
    element.remove();
}

// Optional: Allow task addition by pressing Enter
document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});