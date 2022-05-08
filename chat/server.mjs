import {UI_ELEMENTS} from "./view.mjs";
import Cookies from "js-cookie";
import {MODAL_WINDOWS} from "./modal_windows.mjs";
import {createSomeoneMessageElementsUI} from "./main.mjs";
import {EmailError} from "./errors.mjs";

export const SERVER = {
    sendCodeAnEmail: async function(){
        const URL = 'https://mighty-cove-31255.herokuapp.com/api/user'
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: UI_ELEMENTS.AUTHORIZATION.INPUT.value })
        })

        if (response.ok){
            Cookies.set('email', UI_ELEMENTS.AUTHORIZATION.INPUT.value)
            MODAL_WINDOWS.activeModalWindow(UI_ELEMENTS.ACCEPT)
        } else{
            throw new EmailError('Некорректный email')
        }
    },

    changeName: async function(){
        const isNotEmptySettingsInput = UI_ELEMENTS.SETTINGS.INPUT.value !== ''

        if(isNotEmptySettingsInput){
            const token = Cookies.get('token')
            const URL = 'https://mighty-cove-31255.herokuapp.com/api/user'

            await fetch(URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({name: UI_ELEMENTS.SETTINGS.INPUT.value})
            })
        }
    },

    showHistoryMessages: async function (amountMessages){
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
}