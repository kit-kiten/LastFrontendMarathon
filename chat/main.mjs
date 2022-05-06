import {UI_ELEMENTS} from "./view.mjs";
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import socket from "./socket.mjs";

let amountVisibleMessages = 0

export function createMessageElementUI(data, sender, history){
    const messageSubmit = document.querySelector('#message_submit')
    const li = document.createElement('li')

    if(sender === 'personal'){
        li.className = 'dialog__personal_message dialog__message'
        li.append(messageSubmit.content.cloneNode(true))
        li.querySelector('.dialog__message-text').textContent = `Я: ${data.text}`

    } else{
        li.className = 'dialog__someone_message dialog__message'
        li.append(messageSubmit.content.cloneNode(true))
        li.querySelector('.dialog__message-text').textContent = `${data.user.name}: ${data.text}`
    }

    li.querySelector('.dialog__message-time').textContent = format(new Date(data.createdAt), 'HH:mm')

    if (history){
        UI_ELEMENTS.DIALOG.MESSAGES_LIST.append(li)
    } else{
        UI_ELEMENTS.DIALOG.MESSAGES_LIST.prepend(li)
        li.scrollIntoView(false)
    }

}

export function checkTypeMessage(data, history){
    if (data.user.email !== Cookies.get('email')){
        createMessageElementUI(data, '', history)
    } else{
        createMessageElementUI(data, 'personal', history)
    }
}

function createSomeoneMessageElementsUI(messages, amountMessages){
    for (let i=1; i < amountMessages; i++){
        const length = Object.keys(messages).length
        const data = messages[length - i - amountVisibleMessages]
        checkTypeMessage(data, true)
    }
    amountVisibleMessages += 20
}

function activeModalWindow(modalWindow){
    modalWindow.BLOCK.style.display = 'flex'
    UI_ELEMENTS.BACKGROUND_MODAL_WINDOW.style.display = 'block'
}

function unActiveModalWindow(modalWindow){
    modalWindow.BLOCK.style.display = 'none'
    modalWindow.INPUT.value = ''
    UI_ELEMENTS.BACKGROUND_MODAL_WINDOW.style.display = 'none'
}


async function showHistoryMessages(amountMessages){
    const URL = 'https://mighty-cove-31255.herokuapp.com/api/messages'
    const token = Cookies.get('token')
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const {messages} = await response.json()

    createSomeoneMessageElementsUI(messages, amountMessages)
}

function sendMessage(){
    socket.send(JSON.stringify({
        text: UI_ELEMENTS.DIALOG.MESSAGE_INPUT.value
    }))
}

document.addEventListener('DOMContentLoaded', () => {
    const tokenIsUndefined = Cookies.get('token') === undefined

    if (tokenIsUndefined){
        activeModalWindow(UI_ELEMENTS.AUTHORIZATION)
    } else{
        showHistoryMessages(20, true)
    }
})

UI_ELEMENTS.DIALOG.BUTTONS.BTN_SETTINGS.addEventListener('click', () => activeModalWindow(UI_ELEMENTS.SETTINGS))

UI_ELEMENTS.SETTINGS.BUTTONS.CLOSE.addEventListener('click', () => unActiveModalWindow(UI_ELEMENTS.SETTINGS))

UI_ELEMENTS.DIALOG.BUTTONS.BTN_EXIT.addEventListener('click', () => activeModalWindow(UI_ELEMENTS.AUTHORIZATION))

UI_ELEMENTS.AUTHORIZATION.BUTTONS.CLOSE.addEventListener('click', () => unActiveModalWindow(UI_ELEMENTS.AUTHORIZATION))

UI_ELEMENTS.ACCEPT.BUTTONS.CLOSE.addEventListener('click', () => unActiveModalWindow(UI_ELEMENTS.ACCEPT))

UI_ELEMENTS.DIALOG.MESSAGE_FORM.addEventListener('submit', () => {
    const isNotEmptyMessageInput = UI_ELEMENTS.DIALOG.MESSAGE_INPUT.value !== ''

    if (isNotEmptyMessageInput){
        sendMessage()
    }

    UI_ELEMENTS.DIALOG.MESSAGE_INPUT.value = ''
})

UI_ELEMENTS.DIALOG.MESSAGES_LIST.addEventListener('scroll', () => {
    const scroll = UI_ELEMENTS.DIALOG.MESSAGES_LIST
    if (scroll.scrollHeight + scroll.scrollTop - scroll.offsetHeight < 50){
        showHistoryMessages(20)
    }
})

document.querySelector('.dialog__message-list').addEventListener('scroll', () => {
})

UI_ELEMENTS.AUTHORIZATION.FORM.addEventListener('submit', () => {
    const isNotEmptyAuthorizationInput = UI_ELEMENTS.AUTHORIZATION.INPUT.value !== ''

    if(isNotEmptyAuthorizationInput){
        const URL = 'https://mighty-cove-31255.herokuapp.com/api/user'

        const response = fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: UI_ELEMENTS.AUTHORIZATION.INPUT.value })
        })

        Cookies.set('email', UI_ELEMENTS.AUTHORIZATION.INPUT.value)
        activeModalWindow(UI_ELEMENTS.ACCEPT)
    }
})

UI_ELEMENTS.ACCEPT.FORM.addEventListener('submit', () => {
    const isNotEmptyAcceptInput = UI_ELEMENTS.ACCEPT.INPUT.value !== ''

    if (isNotEmptyAcceptInput){
        Cookies.set('token', UI_ELEMENTS.ACCEPT.INPUT.value)

        showHistoryMessages(20)

        unActiveModalWindow(UI_ELEMENTS.ACCEPT)
        unActiveModalWindow(UI_ELEMENTS.AUTHORIZATION)
    }
})

UI_ELEMENTS.SETTINGS.FORM.addEventListener('submit', () => {
    const isNotEmptySettingsInput = UI_ELEMENTS.SETTINGS.INPUT.value !== ''

    if(isNotEmptySettingsInput){
        const token = Cookies.get('token')
        const URL = 'https://mighty-cove-31255.herokuapp.com/api/user'

        const response = fetch(URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name: UI_ELEMENTS.SETTINGS.INPUT.value})
        })
    }
})

UI_ELEMENTS.MODAL_WINDOWS.addEventListener('click', (event) => {
    const isModalWindow = event.target.classList.contains('modal-window')
    if (isModalWindow){
        event.target.style.display = 'none'
        UI_ELEMENTS.BACKGROUND_MODAL_WINDOW.style.display = 'none'
    }
})