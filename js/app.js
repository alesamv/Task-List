
const listaTasks = document.getElementById('lista-tasks');


//-----Event Listeners-----
eventListeners();

function eventListeners() {
     document.querySelector('#formulario').addEventListener('submit', agregarTask);
     listaTasks.addEventListener('click', borrarTask);
     document.addEventListener('DOMContentLoaded', localStorageListo);
}

//-----Funciones------

// Añadir una nueva tarea
function agregarTask(e) {
     e.preventDefault();
     //Lee del text area
     const task = document.getElementById('task').value;
     //Crea la X para borrar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-task';
     botonBorrar.innerText = 'X';
     //Crea un elemento nuevo en una lista
     const li = document.createElement('li');
     li.innerText = task;
     //Añade la X
     li.appendChild(botonBorrar);
     //Añade el elemento a la lista
     listaTasks.appendChild(li);
     //Añade al Local Storage
     agregarTaskLocalStorage(task);
}

//Elimina una tarea del DOM
function borrarTask(e) {
     e.preventDefault();
     if(e.target.className === 'borrar-task') {
          e.target.parentElement.remove();
          borrarTaskLocalStorage(e.target.parentElement.innerText);
     } 
}

//Muestra lo que se almaceno en el Local Storage
function localStorageListo() {
     let tasks;
     tasks = obtenerTasksLocalStorage();
     tasks.forEach(function(task) {
          //Crea la X para borrar
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'borrar-task';
          botonBorrar.innerText = 'X';
          //Crea un elemento nuevo en una lista
          const li = document.createElement('li');
          li.innerText = task;
          //Añade la X
          li.appendChild(botonBorrar);
          //Añade el elemento a la lista
          listaTasks.appendChild(li);
     });
}

//Agrega tarea a local storage
function agregarTaskLocalStorage(task) {
     let tasks;
     tasks = obtenerTasksLocalStorage();
     //Añade la nueva tarea
     tasks.push(task);
     //Convierte de string a arreglo para local storage
     localStorage.setItem('tasks', JSON.stringify(tasks) );
}

//Comprueba que haya elementos en localstorage, retorna un arreglo
function obtenerTasksLocalStorage() {
     let tasks;
     if(localStorage.getItem('tasks') === null) {
          tasks = []; 
     } else {
          tasks = JSON.parse(localStorage.getItem('tasks') );
     }
     return tasks;
}

//Elimina tarea de Local Storage
function borrarTaskLocalStorage(task) {
     let tasks, taskBorrar;
     // Elimina la X de la cadena
     taskBorrar = task.substring(0, task.length - 1);
     tasks = obtenerTasksLocalStorage();
     tasks.forEach(function(task, index) {
          if(taskBorrar === task) {
               tasks.splice(index, 1);
          }
     }) ;
     localStorage.setItem('tasks', JSON.stringify(tasks) );
}