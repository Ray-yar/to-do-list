const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = { text: taskText, completed: false };

        // Save the task to local storage
        saveTask(task);

        // Add the task to the DOM
        addTaskToDOM(task);

        // Clear the input field
        taskInput.value = '';
    }
}

// Function to save a task to local storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="edit-btn" onclick="editTask('${task.text}')">Edit</button>
        <button class="delete-btn" onclick="deleteTask('${task.text}')">Delete</button>
    `;

    // Toggle completed class on click
    li.addEventListener('click', function () {
        task.completed = !task.completed;
        saveTasksToLocalStorage();
        li.classList.toggle('completed');
    });

    // Add the task to the task list
    taskList.appendChild(li);
}

// Function to delete a task
function deleteTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Remove the task from the DOM
    const taskElements = document.querySelectorAll('li');

    taskElements.forEach(taskElement => {
        if (taskElement.textContent.includes(taskText)) {
            taskElement.remove();
        }
    });
}

// Function to edit a task
function editTask(taskText) {
    const newTaskText = prompt('Edit task:', taskText);

    if (newTaskText !== null) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(task => {
            if (task.text === taskText) {
                task.text = newTaskText;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        // Update the task in the DOM
        const taskElements = document.querySelectorAll('li');

        taskElements.forEach(taskElement => {
            if (taskElement.textContent.includes(taskText)) {
                taskElement.querySelector('span').textContent = newTaskText;
            }
        });
    }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('li')).map(li => {
        return {
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed'),
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
