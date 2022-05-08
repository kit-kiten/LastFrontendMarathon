import {UI_ELEMENTS} from "./view.mjs";

export const MODAL_WINDOWS = {
    activeModalWindow: function (modalWindow){
        modalWindow.BLOCK.style.display = 'flex'
        UI_ELEMENTS.BACKGROUND_MODAL_WINDOW.style.display = 'block'
    },

    unActiveModalWindow: function (modalWindow){
        modalWindow.BLOCK.style.display = 'none'
        modalWindow.INPUT.value = ''
        UI_ELEMENTS.BACKGROUND_MODAL_WINDOW.style.display = 'none'
    },

    closeModalWindow: function (event){
        const isModalWindow = event.target.classList.contains('modal-window')
        if (isModalWindow){
            event.target.style.display = 'none'
            UI_ELEMENTS.BACKGROUND_MODAL_WINDOW.style.display = 'none'
        }
    }
}





