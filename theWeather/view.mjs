const TABS_BUTTONS = document.querySelectorAll('.main-tabs__item')
const TABS = document.querySelectorAll('.main-tabs__block')
const FORM_SEARCH = document.querySelector('.search-form')
const INPUT_SEARCH = document.querySelector('.search__input')
const WEATHER_TITLE = document.querySelector('.weather-title')
const WEATHER_TEMPERATURE = document.querySelector('.weather-now__temperature')

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'

function getCelsius(temperature){
    return (temperature - 273).toFixed(0)
}

for (let tabBtn of TABS_BUTTONS){
    tabBtn.addEventListener('click', () => {
        const idForTab = tabBtn.getAttribute('href')
        const currentTab = document.querySelector(idForTab)

        TABS.forEach(tab => tab.classList.remove('main-tabs__block--active'))
        currentTab.classList.add('main-tabs__block--active')

        TABS_BUTTONS.forEach(tabBtn => tabBtn.classList.remove('main-tabs__item--active'))
        tabBtn.classList.add('main-tabs__item--active')
    })
}

FORM_SEARCH.addEventListener('submit', () => {
    const cityName = INPUT_SEARCH.value
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`

    const json = fetch(url)
                    .then(response => response.json())

    json.then(result => WEATHER_TITLE.textContent = result.name)

    json.then(result => WEATHER_TEMPERATURE.textContent = getCelsius(result.main.temp) + '°')

    console.log(json)

})



