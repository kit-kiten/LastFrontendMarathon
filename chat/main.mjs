import {UI_ELEMENTS} from "./view.mjs";
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import socket from "./socket.mjs";
import {MODAL_WINDOWS} from "./modal_windows.mjs";
import {SERVER} from "./server.mjs";
import {EmailError} from "./errors.mjs";

let amountVisibleMessages = 0

export function checkToken(){
    const token = Cookies.get('token')
    if (token){
        SERVER.showHistoryMessages(20)
    }
}

function renderHistoryMessages(){
    socket.init()
}

function loadPage(){
    const tokenIsUndefined = Cookies.get('token') === undefined

    if (tokenIsUndefined){
        MODAL_WINDOWS.activeModalWindow(UI_ELEMENTS.AUTHORIZATION)
    } else{
        renderHistoryMessages()
    }
}

function createMessageElementUI(data, sender, history){
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

export function createSomeoneMessageElementsUI(messages, amountMessages){
    for (let i=1; i < amountMessages; i++){
        const length = Object.keys(messages).length
        const data = messages[length - i - amountVisibleMessages]
        checkTypeMessage(data, true)
    }
    amountVisibleMessages += amountMessages
}

function authorization(){
    const isNotEmptyAcceptInput = UI_ELEMENTS.ACCEPT.INPUT.value !== ''

    if (isNotEmptyAcceptInput){
        Cookies.set('token', UI_ELEMENTS.ACCEPT.INPUT.value)

        renderHistoryMessages()
        MODAL_WINDOWS.unActiveModalWindow(UI_ELEMENTS.ACCEPT)
        MODAL_WINDOWS.unActiveModalWindow(UI_ELEMENTS.AUTHORIZATION)
    }
}

function sendMessage(){
    const isNotEmptyMessageInput = UI_ELEMENTS.DIALOG.MESSAGE_INPUT.value !== ''

    if (isNotEmptyMessageInput){
        socket.send(UI_ELEMENTS.DIALOG.MESSAGE_INPUT.value)
    }

    UI_ELEMENTS.DIALOG.MESSAGE_INPUT.value = ''
}

function addMessagesByScroll(){
    const scroll = UI_ELEMENTS.DIALOG.MESSAGES_LIST
    if (scroll.scrollHeight + scroll.scrollTop - scroll.offsetHeight < 50){
        SERVER.showHistoryMessages(20)
    }
}

document.addEventListener('DOMContentLoaded', () => loadPage())

UI_ELEMENTS.DIALOG.BUTTONS.BTN_SETTINGS.addEventListener('click', () => MODAL_WINDOWS.activeModalWindow(UI_ELEMENTS.SETTINGS))

UI_ELEMENTS.SETTINGS.BUTTONS.CLOSE.addEventListener('click', () => MODAL_WINDOWS.unActiveModalWindow(UI_ELEMENTS.SETTINGS))

UI_ELEMENTS.DIALOG.BUTTONS.BTN_EXIT.addEventListener('click', () => MODAL_WINDOWS.activeModalWindow(UI_ELEMENTS.AUTHORIZATION))

UI_ELEMENTS.AUTHORIZATION.BUTTONS.CLOSE.addEventListener('click', () => MODAL_WINDOWS.unActiveModalWindow(UI_ELEMENTS.AUTHORIZATION))

UI_ELEMENTS.ACCEPT.BUTTONS.CLOSE.addEventListener('click', () => MODAL_WINDOWS.unActiveModalWindow(UI_ELEMENTS.ACCEPT))

UI_ELEMENTS.MODAL_WINDOWS.addEventListener('click', (event) => MODAL_WINDOWS.closeModalWindow(event))

UI_ELEMENTS.DIALOG.MESSAGE_FORM.addEventListener('submit', () => sendMessage())

UI_ELEMENTS.DIALOG.MESSAGES_LIST.addEventListener('scroll', () => addMessagesByScroll())

UI_ELEMENTS.AUTHORIZATION.FORM.addEventListener('submit', async() => {
    try{
        await SERVER.sendCodeAnEmail()
    } catch (err){
        if (err instanceof EmailError){
            alert('Введите корректный email')
            UI_ELEMENTS.AUTHORIZATION.INPUT.value = ''
        } else {
            throw err
        }
    }
})

UI_ELEMENTS.ACCEPT.FORM.addEventListener('submit', () => authorization())

UI_ELEMENTS.SETTINGS.FORM.addEventListener('submit', () => SERVER.changeName())
