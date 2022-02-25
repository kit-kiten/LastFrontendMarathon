export const STATUSES = {
    TO_DO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done'
}

export const PRIORITIES = {
    LOW: 'low',
    HIGH: 'high'
}

export const list = []

export function changeStatus(task, status) {
    const checkTask = list.findIndex(item => item.name === task)
    const checkStatus = status === STATUSES.TO_DO || status === STATUSES.IN_PROGRESS || status === STATUSES.DONE
    if (checkTask !== -1 && checkStatus) {
        list.find(item => item.name === task).status = status
    }
}

export function changePriority(task, priority) {
    const checkTask = list.findIndex(item => item.name === task)
    const checkPriority = priority === PRIORITIES.LOW || priority === PRIORITIES.HIGH
    if (checkTask !== -1 && checkPriority) {
        list.find(item => item.name === task).priority = priority
    }
}

export function addTask(task) {
    list.push({
        'name': task,
        'status': STATUSES.TO_DO,
        'priority': PRIORITIES.LOW
    })
}

export function deleteTask(task) {
    let indexTask = list.findIndex(item => item.name === task)
    if (indexTask !== -1) {
        list.splice(indexTask, 1)
    }
}

function showBy(whatShow) {
    if (whatShow === 'status') {
        let toDo = '', inProgress = '', done = ''
        for (let task of list) {
            if (task.status === STATUSES.TO_DO) {
                toDo += `\n "${task.name}",`
            } else if (task.status === STATUSES.IN_PROGRESS) {
                inProgress += `\n "${task.name}",`
            } else {
                done += `\n "${task.name}",`
            }
        }
        console.log(`Todo:${toDo || '\n -'}`)
        console.log(`In Progress:${inProgress || '\n -'}`)
        console.log(`Done:${done || '\n -'}`)
    } else if (whatShow === 'priority') {
        let low = '', high = ''
        for (let task of list) {
            if (task.priority === PRIORITIES.LOW) {
                low += `\n "${task.name}",`
            } else if (task.priority === PRIORITIES.HIGH) {
                high += `\n "${task.name}",`
            }
        }
        console.log(`low:${low || '\n -'}`)
        console.log(`high:${high || '\n -'}`)
    }

}