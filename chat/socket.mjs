import Cookies from "js-cookie";
import {checkTypeMessage} from "./main.mjs";

function ConnectWithServer(){
    this.init = function (){
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

        socket.onclose = () => {
            console.log('Соединение закрыто')
            this.init()
        }

        return socket
    }
}

const socket = new ConnectWithServer().init()

export default socket
