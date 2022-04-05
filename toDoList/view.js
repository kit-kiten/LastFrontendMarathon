import {storage, PRIORITIES, STATUSES} from "./main.js";

const FORM_UI = {
    FORM: {
        HIGH: document.querySelector('.main-form__high'),
        LOW: document.querySelector('.main-form__low')
    },
    INPUT: {
        HIGH: document.querySelector('.task-high__text'),
        LOW: document.querySelector('.task-low__text')
    }
}

storage.createList()

function addEventListenersUIElements(){
    const buttons = document.querySelectorAll('.main-task__btn')
    for (let btn of buttons){
        btn.addEventListener('click', function (){
            const taskName = btn.previousElementSibling.textContent
            storage.deleteTask(taskName)
            btn.parentElement.remove()
        })
    }

    const checkboxes = document.querySelectorAll('.main-task__checkbox')
    for (let checkbox of checkboxes){
        checkbox.onclick = function (event){
            event.currentTarget.parentElement.parentElement.classList.toggle('main-task--done')
            const taskName = checkbox.parentElement.nextElementSibling.textContent
            const list = storage.getList()
            const task = list.find(item => item.name === taskName)

            if (task.status === STATUSES.TO_DO){
                storage.changeStatus(taskName, STATUSES.DONE)
            } else{
                storage.changeStatus(taskName, STATUSES.TO_DO)
            }
        }
    }
}

function addUIElement(text, form){
    let newTask = document.createElement('div')
    newTask.className = 'main-task'
    newTask.innerHTML = `<div class="main-task__box">
                   <span class="main-task__checkbox"></span>
               </div>
               <p class="main-task__text">${text}</p>
               <input class="main-task__btn" type="button">`

    form.after(newTask)
}

function formAction(text, form){
    const isHighForm = form === FORM_UI.FORM.HIGH

    if (isHighForm){
        storage.changePriority(text, PRIORITIES.HIGH)
    }

    addUIElement(text, form)

    addEventListenersUIElements()
}

FORM_UI.FORM.HIGH.addEventListener('submit', function (){
    storage.addTask(FORM_UI.INPUT.HIGH.value)
    formAction(FORM_UI.INPUT.HIGH.value, FORM_UI.FORM.HIGH)
    FORM_UI.INPUT.HIGH.value = ''
})

FORM_UI.FORM.LOW.addEventListener('submit', function (){
    storage.addTask(FORM_UI.INPUT.LOW.value)
    formAction(FORM_UI.INPUT.LOW.value, FORM_UI.FORM.LOW)
    FORM_UI.INPUT.LOW.value = ''
})

window.onload = () => {
    const list = storage.getList()

    list.forEach(task => {
        if (task.priority === PRIORITIES.LOW){
            formAction(task.name, FORM_UI.FORM.LOW)
        } else{
            formAction(task.name, FORM_UI.FORM.HIGH)
        }
    })
}


