# Task Manager Pro

A simple task management web application built with **HTML, CSS, and JavaScript**.

The project focuses on practicing JavaScript fundamentals through a real-world CRUD application.

---

## 📌 Project Status

The application currently supports:

* Create tasks
* Read and display tasks
* Update tasks
* Delete tasks
* Persist tasks using LocalStorage
* Search tasks
* Filter by status
* Filter by priority
* Sort tasks
* Display an empty state when no tasks match the current filters
* Organized JavaScript code into logical sections

---

## 🚀 Features

### Task Management

Users can:

* Create a new task
* Edit an existing task
* Delete a task
* View all saved tasks

Each task contains:

```js
{
    id,
    createdAt,
    title,
    description,
    dueDate,
    priority,
    status
}
```

---

### 💾 LocalStorage

Tasks are stored in the browser using the **LocalStorage API**.

The application:

1. Loads saved tasks when the page starts.
2. Updates the `tasks` array when a task changes.
3. Saves the updated data back to LocalStorage.

Example:

```js
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

This allows tasks to remain available after refreshing or reopening the page.

---

### 🔎 Search

Tasks can be searched by:

* Title
* Description

The search is performed while the user types.

```js
searchInput.addEventListener('input', () => {
    updateTasks();
});
```

---

### 🎯 Filtering

Tasks can be filtered by:

* Status
* Priority

The filters can also work together with the search system.

For example:

```text
Search: JavaScript
Status: In Progress
Priority: High
```

The application displays only tasks matching all selected conditions.

---

### ↕️ Sorting

Tasks can be sorted by:

* Newest
* Oldest
* Title A-Z
* Title Z-A
* Priority ascending
* Priority descending
* Due date

Sorting behavior is organized using **Object Mapping**.

```js
const sortFunctions = {
    "title-asc": (a, b) =>
        a.title.localeCompare(b.title),

    "title-desc": (a, b) =>
        b.title.localeCompare(a.title)
};
```

The selected sorting method is retrieved dynamically:

```js
const compareFunction = sortFunctions[sortTasks.value];
```

---

### 📭 Empty State

When no tasks match the current search or filters, the application displays:

```text
No tasks found.
```

This prevents the interface from appearing empty without explanation.

---

## 🧠 JavaScript Concepts Practiced

This project has been used to practice several important JavaScript concepts:

* Variables and state
* Objects
* Arrays
* Array methods
* `find()`
* `findIndex()`
* `filter()`
* `sort()`
* Functions
* Arrow functions
* DOM manipulation
* `createElement()`
* `appendChild()`
* `innerHTML`
* `addEventListener()`
* Event delegation
* `dataset`
* Template literals
* LocalStorage
* JSON
* `crypto.randomUUID()`
* Date objects
* Object mapping
* Guard clauses
* CRUD logic

---

## 🏗️ Project Structure

```text
Task-Manager/
│
├── index.html
├── style.css
├── script.js
│
└── README.md
```

---

## 🧩 JavaScript Architecture

The JavaScript code is organized into the following sections:

```text
1. State
2. DOM References
3. LocalStorage
4. Render
5. Task CRUD
6. Form
7. Filtering & Search
8. Sorting
9. Event Listeners
```

This organization makes the code easier to read, debug, and extend.

---

## 🔄 Application Flow

The general flow of the application is:

```text
User Action
     ↓
Event Listener
     ↓
Update State
     ↓
Save to LocalStorage
     ↓
Render Tasks
     ↓
Updated UI
```

For search and filtering:

```text
User changes search/filter
          ↓
      updateTasks()
          ↓
      Filter tasks
          ↓
      Sort tasks
          ↓
      Render results
```

---

## 📊 Current CRUD Flow

### Create

```text
Fill form
   ↓
Submit
   ↓
Create task object
   ↓
tasks.push()
   ↓
saveTasks()
   ↓
renderTasks()
```

### Read

```text
Load LocalStorage
      ↓
Parse JSON
      ↓
tasks array
      ↓
renderTasks()
      ↓
Display tasks
```

### Update

```text
Click Edit
   ↓
Find task by ID
   ↓
Fill form
   ↓
Submit
   ↓
Update task
   ↓
saveTasks()
   ↓
renderTasks()
```

### Delete

```text
Click Delete
   ↓
Find task by ID
   ↓
Remove task
   ↓
saveTasks()
   ↓
renderTasks()
```

---

## 🆔 Task Identification

Each task receives a unique ID using:

```js
id: crypto.randomUUID()
```

The ID is used to identify the correct task during:

* Edit
* Delete
* DOM interaction

Example:

```js
const taskID = taskCard.dataset.taskId;
```

---

## 🔍 Filtering Logic

The application combines multiple conditions:

```text
Search
  AND
Status
  AND
Priority
```

A task is displayed only when it satisfies all active conditions.

---

## 🛠️ Technologies

* HTML5
* CSS3
* JavaScript
* DOM API
* LocalStorage API

No frontend framework is currently used.

---

## 🎯 Learning Goals

The main goal of this project is not only to build a task manager, but to understand how a real JavaScript application works.

The project is helping develop skills in:

* Managing application state
* Manipulating the DOM
* Handling user events
* Working with browser storage
* Building CRUD functionality
* Filtering and sorting data
* Organizing JavaScript code
* Thinking about application flow

---

## 🔮 Planned Improvements

Possible next improvements:

* Form validation
* Better status and priority UI
* Delete confirmation
* Improved empty states
* Better date handling
* Accessibility improvements
* Security improvements
* Dashboard statistics
* More advanced state management

---

## 👨‍💻 Project Purpose

This project is part of a practical JavaScript learning journey.

Instead of learning JavaScript only through isolated exercises, concepts are introduced and applied directly inside a real project.

**Current focus:** strengthening JavaScript fundamentals through practical development.
