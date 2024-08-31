//selecting
// let todos = [];
let filterValue = "all";
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

//event
todoForm.addEventListener("submit",addTodo);
selectFilter.addEventListener("change",(e) => {
    filterValue = e.target.value;
    filterTodos();
});

document.addEventListener("DOMContentLoaded",(e) => {
    const todos = getAllTodos();
    createTodos(todos);
});
//functions
function addTodo(e){
    e.preventDefault();
    if(!todoInput.value)return null;

    const newTodo = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        title: todoInput.value,
        isActivated: false,
    }
    // todos.push(newTodo);
    saveTodo(newTodo);
    filterTodos();
}

function createTodos(){
   const todos = getAllTodos();
    let result = "";
    todos.forEach(todo => {
        result += `<li class="todo">
        <p class="todo__title ${todo.isActivated && "completed"}" >${todo.title}</p>
        <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
        <button class="todo__remove" data-todo-id=${
            todo.id
        }><i class="fa fa-trash" aria-hidden="true"></i></button>
        <button class="todo__check" data-todo-id=${
            todo.id
        }><i class="fa fa-check" aria-hidden="true"></i></button>
      </li>`;
    });
    todoList.innerHTML = result;
    const removeBtns = [...document.querySelectorAll(".todo__remove ")];
    removeBtns.forEach(btn => btn.addEventListener("click",removeTodo));

    const checkBtn = [...document.querySelectorAll(".todo__check")];
    checkBtn.forEach(btn => btn.addEventListener("click",checkTodo));
}

function filterTodos(){
    // const filter = e.target.value;
    const todos = getAllTodos();
    switch(filterValue){
        case "all":{
            createTodos(todos);
            break;
        }
        case "completed":{
            const filteredTodos = todos.filter((t) => t.isActivated);
            createTodos(filteredTodos);
            break;
        }
        case "uncompleted":{
            const filteredTodos = todos.filter((t) => !t.isActivated);
            createTodos(filteredTodos);
            break;
        }
        default: createTodos(todos);
    }
}

function removeTodo(e){
    let todos = getAllTodos();
    const todoId = Number(e.target.dataset.todoId);
    todos = todos.filter((t) => t.id !== todoId);
    filterTodos();
}

function checkTodo(e){
    // console.log(e.target.dataset.todoId);
    const todos = getAllTodos();
    const todoId = Number(e.target.dataset.todoId);
    const todo = todos.find((t) => t.id === todoId);
    todo.isActivated = !todo.isActivated;
    filterTodos();
}
function getAllTodos(){
   const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
   return savedTodos; 
}
function saveTodo(todo){
    const savedTodos = getAllTodos();
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    return savedTodos;
}