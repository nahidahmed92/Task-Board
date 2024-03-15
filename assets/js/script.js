// DEPENDENCIES (DOM Elements) =======================
const titleInput = $('#task-title');
const dateInput = $('#task-date');
const descInput = $('#task-desc');
const addTaskBtn = $('#submit');
const todoCards = $('#todo-cards');
const inProgCards = $('#in-progress');
const doneCards = $('#done');

// DATA ==============================================
// Retrieve tasks and nextId from localStorage
let taskLists = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = JSON.parse(localStorage.getItem('nextId')) || [];

// FUNCTIONS =========================================
// TODO: create a function to generate a unique task id
function generateTaskId() {
  const taskId = Math.floor(Math.random() * 1000000);
  console.log('taskId: ', taskId);
  return taskId;
}

// TODO: create a function to create a task card
function createTaskCard(taskList) {
  // put in for loop with taskLists.length
  // CREATE & BUILD
  const taskCardEl = $('<div>')
    .addClass('card text-center my-3 draggable sortable') // add text-white here for yellow and red cards
    .attr('task-id', taskList.id);
  const titleEl = $('<h3>').addClass('card-header').text(taskList.taskTitle); // maybe h4 or keep h3 and change size
  const cardBody = $('<div>').addClass('card-body text');
  const descEl = $('<p>').addClass('card-title').text(taskList.desc);
  const dateEl = $('<p>').addClass('card-title').text(taskList.date);
  const deleteBtn = $('<button>')
    .addClass('btn btn-danger')
    .attr('task-id', taskList.id)
    .text('Delete');

  deleteBtn.on('click', handleDeleteTask);
  // over due - red background, white text, white border button
  // due today - yellow background, white, text, button red
  // due future - white background, black text,

  const today = dayjs();
  const taskDate = dayjs(taskList.date, 'MM/DD/YYYY');
  console.log('taskDate: ', taskDate);

  console.log('taskList: ', taskList);

  if (taskList.status !== 'done' && today === taskDate) {
    taskCardEl.addClass('bg-warning text-white');
  } else {
    taskCardEl.addClass('bg-danger text-white');
    deleteBtn.addClass('border-white');
  }

  // PLACE
  todoCards.append(taskCardEl);
  taskCardEl.append(titleEl);
  taskCardEl.append(cardBody);
  cardBody.append(descEl);
  cardBody.append(dateEl);
  cardBody.append(deleteBtn);

  // add a return statement????
  return cardBody;
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList(event) {
  // event.preventDefault();

  let taskLists = JSON.parse(localStorage.getItem('tasks')) || [];

  // Empty cards from lanes
  todoCards.empty();
  inProgCards.empty();
  doneCards.empty();

  // for (let i = 0; i < taskLists.length; i++) {
  //   if (taskLists.status === 'to-do') {
  //     todoCards.append(createTaskCard(taskLists));
  //   } else if (taskLists.status === 'in-progress') {
  //     inProgCards.append(createTaskCard(taskLists));
  //   } else if (taskLists.status === 'done') {
  //     doneCards.append(createTaskCard(taskLists));
  //   }
  // }
  for (let taskList of taskLists) {
    if (taskList.status === 'to-do') {
      todoCards.append(createTaskCard(taskList));
    } else if (taskList.status === 'in-progress') {
      inProgCards.append(createTaskCard(taskList));
    } else if (taskList.status === 'done') {
      doneCards.append(createTaskCard(taskList));
    }
  }
  const title = titleInput.val();
  const date = dateInput.val();
  const desc = descInput.val();

  const newTaskList = {
    id: generateTaskId(),
    taskTitle: title,
    date: date,
    desc: desc,
    status: 'to-do',
  };

  console.log(newTaskList);

  taskLists.push(newTaskList);
  localStorage.setItem('tasks', JSON.stringify(taskLists));

  // Clear form input
  titleInput.val('');
  dateInput.val('');
  descInput.val('');

  // TODO: STILL NEED TO MAKE IT DRAGGABLE
}

// TODO: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  if (!titleInput.val() || !dateInput.val() || !descInput.val()) {
    alert('Please enter all fields for Task Board');
    return renderTaskList();
  } else {
    renderTaskList();
  }
}

// TODO: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(this).attr('task-id');
  const taskLists = JSON.parse(localStorage.getItem('tasks'));

  taskLists.forEach((taskList) => {
    if (taskList.id === taskId) {
      taskLists.splice(taskLists.indexOf(taskList), 1);
    }
  });

  taskLists.push(newTaskList);
  localStorage.setItem('tasks', JSON.stringify(taskLists));
}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// USER INTERACTIONS =================================

// INITIALIZATION ====================================
// TODO: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
addTaskBtn.on('click', handleAddTask);
