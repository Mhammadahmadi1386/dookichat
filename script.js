document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // بارگذاری وظایف از Local Storage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'حذف';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        li.appendChild(deleteBtn);
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('حذف', '').trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'حذف';
            deleteBtn.addEventListener('click', () => {
                li.remove();
                saveTasks();
            });
            li.appendChild(deleteBtn);
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });
            taskList.appendChild(li);
        });
    }
});
