// DEPENDENCIES (DOM Elements) =======================
const titleInput = $('#task-title');
const dateInput = $('#task-date');
const descInput = $('#task-desc');
const addTaskBtn = $('#submit');
const taskFormEl = $('#task-form');
const todoCards = $('#todo-cards');
const inProgCards = $('#in-progress-cards');
const doneCards = $('#done-cards');

let newTaskList = {};

// DATA ==============================================
let taskLists = JSON.parse(localStorage.getItem('tasks')) || [];
if (!taskLists) {
  console.log('taskList is empty');
}

// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Todo: create a function to create a task card
function createTaskCard(task) {}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// handles adding tasks and then rendering on page
function handleAddTask(event) {
  if (!titleInput.val() || !dateInput.val() || !descInput.val()) {
    console.log('no information');
    return alert('Please enter all fields for Task Board');
  }

  const title = titleInput.val().trim();
  const date = dateInput.val();
  const desc = descInput.val();

  const newTaskList = {
    id: generateTaskId(),
    taskTitle: title,
    date: date,
    desc: desc,
    status: 'to-do',
  };

  const taskLists = JSON.parse(localStorage.getItem('tasks')) || [];
  taskLists.push(newTaskList);
  localStorage.setItem('tasks', JSON.stringify(taskLists));
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
