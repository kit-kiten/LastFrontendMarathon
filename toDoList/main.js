const list = {}

function changeStatus(task, status) {
    const checkTask = task in list
    const checkStatus = status === 'To Do' || status === 'In Progress' || status === 'Done'
    if (checkTask && checkStatus){
        list[task] = status
    }
}

function addTask(task) {
    list[task] = 'To Do'
}

function deleteTask(task) {
    if (task in list){
        delete list[task]
    }
}

function showList() {
    let toDo = '', inProgress = '', done = ''
    for (let task in list){
        if (list[task] === 'To Do'){
            toDo += `\n "${task}",`
        } else if (list[task] === 'In Progress'){
            inProgress += `\n "${task}",`
        } else{
            done += `\n "${task}",`
        }
    }
    console.log(`Todo:${toDo || '\n -'}`)
    console.log(`In Progress:${inProgress || '\n -'}`)
    console.log(`Done:${done || '\n -'}`)
}

addTask('First task')
addTask('Second task')
addTask('Third task')
deleteTask('Third task')
changeStatus('Second task', 'In Progress')

showList()