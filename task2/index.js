document.addEventListener('DOMContentLoaded', ()=> {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('inprogress-list');
    const doneList = document.getElementById('done-list');

    let tasks=JSON.parse(localStorage.getItem('tasks')) || []

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTaskButton.addEventListener('click',() => { 
        let taskText=taskInput.value.trim();
        if(taskText!==''){
            let task={
            text: taskText,
            status: 'To Do'
            }  
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = ''
        }
    })
    const renderTasks= () => {
        todoList.innerHTML = ''
        inProgressList.innerHTML = ''
        doneList.innerHTML = ''

        tasks.forEach((task,index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <span contenteditable="${task.status !== 'Done'}">${task.text}</span>
                <div>
                    ${task.status === 'To Do' ? '<button class="btn btn-info btn-sm">In Progress</button>' : ''}
                    ${task.status === 'In Progress' ? '<button class="btn btn-success btn-sm">Done</button>' : ''}
                    <button class="btn btn-danger btn-sm">X</button>
                </div>
            `;
            listItem.querySelector('.btn-info')?.addEventListener('click',() => {
                task.status='In Progress';
                saveTasks();
                renderTasks();
            })
            listItem.querySelector('.btn-success')?.addEventListener('click',() => {
                task.status='done';
                saveTasks();
                renderTasks();
            })
            listItem.querySelector('.btn-danger').addEventListener('click',() => {
                tasks.splice(index,1);
                saveTasks();
                renderTasks();
            })
            if (task.status === 'To Do') {
                todoList.appendChild(listItem);
            } else if (task.status === 'In Progress') {
                inProgressList.appendChild(listItem);
            } else {
                doneList.appendChild(listItem);
            }
        });
    }
} )


