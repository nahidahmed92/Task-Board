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

// FUNCTIONS =========================================
function generateTaskId() {
  const uniqueId = Math.floor(Math.random() * 1000000);
  return uniqueId;
}

// function to create a task card
function createTaskCard(taskList) {
  // CREATE & BUILD
  const taskCardEl = $('<div>')
    .addClass('card text-center my-3 draggable droppable sortable')
    .attr('data-task-id', taskList.id);
  const titleEl = $('<h3>').addClass('card-header').text(taskList.taskTitle);
  const cardBody = $('<div>').addClass('card-body text');
  const descEl = $('<p>').addClass('card-title').text(taskList.desc);
  const dateEl = $('<p>').addClass('card-title').text(taskList.date);
  const deleteBtn = $('<button>')
    .addClass('btn btn-danger')
    .attr('data-task-id', taskList.id)
    .text('Delete');

  deleteBtn.on('click', handleDeleteTask);

  const today = dayjs();
  const taskDate = dayjs(taskList.date, 'MM/DD/YYYY');

  // if task status is not done then color
  if (taskList.date && taskList.status !== 'done') {
    // if task is due same due or late then color
    if (today.isSame(taskDate, 'day')) {
      taskCardEl.addClass('bg-warning text-white');
    } else if (today.isAfter(taskDate)) {
      taskCardEl.addClass('bg-danger text-white');
      deleteBtn.addClass('border-white');
    }
  }

  // PLACE
  taskCardEl.append(titleEl);
  taskCardEl.append(cardBody);
  cardBody.append(descEl);
  cardBody.append(dateEl);
  cardBody.append(deleteBtn);

  return taskCardEl;
}

// function to render the task list and make cards draggable
function renderTaskList() {
  const taskLists = JSON.parse(localStorage.getItem('tasks'));

  // Empty cards from lanes
  todoCards.empty();
  inProgCards.empty();
  doneCards.empty();

  for (let taskList of taskLists) {
    if (taskList.status === 'to-do') {
      todoCards.append(createTaskCard(taskList));
    } else if (taskList.status === 'in-progress') {
      inProgCards.append(createTaskCard(taskList));
    } else if (taskList.status === 'done') {
      doneCards.append(createTaskCard(taskList));
    }
  }

  // Use JQuery UI to make task cards draggable... this was taken from the lesson 5 student project
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // creates the clone of the card that is dragged.
    helper: function (e) {
      // Check if the target of the drag event is the card itself or a child element.
      const original = $(e.target).hasClass('.draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // Return the clone with the width set to the width of the original card.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

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

// function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(this).attr('data-task-id');
  const taskLists = JSON.parse(localStorage.getItem('tasks'));
  console.log('button id: ', taskId);

  taskLists.forEach((taskList) => {
    console.log('tasklistID: ', taskList.id);
    if (taskList.id == taskId) {
      console.log('delete button pressed');
      taskLists.splice(taskLists.indexOf(taskList), 1);
    }
  });

  taskLists.push(newTaskList);
  localStorage.setItem('tasks', JSON.stringify(taskLists));
  renderTaskList();
}

// function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskLists = JSON.parse(localStorage.getItem('tasks'));
  const taskIds = ui.draggable[0].dataset.taskId;
  const newStat = event.target.id;

  for (let taskList of taskLists) {
    if (taskList.id == taskIds) {
      taskList.status = newStat;
    }
  }

  localStorage.setItem('tasks', JSON.stringify(taskLists));
  renderTaskList();
}

// USER INTERACTIONS =================================
taskFormEl.on('click', '.btn-delete-task', handleDeleteTask);
addTaskBtn.on('click', handleAddTask);

// INITIALIZATION ====================================
// when the page loads, render the task list and make lanes droppable
$(document).ready(function () {
  renderTaskList();

  $('#task-date').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});
