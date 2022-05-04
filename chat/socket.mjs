import Cookies from "js-cookie";
import {createMessageElementUI, checkTypeMessage} from "./main.mjs";

const token = Cookies.get('token')
const URL = `ws://mighty-cove-31255.herokuapp.com/websockets?${token}`
const socket = new WebSocket(URL)

socket.onopen = () => {
    console.log('Связь с сервером установлена')
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    checkTypeMessage(data)
}

export default socket