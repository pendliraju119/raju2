document.addEventListener('DOMContentLoaded', () => {
    // Get references to the DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyListMessage = document.getElementById('emptyListMessage');

    // Function to update the visibility of the "empty list" message
    function updateEmptyMessage() {
        if (taskList.children.length === 0) {
            emptyListMessage.style.display = 'block';
        } else {
            emptyListMessage.style.display = 'none';
        }
    }

    // Function to create a new task list item
    function createTaskElement(taskText) {
        // Create list item
        const li = document.createElement('li');

        // Create span for the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        // Add event listener to toggle completion on click
        taskSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
            // Optional: You could also move completed tasks to the bottom or add persistence here
        });

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn'; // Use className for easier styling/selection
        // Add event listener to remove the task
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            updateEmptyMessage(); // Update message after removing
            // Optional: Add persistence logic here (e.g., remove from localStorage)
        });

        // Append span and button to the list item
        li.appendChild(taskSpan);
        li.appendChild(removeBtn);

        return li;
    }

    // Function to add a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input value and remove leading/trailing spaces

        if (taskText === '') {
            alert('Please enter a task!'); // Basic validation
            return; // Stop the function if input is empty
        }

        // Create the new task element
        const newTask = createTaskElement(taskText);

        // Add the new task to the list
        taskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = '';

        // Set focus back to input for easy adding of next task
        taskInput.focus();

        // Hide the empty message if it was showing
        updateEmptyMessage();

        // Optional: Add persistence logic here (e.g., save to localStorage)
    }

    // --- Event Listeners ---

    // Add task when the button is clicked
    addTaskBtn.addEventListener('click', addTask);

    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', (event) => {
        // Check if the key pressed was 'Enter'
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // --- Initial Setup ---
    // Check if list is initially empty when the page loads
    updateEmptyMessage();

    // Optional: Load tasks from localStorage if implementing persistence
    // loadTasksFromStorage();
});