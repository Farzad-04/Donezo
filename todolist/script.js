const taskList = document.getElementById('task-list');
const addTaskInput = document.getElementById('add-task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskPriority = document.getElementById('task-priority');
const dueDate = document.getElementById('due-date');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function sortTasksByPriority() {
    // Sort tasks: high > medium > low
    tasks.sort((a, b) => {
        const priorities = {'high': 3, 'medium': 2, 'low': 1};
        return priorities[b.priority] - priorities[a.priority];
    });
}

function renderTasks() {
    sortTasksByPriority(); // Sort tasks before rendering
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const taskText = document.createElement('div');
        taskText.className = `task-text ${task.completed ? 'completed' : ''} priority-${task.priority}`;
        taskText.innerHTML = `${task.text} ${task.dueDate ? `<span class="due-date">Due: ${task.dueDate}</span>` : ''}`;

const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete';
deleteButton.addEventListener('click', () => {
    tasks = tasks.filter(t => t !== task);
    saveTasks();
    renderTasks();
});

const completeButton = document.createElement('button');
completeButton.innerText = 'Complete';
completeButton.addEventListener('click', () => {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    if (task.completed) {
        alert('Good work!'); // Pop-up message for completing a task
    }
});

taskItem.appendChild(taskText);
taskItem.appendChild(deleteButton);
taskItem.appendChild(completeButton);
taskList.appendChild(taskItem);
});
}

addTaskButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting which refreshes the page
    const taskText = addTaskInput.value.trim();
    const taskPriorityValue = taskPriority.value;
    const taskDueDate = dueDate.value;

    if (!taskText) {
        alert('Please enter a task description.');
        return;
    }

    if (!taskDueDate) {
        alert('Please enter a due date.');
        return;
    }

    // Check if the due date is in the past
    const dueDateObj = new Date(taskDueDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize currentDate to start of the day for comparison

    if (dueDateObj < currentDate) {
        alert('Please enter a date that is in the present or future.');
        return;
    }

    // Add the task if the due date is valid (present or future)
    tasks.push({
        text: taskText,
        completed: false,
        priority: taskPriorityValue,
        dueDate: taskDueDate
    });

    addTaskInput.value = '';
    dueDate.value = '';
    saveTasks();
    renderTasks();
});

renderTasks();