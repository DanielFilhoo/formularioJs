const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const filterInput = document.querySelector('#filter-input');

// Carregar tarefas do local storage quando a página é carregada
document.addEventListener('DOMContentLoaded', getTasks);

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete');
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function addTask(e) {
    e.preventDefault();

    if (taskInput.value.trim()) {
        const li = document.createElement('li');
        li.textContent = taskInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete');
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        // Armazenar a tarefa no local storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    } else {
        alert('Por favor, digite uma tarefa');
    }
}

function deleteTask(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
            e.target.parentElement.remove();
            // Remover a tarefa do local storage
            removeTaskFromLocalStorage(e.target.parentElement.textContent);
        }
    }
}

taskList.addEventListener('click', deleteTask);
form.addEventListener('submit', addTask);

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskText.slice(0, -1) === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('#task-list li').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

filterInput.addEventListener('keyup', filterTasks);
