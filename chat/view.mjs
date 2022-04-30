export const UI_ELEMENTS = {
    DIALOG: {
        MESSAGE_FORM: document.querySelector('.dialog__bottom'),
        MESSAGES_LIST: document.querySelector('.dialog__message-list'),
        MESSAGE_INPUT: document.querySelector('.dialog__message-input'),
        BUTTONS: {
            BTN_SETTINGS: document.querySelector('.dialog__btn-settings'),
            BTN_EXIT: document.querySelector('.dialog__btn-exit')
        }
    },
    SETTINGS: {
        BLOCK: document.querySelector('.settings'),
        FORM: document.querySelector('.settings__bottom'),
        INPUT: document.querySelector('.settings__input'),
        BUTTONS: {
            CLOSE: document.querySelector('.settings__close')
        }
    },
    AUTHORIZATION: {
        BLOCK: document.querySelector('.authorization'),
        FORM: document.querySelector('.authorization__form'),
        INPUT: document.querySelector('.authorization__input'),
        BUTTONS: {
            CLOSE: document.querySelector('.authorization__close')
        }
    },
    ACCEPT: {
        BLOCK: document.querySelector('.accept'),
        FORM: document.querySelector('.accept__form'),
        INPUT: document.querySelector('.accept__input'),
        BUTTONS: {
            CLOSE: document.querySelector('.accept__close')
        }
    },
    BACKGROUND_MODAL_WINDOW: document.querySelector('.background-modal_window')
}