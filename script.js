// 1.States & Initialize Variables

let tasks = []


// Variable to keep track of the task being edited
let editingTaskID = null;


const maxDescriptionLength = 500;


// ====================
// 2. DOM References
// ====================

// Get references to the add task button
const addTaskButton = document.getElementById('add-task-btn');

// Get references to the task form and its input fields
const taskFormSection = document.getElementById('task-form-section');
const taskForm = document.getElementById('task-form');
const taskFormTitle = document.getElementById('task-title');
const taskFormDescription = document.getElementById('task-description');
const taskFormStatus = document.getElementById('task-status');
const taskFormPriority = document.getElementById('task-priority');
const taskFormDueDate = document.getElementById('task-due-date');
const cancelTaskBtn = document.getElementById('cancel-task-btn')

// Create a small element for displaying title error messages
const titleError = document.createElement('small');
titleError.classList.add('form-error');

taskFormTitle.after(titleError);

// Create a small element for displaying description error messages
const descriptionError = document.createElement('small');
descriptionError.classList.add('form-error');
taskFormDescription.after(descriptionError);
// Create a small element for displaying description character count
const descriptionCounter = document.createElement('small');
descriptionCounter.classList.add('description-counter');
descriptionCounter.textContent = `0/${maxDescriptionLength} characters`;
taskFormDescription.after(descriptionCounter);

// Create a small element for displaying due date error messages
const dueDateError = document.createElement('small');
dueDateError.classList.add('form-error');
taskFormDueDate.after(dueDateError);

// Get references to the filter and search elements
const searchInput = document.getElementById("search-input");
const priorityFilter = document.getElementById("priority-filter");
const filterStatus = document.getElementById("status-filter");
const sortTasks = document.querySelector('#sort-tasks');

// Get reference to the task list container
const taskList = document.getElementById('task-list');


// ====================
// 3. LocalStorage
// ====================

// Retrieve tasks from local storage if they exist
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}
// Save tasks to local storage whenever they are updated
function setTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ====================
// 4. Render
// ====================
function renderTasks(tasksArray = tasks) {
    taskList.innerHTML = ''
    tasksArray.forEach(task => {
        
        const taskCard = document.createElement("article");
        taskCard.classList.add('task-card')
        taskCard.dataset.taskId = task.id;
        taskCard.dataset.status = String(task.status);
        taskCard.dataset.priority = String(task.priority);

        const  taskCardHeader = document.createElement("div");
        taskCardHeader.classList.add('task-card__header');
        taskCard.appendChild(taskCardHeader);

        const taskMeta = document.createElement("div");
        taskMeta.classList.add('task-card__meta');
        taskCard.appendChild(taskMeta);

        const taskContent = document.createElement("div");
        taskContent.classList.add('task-card__content');
        taskCardHeader.appendChild(taskContent);

        const taskActions = document.createElement("div");
        taskActions.classList.add('task-card__actions');
        taskCardHeader.appendChild(taskActions);

        const taskTitle = document.createElement("h3")
        taskTitle.textContent = task.title;
        taskTitle.classList.add("task-title");
        taskContent.appendChild(taskTitle);

        const taskDescription = document.createElement("p")
        taskDescription.textContent = task.description;
        taskContent.appendChild(taskDescription);

        const editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.classList.add('btn', 'btn-primary', 'edit-task-btn')
        taskActions.appendChild(editButton)

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.classList.add('btn', 'btn-danger', 'delete-task-btn')
        taskActions.appendChild(deleteButton)

        const taskStatus = document.createElement("p")
        taskStatus.textContent = task.status;
        taskStatus.classList.add(
            "status-badge",
            `status-${task.status}`
        );
        taskMeta.appendChild(taskStatus);

        const taskPriority = document.createElement("p")
        taskPriority.textContent = task.priority;
        taskPriority.classList.add(
            "priority-badge",
            `priority-${task.priority}`
        );
        taskMeta.appendChild(taskPriority);

        const taskDueDate = document.createElement("time");
        taskDueDate.textContent = task.dueDate;
        taskDueDate.setAttribute("datetime", task.dueDate);
        taskMeta.appendChild(taskDueDate);
       
        taskList.appendChild(taskCard)
    })
}
renderTasks(tasks);


// ====================
// 5. Task CRUD
// ====================

taskList.addEventListener('click', (event) => {
    const taskCard = event.target.closest('.task-card')
    if (!taskCard) return;
    
    const taskID = taskCard.dataset.taskId

    //Edit Button
   if(event.target.matches(".edit-task-btn")) {
        errorEmpty();
        taskFormSection.classList.remove('is-hidden')
        taskFormTitle.focus();
        const taskFind = tasks.find(task => task.id === taskID);
        if (!taskFind) return;
        editingTaskID = taskID;
        taskFormTitle.value = taskFind.title;
         taskFormDescription.value = taskFind.description;
         taskFormDueDate.value = taskFind.dueDate;
         taskFormPriority.value = taskFind.priority;
         taskFormStatus.value = taskFind.status;
   }
    //Delete Button
   if(event.target.matches(".delete-task-btn")) {
        const taskIndex = tasks.findIndex(task => task.id === taskID)
        
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1)
            setTasksToLocalStorage();
        }
        renderTasks()
   }

})


// ====================
// 6. Form
// ====================


// Add Task Button
addTaskButton.addEventListener('click', () => {
    editingTaskID = null;
    errorEmpty();
    resetTaskForm();
    taskFormSection.classList.remove('is-hidden')
    taskFormTitle.focus();
})

// Save Task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!validateTaskForm()) {
        return;
    }    

    if(editingTaskID !== null) {
        const taskFind = tasks.find(task => task.id === editingTaskID);
        if (!taskFind) return;
        taskFind.title = taskFormTitle.value;
        taskFind.description = taskFormDescription.value;
        taskFind.dueDate = taskFormDueDate.value;
        taskFind.priority = taskFormPriority.value;
        taskFind.status = taskFormStatus.value;
        setTasksToLocalStorage();
        editingTaskID = null;
        }
    else {
    const newTask = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        title: taskFormTitle.value,
        description: taskFormDescription.value,
        dueDate: taskFormDueDate.value,
        priority: taskFormPriority.value,
        status: taskFormStatus.value,
    }
    tasks.push(newTask);
    setTasksToLocalStorage();
}

    renderTasks();
    resetTaskForm();
    taskFormSection.classList.add('is-hidden');
})

//Form Helpers
function resetTaskForm(){
    taskFormTitle.value = "";
    taskFormDescription.value = "";
    taskFormDueDate.value = "";
    taskFormPriority.value = "medium";
    taskFormStatus.value = "todo";
    descriptionCounter.textContent = `0/${maxDescriptionLength} characters`;
    descriptionCounter.classList.remove('is-invalid');
}

function errorEmpty() {
    titleError.textContent = "";
    dueDateError.textContent = "";
    descriptionError.textContent = "";
}

//Validation function for the task form

function validateTaskForm() {
    if(taskFormTitle.value.trim() === ""){
        titleError.textContent = "Title is required.";
        return false;
    }
  
    const dueDateValue = taskFormDueDate.value;

     if (dueDateValue === "") {
        dueDateError.textContent = "Due date is required.";
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dueDateValue);
    if (dueDate < today) {
        dueDateError.textContent = "Due date cannot be in the past.";
        return false;
    }

    const descriptionValue = taskFormDescription.value.trim();
    if (descriptionValue.length > maxDescriptionLength) {
        descriptionError.textContent = `Description cannot exceed ${maxDescriptionLength} characters.`;
        return false;
    }

    return true;
}

// Cancel Task Button
cancelTaskBtn.addEventListener('click', () => {
    editingTaskID = null;
    taskFormSection.classList.add('is-hidden');
    resetTaskForm();
})


// ====================
// 7. Filtering & Search
// ====================

function updateTasks() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const statusValue = filterStatus.value;
    const priorityValue = priorityFilter.value;

    // Filter tasks based on search, status, and priority
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = 
            task.title.toLowerCase().includes(searchValue) ||
            task.description.toLowerCase().includes(searchValue);

        const matchesStatus =
         statusValue === "all" ||
        task.status === statusValue;

        const matchesPriority =
         priorityValue === "all" ||
        task.priority === priorityValue;

        return matchesSearch &&
         matchesStatus && 
         matchesPriority;
    });

    // Sort filtered tasks
    const compareFunction = sortFunctions[sortTasks.value];
    if (compareFunction) {
        filteredTasks.sort(compareFunction);
    }

    if(filteredTasks.length === 0) {
        taskList.innerHTML = '<p>No tasks found.</p>';
        return;
    }
    renderTasks(filteredTasks);
}


// ====================
// 8. Sorting
// ====================


const priorityOrder = { "high": 1,
             "medium": 2,
              "low": 3 };

// Sorting
const sortFunctions = {
    "due-date": (a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate),

    "title-asc": (a, b) =>
        a.title.localeCompare(b.title),

    "title-desc": (a, b) =>
        b.title.localeCompare(a.title),

    "newest": (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt),

    "oldest": (a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt),

    "priority-asc": (a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority],

    "priority-desc": (a, b) =>
        priorityOrder[b.priority] - priorityOrder[a.priority]
};


// ====================
// 9. Event Listeners
// ====================

// Search
searchInput.addEventListener('input', () => {
    updateTasks();
});

// Status Filter
filterStatus.addEventListener('change', () => {
    updateTasks();
});

// priority Filter
priorityFilter.addEventListener('change', () => {
    updateTasks(); 
});

//Sort Filter
sortTasks.addEventListener("change", () => {
     updateTasks();
});

taskFormTitle.addEventListener('input', () => {
    titleError.textContent = "";
});

taskFormDueDate.addEventListener('input', () => {
    dueDateError.textContent = "";
})

taskFormDescription.addEventListener('input', () => {
    descriptionError.textContent = "";
    descriptionCounter.textContent =
     `${taskFormDescription.value.length}/${maxDescriptionLength} characters`;


    if(taskFormDescription.value.length > maxDescriptionLength) {
        descriptionCounter.classList.add('is-invalid');
    } else {
        descriptionCounter.classList.remove('is-invalid');
    }
});
