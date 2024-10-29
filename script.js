document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

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
        deleteBtn.addEventListener('click', () => li.remove());
        li.appendChild(deleteBtn);
        li.addEventListener('click', () => li.classList.toggle('completed'));
        taskList.appendChild(li);
    }
});
