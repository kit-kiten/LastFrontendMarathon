import {UI_ELEMENTS} from "./view.mjs";

UI_ELEMENTS.BTN_SETTINGS.addEventListener('click', () => {
    UI_ELEMENTS.DIALOG_BLOCK.style.display = 'none'
    UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'flex'
})

UI_ELEMENTS.BTN_CLOSE_SETTINGS.addEventListener('click', () => {
    UI_ELEMENTS.SETTINGS_BLOCK.style.display = 'none'
    UI_ELEMENTS.DIALOG_BLOCK.style.display = 'block'
})