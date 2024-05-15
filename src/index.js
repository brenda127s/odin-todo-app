import Todo from './Todo.js';
import Project from './Project.js';
import { getTodos } from './todos.js';
import { getProjects } from './projects.js';
import './sideBlock.js';
import { saveProjects, loadProjects } from './storage.js';

let projects = getProjects();
loadProjects();

const todos = getTodos();

const container = document.querySelector(".container");
const todoContainer = document.getElementById('todo-container');

export function generateAllToDo() {
    todoContainer.textContent = "";
    generateOptionHeader("All Tasks");
    projects.forEach(project => {
        project.todos.forEach(todo => {
            const todoItem = displayToDo(todo);
            todoContainer.appendChild(todoItem);
        });
    });
}

function displayToDo(todo, index) {
    const listItem = document.createElement('div');
    listItem.classList.add('todo-item');

    const title = document.createElement('h2');
    title.textContent = todo.title;

    const description = document.createElement('p');
    description.textContent = todo.description;

    const dueDate = document.createElement('div');
    dueDate.textContent = todo.dueDate;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Task";
    deleteButton.classList.add("task-button");
    deleteButton.addEventListener('click', () => {

        todos.splice(index, 1);
        todoContainer.removeChild(listItem);
        saveProjects();
    })

    listItem.appendChild(title);
    listItem.appendChild(description);
    listItem.appendChild(dueDate);
    listItem.appendChild(deleteButton);

    return listItem;
}



function generateOptionHeader(titleString) {
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('todo-header');
    const header = document.createElement('h1');
    header.textContent = titleString;
    headerDiv.appendChild(header);
    todoContainer.appendChild(headerDiv);
}

let isTaskFormOpen = false;

export function updateToDoContent(project) {
    todoContainer.textContent = '';
    generateOptionHeader(project.name);
    project.todos.forEach(todo => {
        const todoItem = displayToDo(todo);
        todoContainer.appendChild(todoItem);
    });
    addToDoButton(project);
}


function addToDoButton(project) {
    const addButton = document.createElement('button');
    addButton.textContent = "Add Task";
    addButton.classList.add("task-button");
    addButton.addEventListener("click", () => {
        if (!isTaskFormOpen) {
            isTaskFormOpen = true;
            saveProjects();
            generateNewTaskForm(project);
        }
    });
    todoContainer.appendChild(addButton);
}
function generateNewTaskForm(selectedProject) {
    const taskForm = document.createElement("div");
    taskForm.classList.add('todo-form');

    const title = document.createElement('input');
    title.placeholder = 'Title';
    const description = document.createElement('textarea');
    description.placeholder = 'Description';
    const dueDate = document.createElement("input");
    dueDate.type = 'date';

    const addButton = document.createElement('button');
    addButton.textContent = "Add New To Do";
    addButton.classList.add("button-small");
    addButton.addEventListener("click", () => {
        const newToDo = new Todo(
            title.value,
            description.value,
            dueDate.value,
            false
        );
        selectedProject.todos.push(newToDo);
        saveProjects();
        updateToDoContent(selectedProject);
        isTaskFormOpen = false;
        todoContainer.removeChild(taskForm);
    });

    taskForm.appendChild(title);
    taskForm.appendChild(description);
    taskForm.appendChild(dueDate);
    taskForm.appendChild(addButton);

    todoContainer.appendChild(taskForm);
}
