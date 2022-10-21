import { format, compareAsc } from 'date-fns'
import './style.css';

// Dom
const submitTodo = document.getElementById('submit')
const todoList = document.getElementById('to-do-list')
const inputTodo = document.getElementById('input-todo');

//Event Listeners

submitTodo.addEventListener('click', addTodo);
todoList.addEventListener('click', actionTodo)


//Functions
// Create Todo Item
function addTodo(event){
    event.preventDefault(); //prevent refresh

    const li = document.createElement('li');
    // Check Button 
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check');
    checkBtn.classList.add('material-symbols-outlined')
    checkBtn.innerText = 'check_box_outline_blank'
    li.appendChild(checkBtn);
    // Todo Item
    const todoItem = document.createElement('input');
    todoItem.type = 'text';
    todoItem.readOnly = true;
    todoItem.value = inputTodo.value;
    li.appendChild(todoItem);
    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.classList.add('material-symbols-outlined')
    editBtn.innerText = 'edit_note'
    li.appendChild(editBtn);
    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.classList.add('material-symbols-outlined')
    deleteBtn.innerText = 'delete'
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputTodo.value = '';
}

function actionTodo(e){
    const item = e.target;
    const action = item.classList[0]
    // Delete Todo
    if (action == 'delete'){
        item.parentElement.remove();
    }
    // Check Todo 
    if (action == 'check' && item.innerText == 'check_box_outline_blank' ){
        item.innerText = 'check_box';
        item.style.backgroundColor = '#41bcac';
        item.nextSibling.style.backgroundColor = '#41bcac';
        item.nextSibling.style.textDecoration = 'line-through'
        item.nextSibling.nextSibling.style.backgroundColor = '#41bcac';
        item.nextSibling.nextSibling.nextSibling.style.backgroundColor = '#41bcac';
    } else if (action == 'check') {
        item.innerText = 'check_box_outline_blank';
        item.style.backgroundColor = '#fea577';
        item.nextSibling.style.backgroundColor = '#fbfbfb';
        item.nextSibling.style.textDecoration = 'none'
        item.nextSibling.nextSibling.style.backgroundColor = '#debfd5';
        item.nextSibling.nextSibling.nextSibling.style.backgroundColor = '#f88c91';
    }
    // Edit Todo
    if (action == 'edit'){
        item.previousSibling.readOnly = item.previousSibling.readOnly == true ? false : true;
    }
}
