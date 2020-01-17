const form = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners(){

    // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);

    //add task event
    form.addEventListener('submit',addTask);

    //Remove Task 
    taskList.addEventListener('click',removeTask);
    
    //code for Clear Tasks button
    clearBtn.addEventListener('click',clearTasks);

    //filter task envent 
    filter.addEventListener('keyup',filterTasks);

}
// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(e){
    if(taskInput.value===''){
        alert('add task');
    }

    // create li element 

const li = document.createElement('li');

// Add class
li.className = 'collection-item';

// create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));

// create new link element
const link = document.createElement('a');

//add class to the link 
link.className = 'delete-item secondary-content';

//add icon html 
link.innerHTML = '<i class = "fa fa-remove"></i>';

//append the link to li
li.appendChild(link);

// now append li to ul
taskList.appendChild(li);

 // Store in LS
 storeTaskInLocalStorage(taskInput.value);

// clear the input
taskInput.value ='';

e.preventDefault();

}
// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  

//Rmove Task function 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are u sure')){
        e.target.parentElement.parentElement.remove();

        // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  

// Clear Task
function clearTasks(){
   // taskList.innerHTML ='';

   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }

   // Clear Tasks from LS 
   clearTasksFromLocalStorage();
}

//clear task from Ls

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// fliter tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}