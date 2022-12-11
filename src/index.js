import { format, compareAsc } from "date-fns";
import "./style.css";

// Dom
const submitTodoDom = document.getElementById("submit");
const todoListDom = document.getElementById("todolist");
const taskInputDom = document.getElementById("taskinput");
const dateInputDom = document.getElementById("dateinput");

//Event Listeners
submitTodoDom.addEventListener("click", addTodo);
todoListDom.addEventListener("click", actionTodo);

// Load JSON file
let todos =
  localStorage.length == 0 ? [] : JSON.parse(localStorage.getItem("todos"));

// Todo Factory
const todoTask = (task, date, pending) => {
  todos.push({
    task,
    date,
    pending,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  return { task, date, pending };
};

todos.forEach((todo) => createTaskDom(todo.task, todo.date));

//Functions
// Create Todo Item
function addTodo(event) {
  event.preventDefault(); //prevent refresh

  todoTask(taskInputDom.value, dateInputDom.value, true);
  createTaskDom(taskInputDom.value, dateInputDom.value);
  taskInputDom.value = "";
}

// Create Item in Dom
function createTaskDom(task, date) {
  const todoItem = document.createElement("li");
  const check = document.createElement("button");
  const taskItem = document.createElement("input");
  const taskDate = document.createElement("input");
  const del = document.createElement("button");

  setTodoStatusInDOM(task, todoItem, check);
  check.classList.add("status");
  taskItem.classList.add("task");
  del.classList.add("delete");

  taskItem.type = "text";
  taskItem.readOnly = true;
  taskDate.type = "date";
  del.innerHTML = '<i class="fa-regular fa-trash-can fa-xl"></i>';

  taskItem.value = task;
  taskDate.value = date;

  todoItem.append(check, taskItem, taskDate, del);
  todoListDom.appendChild(todoItem);
}

// TodoList Actions
function actionTodo(e) {
  const item = e.target;
  const action = item.classList[0];
  const listItem = item.parentElement;
  const todoTask = listItem.children[1].value;
  // Delete Todo
  if (action == "delete") {
    removeTodoFromStorage(todoTask);
    item.parentElement.remove();
  }

  if (action == "status") {
    editTodoStatusInStorage(todoTask, "pending");
    setTodoStatusInDOM(todoTask, listItem, item);
  }
}

function removeTodoFromStorage(todoTask) {
  let todoIndex = getIndexFromTodoJSON(todoTask);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editTodoStatusInStorage(todoTask, key) {
  let todoIndex = getIndexFromTodoJSON(todoTask);
  if (todos[todoIndex][key]) {
    todos[todoIndex][key] = false;
  } else todos[todoIndex][key] = true;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function setTodoStatusInDOM(todoTask, todoStatusDOM, checkIcon) {
  let todoIndex = getIndexFromTodoJSON(todoTask);
  if (!todos[todoIndex].pending) {
    todoStatusDOM.classList.add("complete");
    todoStatusDOM.classList.remove("pending");
    checkIcon.innerHTML = '<i class="fa-regular fa-circle-check fa-xl"></i>';
  } else {
    todoStatusDOM.classList.add("pending");
    todoStatusDOM.classList.remove("complete");
    checkIcon.innerHTML = '<i class="fa-regular fa-circle fa-xl"></i>';
  }
  console.log(todoStatusDOM);
}

function getIndexFromTodoJSON(todoTask) {
  return todos.findIndex((todo) => {
    return todo.task == todoTask;
  });
}
