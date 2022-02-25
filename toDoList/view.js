import {list, addTask, changePriority, changeStatus, deleteTask, PRIORITIES, STATUSES} from "./main.js";

const highForm = document.querySelector('.main-form__high')
const highText = document.querySelector('.task-high__text')

const lowForm = document.querySelector('.main-form__low')
const lowText = document.querySelector('.task-low__text')

function formAction(text, form){
    const isHighForm = form === highForm

    addTask(text.value)

    if (isHighForm){
        changePriority(text.value, PRIORITIES.HIGH)
    }
    console.log(list) //Можно удалить

    let newTask = document.createElement('div')
    newTask.className = 'main-task'
    newTask.innerHTML = `<div class="main-task__box">
                   <span class="main-task__checkbox"></span>
               </div>
               <p class="main-task__text">${text.value}</p>
               <input class="main-task__btn" type="button">`

    form.after(newTask)
    text.value = ''

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
        checkbox.onclick = function (event){
            event.currentTarget.parentElement.parentElement.classList.toggle('main-task--done')
            const taskName = checkbox.parentElement.nextElementSibling.textContent
            const task = list.find(item => item.name === taskName)
            if (task.status === STATUSES.TO_DO){
                changeStatus(taskName, STATUSES.DONE)
            } else{
                changeStatus(taskName, STATUSES.TO_DO)
            }
        }
    }
}

highForm.addEventListener('submit', function (){
    formAction(highText, highForm)
})

lowForm.addEventListener('submit', function (){
    formAction(lowText, lowForm)
})


