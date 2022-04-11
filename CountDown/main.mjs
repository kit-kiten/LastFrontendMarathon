import {UI_ELEMENTS} from "./view.mjs";
import {intervalToDuration} from 'date-fns'

function onloadResult(){
    try{
        setTimeout(onloadResult, 1000)
        const enterDate = new Date(UI_ELEMENTS.ENTER_DATE.value)
        const nowDate = new Date()
        const intervalDate = intervalToDuration({
            start: nowDate,
            end: enterDate
        })
        UI_ELEMENTS.RESULT_OUTPUT.textContent = `years: ${intervalDate.years}, days: ${intervalDate.days},
        hours: ${intervalDate.hours}, minutes: ${intervalDate.minutes}`
    } catch (err){
        alert('Error')
    }
}

UI_ELEMENTS.FORM.addEventListener('submit', () => {
    onloadResult()
})