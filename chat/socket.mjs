import Cookies from "js-cookie";
import {format} from "date-fns";
import {UI_ELEMENTS} from "./view.mjs";

const token = Cookies.get('token')
const URL = `ws://mighty-cove-31255.herokuapp.com/websockets?${token}`
const socket = new WebSocket(URL)

socket.onopen = () => {
    console.log('Связь с сервером установлена')
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.user.email !== Cookies.get('email')){
        const messageSubmit = document.querySelector('#message_submit')
        const li = document.createElement('li')

        li.className = 'dialog__someone_message dialog__message dialog__delivered_message'
        li.append(messageSubmit.content.cloneNode(true))
        li.querySelector('.dialog__message-text').textContent = `${data.user.name}: ${data.text}`
        li.querySelector('.dialog__message-time').textContent = format(new Date(data.createdAt), 'HH:mm')
        UI_ELEMENTS.DIALOG.MESSAGES_LIST.append(li)
        li.scrollIntoView(false)
    } else{
        console.log(data)
    }
}

export default socket