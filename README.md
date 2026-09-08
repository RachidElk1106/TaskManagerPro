# Task Manager Pro

A task management web application built with **HTML, CSS, and JavaScript**.

This project was built as a practical JavaScript learning project to understand how a real frontend application manages state, user interactions, CRUD operations, data persistence, filtering, sorting, validation, and DOM rendering.

---

## 📌 Project Status

The current version supports:

* Create tasks
* Read and display tasks
* Update tasks
* Delete tasks
* Persist tasks using LocalStorage
* Search tasks by title or description
* Filter by status
* Filter by priority
* Sort tasks
* Empty state when no tasks match the current criteria
* Form validation
* Due-date validation
* Description character counter
* Responsive layout
* Dashboard task statistics
* Event delegation
* Dynamic DOM rendering
* Basic XSS protection for user-generated task content
* Organized JavaScript architecture

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

Tasks are stored in the browser using the LocalStorage API.

The application:

1. Loads saved tasks when the page starts.
2. Keeps the tasks in the application state.
3. Updates the state when a task is created, edited, or deleted.
4. Saves the updated tasks back to LocalStorage.

Example:

```js
function setTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

This allows tasks to remain available after refreshing or reopening the page.

---

### 🔎 Search

Tasks can be searched by:

* Title
* Description

Search results are updated while the user types.

```js
searchInput.addEventListener("input", () => {
    updateTasks();
});
```

---

### 🎯 Filtering

Tasks can be filtered by:

* Status
* Priority

Search and filters can work together.

For example:

```text
Search: JavaScript
Status: In Progress
Priority: High
```

The application displays only tasks matching all active conditions.

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

Sorting behavior is managed using an object mapping:

```js
const sortFunctions = {
    "title-asc": (a, b) =>
        a.title.localeCompare(b.title),

    "title-desc": (a, b) =>
        b.title.localeCompare(a.title)
};
```

The selected sorting function is retrieved dynamically:

```js
const compareFunction = sortFunctions[sortTasks.value];
```

---

### 📝 Form Validation

The task form includes validation for:

* Required title
* Required due date
* Preventing past due dates
* Maximum description length

The description also includes a live character counter.

The current maximum description length is:

```text
500 characters
```

---

### 📭 Empty State

When no tasks match the current search, filters, or sorting criteria, the application displays:

```text
No tasks found.
```

This prevents the task area from appearing empty without explanation.

---

### 🔐 Security

The project originally used `innerHTML` to render user-generated task content.

This was replaced with DOM APIs such as:

```js
document.createElement()
textContent
appendChild()
```

This prevents user-entered task titles and descriptions from being interpreted as HTML.

For example, malicious HTML entered as task content is treated as text instead of being executed.

---

### 📱 Responsive Design

The interface is responsive and adapts to different screen sizes using CSS media queries.

The layout changes for:

* Desktop
* Tablet
* Mobile

The task cards, controls, statistics, and form adapt to smaller screens.

---

## 🧠 JavaScript Concepts Practiced

This project was used to practice:

### JavaScript Fundamentals

* Variables
* `let` and `const`
* Objects
* Arrays
* Functions
* Arrow functions
* Template literals
* Conditional logic
* Guard clauses

### Array Methods

* `forEach()`
* `find()`
* `findIndex()`
* `filter()`
* `sort()`

### DOM

* `getElementById()`
* `querySelector()`
* `createElement()`
* `appendChild()`
* `textContent`
* `classList`
* `dataset`
* `closest()`

### Events

* `addEventListener()`
* `input`
* `change`
* `submit`
* `click`
* Event delegation
* `event.target`
* `event.currentTarget`

### Browser APIs

* LocalStorage API
* DOM API
* `crypto.randomUUID()`

### Data Handling

* `JSON.stringify()`
* `JSON.parse()`
* Date objects

### Application Concepts

* Application state
* CRUD operations
* State-driven rendering
* Filtering
* Searching
* Sorting
* Object mapping
* Form validation
* Error handling in the UI
* Separation between data processing and rendering

---

## 🏗️ Project Structure

```text
TaskManagerPro/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🧩 JavaScript Architecture

The JavaScript code is organized into logical sections:

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

This structure makes the code easier to read, debug, and extend.

---

## 🔄 Application Flow

### General Flow

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

### Search / Filter / Sort Flow

```text
User changes search/filter/sort
            ↓
       updateTasks()
            ↓
     Filter tasks
            ↓
      Sort results
            ↓
  renderTasks(filteredTasks)
            ↓
       Updated UI
```

---

## 📊 State and Rendering

The application keeps the complete task collection in:

```js
let tasks = [];
```

The original `tasks` array represents the application's source of truth.

Search and filtering create a separate array:

```js
const filteredTasks = tasks.filter(...);
```

This allows the application to modify what is displayed without modifying the original task collection.

The rendering responsibility is separated into:

```js
renderTasks()
```

while filtering, searching, and sorting are handled by:

```js
updateTasks()
```

This separation keeps data processing independent from DOM rendering.

---

## 🆔 Task Identification

Every task receives a unique ID:

```js
id: crypto.randomUUID()
```

The ID is used to identify the correct task during:

* Edit
* Delete
* DOM interaction

The task ID is also stored on the corresponding DOM element:

```html
data-task-id="..."
```

and accessed with:

```js
const taskID = taskCard.dataset.taskId;
```

---

## 🖱️ Event Delegation

Instead of adding separate click listeners to every dynamically created Edit and Delete button, the application uses event delegation:

```js
taskList.addEventListener("click", (event) => {
    // Handle task actions
});
```

The application identifies the relevant task card using:

```js
event.target.closest(".task-card");
```

This approach works efficiently with dynamically generated task elements.

---

## 🛠️ Technologies

* HTML5
* CSS3
* JavaScript
* DOM API
* LocalStorage API

No frontend framework is used in this version.

---

## 🎯 Learning Goals

The main purpose of this project was not simply to build a task manager.

The goal was to understand how a real JavaScript frontend application works.

Through this project, I practiced:

* Managing application state
* Creating and manipulating DOM elements
* Handling user events
* Building CRUD functionality
* Persisting data in the browser
* Searching and filtering data
* Sorting data
* Validating user input
* Separating rendering from data processing
* Using event delegation
* Thinking about application architecture
* Identifying and addressing basic security issues
* Using Git and GitHub to manage the project

---

## 📈 Next Step

The Vanilla JavaScript version of the project is now complete.

The next stage of the learning journey is to rebuild the Task Manager using **React**.

The React version will be used to understand:

* Components
* JSX
* Props
* State
* Event handling
* Rendering lists
* Forms
* `useState`
* `useEffect`
* Component-based architecture

The goal is not simply to rewrite the same application, but to understand **what React solves and why component-based UI architecture is useful**.

---

## 👨‍💻 Project Purpose

This project is part of a practical web development learning journey.

Instead of learning JavaScript only through isolated exercises, concepts were introduced and applied directly inside a real application.

The project represents the transition from learning individual JavaScript concepts to building a structured frontend application.
