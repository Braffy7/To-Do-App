const NewActivityForm = document.querySelector('.container_add');
const Activities = document.querySelector('#container_list');
const newActivity = document.querySelector('[name="NewActivity"]')

// add new acticity

NewActivityForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    
    const newDiv = document.createElement("div");
    newDiv.classList.add('container_list_point');

    const divContent = document.createElement("div");
    divContent.innerText = newActivity.value;
    divContent.classList.add('container_list_point_text');

    saveLocalTodos(newActivity.value);
    
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('container_list_point_btn-completed');

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('container_list_point_btn-trash');

    newDiv.appendChild(divContent);
    newDiv.appendChild(completedBtn);
    newDiv.appendChild(trashBtn);
    Activities.appendChild(newDiv);
    newActivity.value = "";
}); 

// complete/delete acticity

Activities.addEventListener('click', (e)=> {
    const item = e.target;
    if (item.classList[0] === "container_list_point_btn-trash") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', ()=> {
            todo.remove();
        })
    };
    if (item.classList[0] === "container_list_point_btn-completed") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
}});

// SaveActivities

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('container_list_point');
    
        const divContent = document.createElement("div");
        divContent.innerText = todo;
        divContent.classList.add('container_list_point_text');

        const completedBtn = document.createElement('button');
        completedBtn.classList.add('container_list_point_btn-completed');
    
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('container_list_point_btn-trash');
    
        newDiv.appendChild(divContent);
        newDiv.appendChild(completedBtn);
        newDiv.appendChild(trashBtn);
        Activities.appendChild(newDiv);
    });
});

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}