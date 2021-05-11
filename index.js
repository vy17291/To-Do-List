const todoList = JSON.parse(localStorage.getItem('todos'));

class Task {
  constructor(name, done) {
    this.name = name;
    this.done = done;
  }

}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
  
}

class Todos {
  constructor() {
    this.projectsDone = [];
    this.projects = [];

  }
}

const addTaskBtn = document.querySelector('#button-add-task');
addTaskBtn.addEventListener('click', () =>{
    const addTaskPopup = document.querySelector('#add-task-popup');
    if (addTaskPopup.style.display === 'none')  {

      addTaskPopup.style.display = "block";
      document.getElementById('input-add-task-popup').focus();

    } else {
    addTaskPopup.style.display = "none";
    }
})

function hasProject(projectName) {
  for (var i in todoList.projects) {
    if (todoList.projects[i].name == projectName) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}



const addProjectBtn = document.querySelector('#button-add-project');

addProjectBtn.addEventListener('click', () =>{
    const addProjectPopup = document.querySelector('#add-project-popup');
    if (addProjectPopup.style.display === 'none')  {
    addProjectPopup.style.display = "block";
    document.querySelector('.input-add-project-popup').focus();
    } else {
    addProjectPopup.style.display = "none";
    }
})

function addProject() {

    const inputProject = new Project;
    inputProject.name = document.querySelector('.input-add-project-popup').value;
      currentProject = inputProject.name;
      todoList.projects.push(inputProject);
      document.querySelector('.input-add-project-popup').value = '';
      localStorage.setItem("todos", JSON.stringify(todoList));
      renderProjectList(); 
    
}
const inputProjectKey = document.getElementById('input-add-project');
inputProjectKey.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const addProjectPopup = document.querySelector('#add-project-popup');
    const inputName = document.querySelector('.input-add-project-popup').value;
    if (inputName === "") {
      alert("Please fill the name");
    } else if (hasProject(inputName) === true) {
      alert("The name already had, please change another name")
    } else {
      addProjectPopup.style.display = "none";
      addProject();
    }
  }
})
const inputProject = document.querySelector('.button-add-project-popup');
inputProject.addEventListener('click', () => {
    const addProjectPopup = document.querySelector('#add-project-popup');
    const inputName = document.querySelector('.input-add-project-popup').value;
    if (inputName === "") {
      alert("Please fill the name");
    } else if (hasProject(inputName) === true) {
      alert("The name already had, please change another name")
    } else {
      addProjectPopup.style.display = "none";
      addProject();
    }
    
})

function cleanTaskInput() {
    const taskInput = document.querySelector('#input-add-task-popup');
    taskInput.value = '';
    const addTaskPopup = document.querySelector('#add-task-popup');
    addTaskPopup.style.display = 'none';
}


var currentProject;
if (todoList.projects.length!=null) {
renderProjectList();
}

function renderProjectList() {
  
  const projectContain = document.getElementById('projects-list');
  projectContain.innerHTML = '';
  for (var i in todoList.projects) {
    const projectName = document.createElement('div');

            projectName.innerHTML = `
                <button class="project_button"  data-project = ${i}> 
                <i class="fas fa-inbox"></i>
                  ${todoList.projects[i].name}
                <div class="project-right" id = "delete-project" data-projectdelete = ${i}><i class="fas fa-times"></i></div> 
              </button>`;
            projectContain.appendChild(projectName);
            
  }
  addEvenProject();
 // addEventCircle();
}

function addEvenProject() {
  
  const projectButtons = document.querySelectorAll('[data-project]');
  projectButtons.forEach(button => {
    button.addEventListener('click', () => {
      

      currentProject = todoList.projects[button.dataset.project].name;
      if (button.dataset.project == undefined) {
        currentProject = todoList.projects[0].name;
      }
      renderProject(currentProject);

      console.log(currentProject);
    })
    
  });

  const projectDelete = document.querySelectorAll('[data-projectdelete]');
  projectDelete.forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.remove();
      
      todoList.projects.splice(button.dataset.delete,1)

      if (getCurrentIndex(currentProject) == button.dataset.delete) {
        const taskContent = document.querySelector('.task-content');
        taskContent.innerHTML = '';
      }

      console.log(todoList);
      localStorage.setItem("todos", JSON.stringify(todoList));
    })
  })
}

function renderProject(projectName){
  const taskContent = document.querySelector('.task-content');
      taskContent.innerHTML = '';
  for (var i in todoList.projects) {
    //console.log(todoList.projects[i].name);
    if (todoList.projects[i].name == projectName) {
      for (var j in todoList.projects[i].tasks) {
        renderTask(todoList.projects[i].tasks[j].name,j,todoList.projects[i].tasks[j].done);
      }
      break;
    }
    
  }

  
}
/* ------RENDER TASK------ */
function renderTask(task,index,isDone){
  const taskContent = document.querySelector('.task-content');
  
  const taskContain = document.createElement('div');
            taskContent.appendChild(taskContain);
            if (isDone == false) {
              taskContain.innerHTML = `
                <button class="button-task" id="task-button-${index}" data-task=${index}>
                <div class="left-task-panel">
                <i class="far fa-circle" id="circle-icon-${index}" data-input=${index}></i>
                <p id="task-content-${index}">${task}</p>
                <input type="text" class="input-task-name" data-input=${index}>
                </div>
                <div class="right-task-panel" data-input=${index} id = "delete-task-${index}">
                <i class="fas fa-times" ></i>
                </div>
                </button>`;
            } else {
              taskContain.innerHTML = `
                <button class="button-task" id="task-button-${index}" data-task=${index}>
                <div class="left-task-panel">
                <i class="far fa-circle"  id="circle-icon-${index}" data-input=${index}></i>
                <del><p id="task-content-${index}">${task}</p></del>
                <input type="text" class="input-task-name" data-input=${index}>
                </div>
                <div class="right-task-panel" data-input=${index} id = "delete-task-${index}">
                <i class="fas fa-times" ></i>
                </div>
                </button>`;
            }
            

            const deleteTaskButton = document.getElementById(`delete-task-${index}`);
            const taskButton = document.getElementById(`task-button-${index}`);
              
            deleteTaskButton.addEventListener('click', () => {
            
                taskButton.remove();
                    todoList.projects[getCurrentIndex(currentProject)].tasks.splice(index,1);
                    console.log(todoList.projects[index].tasks);

                localStorage.setItem("todos", JSON.stringify(todoList));
              })
       
             const circleTask = document.getElementById(`circle-icon-${index}`);   
                 circleTask.addEventListener('click', () => {
                  const currentIndex = getCurrentIndex(currentProject);
                 
                  if (todoList.projects[currentIndex].tasks[index].done === false) {
  
                    todoList.projects[currentIndex].tasks[index].done = true;
                    renderProject(currentProject);
  
                  } else {
                    todoList.projects[currentIndex].tasks[index].done = false;
                    renderProject(currentProject);
                  }   
                  localStorage.setItem("todos", JSON.stringify(todoList));
                })                             
}


function getCurrentIndex(project) {
    for (var i in todoList.projects) {
       
         if (todoList.projects[i].name == project) {
             return i;
            
         }
        }
}
/* ------------ADD TASK------------*/
const addNewTaskBtn = document.querySelector('#button-add-task-popup');
addNewTaskBtn.addEventListener('click', () => {
    addTask();

});
const inputTask = document.getElementById('input-add-task-popup');
inputTask.addEventListener('keypress',function (e) {
  if (e.key === 'Enter') {
    addTask();

  }
})

function addTask() {
    
    const taskInput = new Task;
    taskInput.name = document.getElementById('input-add-task-popup').value;
    taskInput.done = false;
    for (var i in todoList.projects) {
      // console.log(todoList.projects[i].name);
      if (todoList.projects[i].name == currentProject) {
        todoList.projects[i].tasks.push(taskInput);
        break;
      }
    }
    
    console.log(todoList);

    const taskContent = document.querySelector('.task-content');
    taskContent.innerHTML = '';
    renderProject(currentProject);
    cleanTaskInput();

    localStorage.setItem("todos", JSON.stringify(todoList));
}

/*------------------NAVIGATION --------- */
const buttonNav = document.querySelector('#button-open-nav');
buttonNav.addEventListener('click', () => {
  const projectTab = document.querySelector('.project_tab');
  if (projectTab.style.display === 'none') {
    projectTab.style.display = 'block';
  } else {
    projectTab.style.display = 'none';
  }
  
})
