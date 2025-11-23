 document.addEventListener('DOMContentLoaded', function() {
            // Get DOM elements
            const taskInput = document.getElementById('taskInput');
            const addBtn = document.getElementById('addBtn');
            const taskList = document.getElementById('taskList');
            const totalTasksSpan = document.getElementById('totalTasks');
            const completedTasksSpan = document.getElementById('completedTasks');
            
            // Initialize tasks array
            let tasks = [];
            
            // Add event listener to the Add button
            addBtn.addEventListener('click', addTask);
            
            // Also allow adding tasks with Enter key
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            
            // Function to add a new task
            function addTask() {
                const taskText = taskInput.value.trim();
                
                if (taskText === '') {
                    alert('Please enter a task!');
                    return;
                }
                
                // Create task object
                const task = {
                    id: Date.now(),
                    text: taskText,
                    completed: false
                };
                
                // Add to tasks array
                tasks.push(task);
                
                // Clear input
                taskInput.value = '';
                
                // Render tasks
                renderTasks();
            }
            
            // Function to render all tasks
            function renderTasks() {
                // Clear the task list
                taskList.innerHTML = '';
                
                if (tasks.length === 0) {
                    // Show empty state
                    const emptyState = document.createElement('div');
                    emptyState.className = 'empty-state';
                    emptyState.innerHTML = '<p>No tasks yet. Add a task to get started!</p>';
                    taskList.appendChild(emptyState);
                } else {
                    // Create list items for each task
                    tasks.forEach(task => {
                        const taskItem = document.createElement('li');
                        taskItem.className = 'task-item';
                        if (task.completed) {
                            taskItem.classList.add('completed');
                        }
                        
                        taskItem.innerHTML = `
                            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                            <span class="task-text">${task.text}</span>
                            <button class="delete-btn">Delete</button>
                        `;
                        
                        taskList.appendChild(taskItem);
                        
                        // Add event listeners to the checkbox and delete button
                        const checkbox = taskItem.querySelector('.task-checkbox');
                        const deleteBtn = taskItem.querySelector('.delete-btn');
                        
                        checkbox.addEventListener('change', function() {
                            toggleTaskCompletion(task.id);
                        });
                        
                        deleteBtn.addEventListener('click', function() {
                            deleteTask(task.id);
                        });
                    });
                }
                
                // Update stats
                updateStats();
            }
            
            // Function to toggle task completion
            function toggleTaskCompletion(taskId) {
                tasks = tasks.map(task => {
                    if (task.id === taskId) {
                        return { ...task, completed: !task.completed };
                    }
                    return task;
                });
                
                renderTasks();
            }
            
            // Function to delete a task
            function deleteTask(taskId) {
                tasks = tasks.filter(task => task.id !== taskId);
                renderTasks();
            }
            
            // Function to update task statistics
            function updateStats() {
                const totalTasks = tasks.length;
                const completedTasks = tasks.filter(task => task.completed).length;
                
                totalTasksSpan.textContent = `Total: ${totalTasks}`;
                completedTasksSpan.textContent = `Completed: ${completedTasks}`;
            }
            
            // Initialize with some example tasks
            tasks = [
                { id: 1, text: 'Learn JavaScript', completed: true },
                { id: 2, text: 'Build a to-do app', completed: true },
                { id: 3, text: 'Style with CSS', completed: false }
            ];
            
            // Render initial tasks
            renderTasks();
        });
