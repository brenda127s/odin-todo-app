import { getProjects } from './projects.js';
import { updateToDoContent, generateAllToDo } from './index.js';
import { saveProjects } from './storage.js';

const projects = getProjects();
const sideBlock = document.getElementById('side-block');
const projectsContainer = document.getElementById('projects-container');
const addProjectButton = document.getElementById('add-project');
const sideBlockOption = document.querySelectorAll(".projects .project-option");
const allTasksDiv = document.getElementById("all-tasks");

let selectedOption = allTasksDiv;
let selectedProject = null;

let isProjectFormOpen = false;

addProjectButton.addEventListener("click", () => {
    if (!isProjectFormOpen) {
        isProjectFormOpen = true;
        saveProjects();
        generateNewProjectForm();
    }
});

function generateNewProjectForm() {
    const projectForm = document.createElement('div');
    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Enter Project Name';
    const confirmProjectButton = document.createElement('button');
    confirmProjectButton.textContent = 'Confirm';
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';

    projectForm.appendChild(titleInput);
    projectForm.appendChild(confirmProjectButton);
    projectForm.appendChild(cancelButton);

    projectsContainer.appendChild(projectForm);

    confirmProjectButton.addEventListener("click", () => {
        const title = titleInput.value;
        saveProjects();
        generateProject(title);
        projectsContainer.removeChild(projectForm);
        isProjectFormOpen = false;
    });

    cancelButton.addEventListener("click", () => {
        saveProjects();
        projectsContainer.removeChild(projectForm);
        isProjectFormOpen = false;
    });
}

function generateProject(title) {
    const newProject = {
        name: title,
        todos: []
    };
    projects.push(newProject);
    const newProjectIndex = projects.length - 1;
    updateProjects(newProject, newProjectIndex, title);
}

export function updateProjects(proj, index, title) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const titleElement = document.createElement('p');
    titleElement.textContent = title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    const renameButton = document.createElement('button');
    renameButton.textContent = 'Rename';

    projectDiv.appendChild(titleElement);
    projectDiv.appendChild(deleteButton);
    projectDiv.appendChild(renameButton);

    deleteButton.addEventListener("click", () => {
        projects.splice(index, 1);
        projectsContainer.removeChild(projectDiv);
        saveProjects();
        if (selectedOption === projectDiv) {
            selectOption(allTasksDiv);
        }
    });

    renameButton.addEventListener("click", () => {
        const newTitle = prompt('Enter a new name for this project:');
        proj.name = newTitle;
        titleElement.textContent = newTitle;
        saveProjects();
    });

    projectDiv.addEventListener("click", () => {
        selectedOption = projectDiv;
        selectedProject = proj;
        handleSelectedOption(selectedOption);
        saveProjects();
    });

    projectsContainer.appendChild(projectDiv);
}

function handleSelectedOption(selectedOption) {
    switch(selectedOption.id) {
        case "all-tasks":
            generateAllToDo();
            break;
        default: 
            if (selectedOption.classList.contains("project")) {
                updateToDoContent(selectedProject);
            } else {
                console.log("Error something has gone wrong with selectedOption");
            }
            break;
    }
}

function selectOption(nextSelectedOption) {
    const selectedOptions = document.querySelectorAll(".projects .project-option-selected");
    if (selectedOptions.length === 0) {
        allTasksDiv.classList.add("project-option-selected");
    } else {
        selectedOptions.forEach(option => {
            option.classList.remove("project-option-selected");
        });
        nextSelectedOption.classList.add("project-option-selected");
    }
}

function addEventListenerSideblockOption() {
    sideBlockOption.forEach(option => {
        option.addEventListener("click", () => {
            saveProjects();
            selectedOption = option;
            selectOption(option);
            handleSelectedOption(selectedOption);
        });
    });
}

addEventListenerSideblockOption();