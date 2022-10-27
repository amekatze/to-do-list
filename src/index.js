import { format, compareAsc } from 'date-fns'
import './style.css';

// Dom
const submitTodo = document.getElementById('submit');
const todoList = document.getElementById('todolist');
const taskInput = document.getElementById('taskinput');
const dateInput = document.getElementById('dateinput');


//Event Listeners
submitTodo.addEventListener('click', addTodo);
todoList.addEventListener('click', actionTodo);


let todoArray = [
    {task:'Make an amazing Todolist', 
    date:'2022-10-20',
    complete: true },
    {task:'Write a bestselling Novel',
    date:'2027-12-01',
    complete: true}
];

const todoTask = (task, date, complete) => {
    todoArray.push({
        task,
        date,
        complete
    })
    return {task, date, complete}
}

todoArray.forEach(todo => createTaskDom(todo.task, todo.date))

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
    todoList.appendChild(todoItem); 
}


//Functions
// Create Todo Item
function addTodo(event){
    event.preventDefault(); //prevent refresh

    todoTask(taskInput.value, dateInput.value, true);
    createTaskDom(taskInput.value, dateInput.value);
    taskInput.value = ''; 
}

// TodoList Actions
function actionTodo(e){
    const item = e.target;
    const action = item.classList[0];
    // Delete Todo
    if( action == 'delete'){
        item.parentElement.remove();
    }

    if( action == 'status'){
        const listItem = item.parentElement;
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


