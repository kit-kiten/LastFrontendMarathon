import {UI_ELEMENTS} from "./view.mjs"

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'

function getCelsius(temperature){
    return (temperature - 273).toFixed(0)
}

function DeleteActiveClassesTabs(){
    UI_ELEMENTS.TABS.forEach(tab => tab.classList.remove('main-tabs__block--active'))
    UI_ELEMENTS.TABS_BUTTONS.forEach(tabBtn => tabBtn.classList.remove('main-tabs__item--active'))
}

for (let tabBtn of UI_ELEMENTS.TABS_BUTTONS){
    tabBtn.addEventListener('click', () => {
        const idForTab = tabBtn.getAttribute('href')
        const currentTab = document.querySelector(idForTab)

        DeleteActiveClassesTabs()

        currentTab.classList.add('main-tabs__block--active')
        tabBtn.classList.add('main-tabs__item--active')
    })
}

UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', () => {
    const cityName = UI_ELEMENTS.INPUT_SEARCH.value
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`

    const json = fetch(url).then(response => response.json())

    UI_ELEMENTS.WEATHER_TITLES.forEach(weatherTitle => {
        json.then(result => weatherTitle.textContent = result.name)
    })

    json.then(result => UI_ELEMENTS.WEATHER_TEMPERATURE.textContent = getCelsius(result.main.temp) + '°')
})

UI_ELEMENTS.HEART_BTN.addEventListener('click', () => {
    const isActiveClass = UI_ELEMENTS.HEART_BTN.className === 'weather-now__btn weather-now__btn--active'

    if (isActiveClass){
        UI_ELEMENTS.HEART_BTN.classList.remove('weather-now__btn--active')
    } else {
        UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
    }

})