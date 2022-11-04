import { format, compareAsc } from 'date-fns'
import './style.css';

// Dom
const submitTodoDom = document.getElementById('submit');
const todoListDom = document.getElementById('todolist');
const taskInputDom = document.getElementById('taskinput');
const dateInputDom = document.getElementById('dateinput');


//Event Listeners
submitTodoDom.addEventListener('click', addTodo);
todoListDom.addEventListener('click', actionTodo);


let todos = localStorage.length == 0 ? [] : JSON.parse(localStorage.getItem("todos"));

const todoTask = (task, date, complete) => {
    todos.push({
        task,
        date,
        complete
    })
    localStorage.setItem("todos", JSON.stringify(todos));
    return {task, date, complete}
}

todos.forEach(todo => createTaskDom(todo.task, todo.date))

//Functions
// Create Todo Item
function addTodo(event){
    event.preventDefault(); //prevent refresh

    todoTask(taskInputDom.value, dateInputDom.value, true);
    createTaskDom(taskInputDom.value, dateInputDom.value);
    taskInputDom.value = ''; 
}

// Create Item in Dom
function createTaskDom(task, date){
    const todoItem = document.createElement('li');
    const check = document.createElement('button');
    const taskItem = document.createElement('input');
    const taskDate = document.createElement('input');
    const del = document.createElement('button');
    
    todoItem.classList.add('pending');
    check.classList.add('status');
    taskItem.classList.add('task');
    del.classList.add('delete');

    taskItem.type = "text";
    taskItem.readOnly = true;
    taskDate.type = "date";
    check.innerHTML = '<i class="fa-regular fa-circle fa-xl"></i>';
    del.innerHTML = '<i class="fa-regular fa-trash-can fa-xl"></i>';

    taskItem.value = task;
    taskDate.value = date;

    todoItem.append(check,taskItem,taskDate,del);
    todoListDom.appendChild(todoItem); 
}

// TodoList Actions
function actionTodo(e){
    const item = e.target;
    const action = item.classList[0];
    const listItem = item.parentElement;
    const todoTask = listItem.children[1].value;
    // Delete Todo
    if( action == 'delete'){
        removeTodoFromStorage(todoTask);
        item.parentElement.remove();
    }

    if( action == 'status'){
        if (listItem.classList[0] == 'pending'){
            listItem.classList.remove('pending');
            listItem.classList.add('complete');
            item.innerHTML = '<i class="fa-regular fa-circle-check fa-xl"></i>';
        } else {
            listItem.classList.remove('complete');
            listItem.classList.add('pending');
            item.innerHTML = '<i class="fa-regular fa-circle fa-xl"></i>';
        }
    }

}

function removeTodoFromStorage(todoTask){
    const todoIndex = todos.findIndex(todo => {
        return todo.task == todoTask;
    })
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


