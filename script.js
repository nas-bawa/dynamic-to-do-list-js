// script.js

// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper: Get tasks from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Helper: Save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Step 3: Create the addTask Function (with optional save flag)
    function addTask(taskText, save = true) {
        // If called from user input, validate and trim
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Step 4: Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Step 5: Task Creation and Removal
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign onclick event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            // Update Local Storage
            const tasks = getStoredTasks().filter(t => t !== taskText);
            saveTasks(tasks);
        };

        // Append remove button to li
        li.appendChild(removeButton);

        // Append li to task list
        taskList.appendChild(li);

        // Clear the input field (for user-triggered adds)
        taskInput.value = "";

        // Save to Local Storage if required
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }
    }

    // Step 6: Code for Loading Tasks from Local Storage
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false)); // do not re-save while loading
    }

    // Step 7: Attach Event Listeners
    addButton.addEventListener('click', function() {
        addTask(); // uses current input value
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // uses current input value
        }
    });

    // Step 8: Invoke loadTasks on DOMContentLoaded
    loadTasks();
});
