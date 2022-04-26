import {UI_ELEMENTS} from "./view.mjs";

function createMessageElementUI(){
    const messageSubmit = document.querySelector('#message_submit')
    const li = document.createElement('li')
    li.className = 'dialog__personal_message dialog__message dialog__delivered_message'
    li.append(messageSubmit.content.cloneNode(true))
    li.firstChild.textContent = 'Я: ' + UI_ELEMENTS.MESSAGE_INPUT.value
    UI_ELEMENTS.MESSAGES_LIST.append(li)
    li.scrollIntoView(false)
}

UI_ELEMENTS.BTN_SETTINGS.addEventListener('click', () => {
    UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'flex'
})

UI_ELEMENTS.BTN_CLOSE_SETTINGS.addEventListener('click', () => {
    UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'none'
})

UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', () => {
    const isEmptyMessageInput = UI_ELEMENTS.MESSAGE_INPUT.value === ''

    if (!isEmptyMessageInput){
        createMessageElementUI()
    }

    UI_ELEMENTS.MESSAGE_INPUT.value = ''
})