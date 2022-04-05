export const STATUSES = {
    TO_DO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done'
}

export const PRIORITIES = {
    LOW: 'low',
    HIGH: 'high'
}

function CreateTask(task){
    this.name = task
    this.status = STATUSES.TO_DO
    this.priority = PRIORITIES.LOW
}

export const storage = {
    createList: () => {
        if (JSON.parse(localStorage.getItem('list')) === null){
            const list = []
            localStorage.setItem('list', JSON.stringify(list))
        }
    },

    changeStatus: (task, status) => {
        const list = JSON.parse(localStorage.getItem('list'))
        const checkStatus = status === STATUSES.TO_DO || status === STATUSES.IN_PROGRESS || status === STATUSES.DONE
        const checkTask = list.find(item => item.name === task)

        if (checkTask && checkStatus) {
            list.find(item => item.name === task).status = status
        }

        localStorage.setItem('list', JSON.stringify(list))
    },

    changePriority: (task, priority) => {
        const list = JSON.parse(localStorage.getItem('list'))
        const checkPriority = priority === PRIORITIES.LOW || priority === PRIORITIES.HIGH
        const checkTask = list.find(item => item.name === task)

        if (checkTask && checkPriority) {
            list.find(item => item.name === task).priority = priority
        }

        localStorage.setItem('list', JSON.stringify(list))
    },

    addTask: (task) => {
        const list = JSON.parse(localStorage.getItem('list'))
        const newTask = new CreateTask(task)

        list.push(newTask)

        localStorage.setItem('list', JSON.stringify(list))
    },

    deleteTask: (task) => {
        const list = JSON.parse(localStorage.getItem('list'))
        const indexTask = list.findIndex(item => item.name === task)

        if (indexTask !== -1) {
            list.splice(indexTask, 1)
        }

        localStorage.setItem('list', JSON.stringify(list))
    },

    getList: () => {
        return JSON.parse(localStorage.getItem('list'))
    }
}
