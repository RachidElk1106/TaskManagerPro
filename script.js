//========================
// 1. Initialize Variables
let tasks = []

// Variable to keep track of the task being edited
let editingTaskID = null;







// ====================
// 2. DOM References
// ====================

// Get references to the add task button
const addTaskButton = document.getElementById('add-task-btn');

// Get references to the task form and its input fields
const taskformSection = document.getElementById('task-form-section');
const taskForm = document.getElementById('task-form');
const taskFormTitle = document.getElementById('task-title');
const taskFormDescription = document.getElementById('task-description');
const taskFormStatus = document.getElementById('task-status');
const taskFormPriority = document.getElementById('task-priority');
const taskFormDueDate = document.getElementById('task-due-date');

// Get references to the filter and search elements

const cancelTaskBtn = document.getElementById('cancel-task-btn')
const searchInput = document.getElementById("search-input");
const priorityFilter = document.getElementById("priority-filter");
const filterStatus = document.getElementById("status-filter");
const sortTasks = document.querySelector('#sort-tasks');

// Get reference to the task list container
const taskList = document.getElementById('task-list')




// ====================
// 3. LocalStorage
// ====================

// Retrieve tasks from local storage if they exist
const savedTasks = localStorage.getItem("tasks");


if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}


function setTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}




// ====================
// 4. Render
// ====================
function renderTasks(tasksArray = tasks) {
    taskList.innerHTML = ''
    tasksArray.forEach(task => {
        
        const newDiv = document.createElement("article");
        newDiv.classList.add('task-card')
        newDiv.setAttribute('data-task-id', task.id)
        newDiv.setAttribute('data-status', task.status)
        newDiv.setAttribute('data-priority', task.priority)
        newDiv.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <p>Status: ${task.status}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <button class="btn btn-primary edit-task-btn">Edit</button>
            <button class="btn btn-danger delete-task-btn">Delete</button>
        `
        taskList.appendChild(newDiv)
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

    //Delete Button
   if(event.target.matches(".delete-task-btn")) {
        //const taskId = taskCard.getAttribute('data-task-id')
        console.log(`Delete button clicked for task with ID: ${taskID}`)
        //remove the task from the tasks array
        const taskIndex = tasks.findIndex(task => task.id === taskID)
        
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1)
            setTasksToLocalStorage();
        }
        renderTasks()
   }
   //Edit Button
   if(event.target.matches(".edit-task-btn")) {
        taskformSection.classList.remove('is-hidden')
        const taskFind = tasks.find(task => task.id === taskID);
        editingTaskID = taskID;
        taskFormTitle.value = taskFind.title;
         taskFormDescription.value = taskFind.description;
         taskFormDueDate.value = taskFind.dueDate;
         taskFormPriority.value = taskFind.priority;
         taskFormStatus.value = taskFind.status;
   }
})


// ====================
// 6. Form
// ====================


// Add Task Button
addTaskButton.addEventListener('click', () => {
    editingTaskID = null;
    fieldsEmpty();
    taskformSection.classList.remove('is-hidden')
})

// Save Task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(editingTaskID !== null) {
        const taskFind = tasks.find(task => task.id === editingTaskID);
        if(taskFind === undefined) {
            console.log(`Task with ID: ${editingTaskID} not found`)
            return
        }
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
    fieldsEmpty();
    taskformSection.classList.add('is-hidden');
    
})

function fieldsEmpty(){
    taskFormTitle.value = "";
    taskFormDescription.value = "";
    taskFormDueDate.value = "";
    taskFormPriority.value = "";
    taskFormStatus.value = "";
}

// Cancel Task Button
cancelTaskBtn.addEventListener('click', () => {
    taskformSection.classList.add('is-hidden');
    fieldsEmpty();
})


// ====================
// 7. Filtering & Search
// ====================

function updateTasks() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const statusValue = filterStatus.value;
    const priorityValue = priorityFilter.value;

    // Filter tasks based on search, status, and priority
    let filteredTasks = tasks.filter(task => {
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
