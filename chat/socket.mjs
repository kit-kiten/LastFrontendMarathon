import Cookies from "js-cookie";
import {checkTypeMessage} from "./main.mjs";
import {MODAL_WINDOWS} from "./modal_windows.mjs";
import {UI_ELEMENTS} from "./view.mjs";

const socket = {
    connect: undefined,

    init: function (){
        const token = Cookies.get('token')
        const URL = `ws://mighty-cove-31255.herokuapp.com/websockets?${token}`

        if(token){
            socket.connect = new WebSocket(URL)

            socket.connect.onopen = () => {
                console.log('Связь с сервером установлена')
            }

            socket.connect.onmessage = (event) => {
                try{
                    const data = JSON.parse(event.data)
                    checkTypeMessage(data)
                } catch (err){
                    if (err instanceof SyntaxError){
                        alert('Неверный токен!')
                        Cookies.remove('token', { path: '' })
                        MODAL_WINDOWS.activeModalWindow(UI_ELEMENTS.AUTHORIZATION)
                    }
                }
            }

            socket.connect.onclose = () => {
                console.log('Соединение закрыто')
                socket.init()
            }

            socket.connect.onerror = (error) => {
                console.log(error.message)
            }
        }
    },

    send: function (message){
        socket.connect.send(JSON.stringify({
            text: message
        }))
    }
}

export default socket
