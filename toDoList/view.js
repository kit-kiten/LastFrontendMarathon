import {list, addTask, changePriority, changeStatus, deleteTask, PRIORITIES, STATUSES} from "./main.js";

const highForm = document.querySelector('.main-form__high')
const highText = document.querySelector('.task-high__text')

const lowForm = document.querySelector('.main-form__low')
const lowText = document.querySelector('.task-low__text')

highForm.addEventListener('submit', function (){
    addTask(highText.value)
    changePriority(highText.value, PRIORITIES.HIGH)
    console.log(list)

    let newTask = document.createElement('div')
    newTask.className = 'main-task'
    newTask.innerHTML = `<div class="main-task__box">
                   <span class="main-task__checkbox"></span>
               </div>
               <p class="main-task__text">${highText.value}</p>
               <input class="main-task__btn" type="button">`

    highForm.after(newTask)

    highText.value = ''

    let buttons = document.querySelectorAll('.main-task__btn')

    for (let btn of buttons){
        btn.addEventListener('click', function (){
            const taskName = btn.previousElementSibling.textContent
            deleteTask(taskName)
            btn.parentElement.remove()
        })
    }

    let checkboxes = document.querySelectorAll('.main-task__checkbox')

    for (let checkbox of checkboxes){
        checkbox.addEventListener('click', function (){
            checkbox.parentElement.parentElement.classList.toggle('main-task--done')
            const taskName = checkbox.parentElement.nextElementSibling.textContent
            const task = list.find(item => item.name === taskName)
            if (task.status === STATUSES.TO_DO){
                changeStatus(taskName, STATUSES.DONE)
            } else{
                changeStatus(taskName, STATUSES.TO_DO)
            }
            console.log(checkboxes)
        })
    }
})

lowForm.addEventListener('submit', function (){
    addTask(lowText.value)
    console.log(list)

    let newTask = document.createElement('div')
    newTask.className = 'main-task'
    newTask.innerHTML = `<div class="main-task__box">
                   <span class="main-task__checkbox"></span>
               </div>
               <p class="main-task__text">${lowText.value}</p>
               <input class="main-task__btn" type="button">`

    lowForm.after(newTask)

    lowText.value = ''

    let buttons = document.querySelectorAll('.main-task__btn')
    for (let btn of buttons){
        btn.addEventListener('click', function (){
            const taskName = btn.previousElementSibling.textContent
            deleteTask(taskName)
            btn.parentElement.remove()
        })
    }

    let checkboxes = document.querySelectorAll('.main-task__checkbox')

    for (let checkbox of checkboxes){
        checkbox.addEventListener('click', function (){
            checkbox.parentElement.parentElement.classList.toggle('main-task--done')
            const taskName = checkbox.parentElement.nextElementSibling.textContent
            const task = list.find(item => item.name === taskName)
            if (task.status === STATUSES.TO_DO){
                changeStatus(taskName, STATUSES.DONE)
            } else{
                changeStatus(taskName, STATUSES.TO_DO)
            }
            console.log(list)
        })
    }
})


