import {UI_ELEMENTS} from "./view.mjs"
import {storage} from "./storage.mjs";
import { compareAsc, format } from 'date-fns'

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/'
const PAGE_WEATHER = 'weather'
const PAGE_FORECAST = 'forecast'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f'

storage.createCitiesListAndDefaultCity()

function getCelsius(temperature){
    return (temperature - 273).toFixed(0)
}

function DeleteActiveClassesTabs(){
    UI_ELEMENTS.TABS.forEach(tab => tab.classList.remove('main-tabs__block--active'))
    UI_ELEMENTS.TABS_BUTTONS.forEach(tabBtn => tabBtn.classList.remove('main-tabs__item--active'))
}

function AddActiveClassesTabs(currentTab, tabBtn){
    currentTab.classList.add('main-tabs__block--active')
    tabBtn.classList.add('main-tabs__item--active')
}

function getResponse(cityName, page){
    const url = `${SERVER_URL + page}?q=${cityName}&appid=${API_KEY}`
    return fetch(url).then(response => response.json())
}

function changeCityTitles(json){
    UI_ELEMENTS.CITY_TITLES.forEach(cityTitle => {
        json.then(result => cityTitle.textContent = result.name)
    })
}

function changeWeatherInformation(json){
    json.then(result => {
        const sunriseTime = new Date(result.sys.sunrise * 1000)
        const sunsetTime = new Date(result.sys.sunset * 1000)

        UI_ELEMENTS.TEMPERATURE_NOW.textContent = getCelsius(result.main.temp) + '°'
        UI_ELEMENTS.TEMPERATURE_DETAILS.textContent = `Temperature: ${getCelsius(result.main.temp)}°`
        UI_ELEMENTS.TEMPERATURE_DETAILS_FEELS.textContent = `Feels like: ${getCelsius(result.main.feels_like)}°`
        UI_ELEMENTS.WEATHER.textContent = `Weather: ${result.weather[0].main}`
        UI_ELEMENTS.SUNRISE.textContent = `Sunrise: ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`
        UI_ELEMENTS.SUNSET.textContent = `Sunset: ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`

        checkFavoriteCity(result.name)
    }).catch(() => alert('Error'))
}

function changeForecastInformation(json){
    const forecastItems = document.querySelectorAll('.weather-forecast__list-item')

    for (let forecastItem of forecastItems){
        forecastItem.remove()
    }

    json.then(result => {
        for (let item of result.list){
            const date = new Date(item.dt * 1000)
            const li = document.createElement('li')

            li.className = 'weather-forecast__list-item'
            li.innerHTML = `<div class="weather-forecast__top">
                                        <p class="weather-forecast__text">${format(date, 'd MMMM')}</p>
                                        <p class="weather-forecast__text">${format(date, 'HH:mm')}</p>
                                    </div>
                                    <div class="weather-forecast__bottom">
                                        <div class="weather-forecast__parameters">
                                            <p class="weather-forecast__text">
                                                Temperature: ${getCelsius(item.main.temp)}°
                                            </p>
                                            <p class="weather-forecast__text">
                                                Feels like: ${getCelsius(item.main.feels_like)}°
                                            </p>
                                        </div>
                                        <div class="weather-forecast__precipitation">
                                            <p class="weather-forecast__text">
                                                ${item.weather[0].main}
                                            </p>
                                        </div>
                                    </div>`
            UI_ELEMENTS.FORECAST_BLOCK.append(li)
        }
    })
}

function createCityElement(cityName){
    const li = document.createElement('li')

    li.className = 'city-list__item'
    li.innerHTML = `<button class="city-list__item-btn">${cityName}</button>
                            <button class="city-list__item-close"></button>`
    UI_ELEMENTS.CITY_BLOCK.append(li)
}

function addEventListenersUIElements(){
    const closeButtons = document.querySelectorAll('.city-list__item-close')
    for (let closeBtn of closeButtons){
        closeBtn.addEventListener('click', () => {
            const cityName = closeBtn.previousElementSibling.textContent

            storage.deleteFavoriteCity(cityName)
            closeBtn.parentElement.remove()
            checkFavoriteCity(cityName)
        })
    }

    const openCityButtons = document.querySelectorAll('.city-list__item-btn')
    for (let openCityBtn of openCityButtons){
        openCityBtn.addEventListener('click', () => {
            const cityName = openCityBtn.textContent
            const jsonWeather = getResponse(cityName, PAGE_WEATHER)
            const jsonForecast = getResponse(cityName, PAGE_FORECAST)

            changeCityTitles(jsonWeather)
            changeWeatherInformation(jsonWeather)
            changeForecastInformation(jsonForecast)
            storage.changeCurrentCity(cityName)

            UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
        })
    }
}

function checkFavoriteCity(cityName) {
    const getFavoriteCities = storage.getFavoriteCities()

    if (getFavoriteCities.has(cityName)){
        UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
    } else{
        UI_ELEMENTS.HEART_BTN.classList.remove('weather-now__btn--active')
    }
}

UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', () => {
    const cityName = UI_ELEMENTS.INPUT_SEARCH.value
    const jsonWeather = getResponse(cityName, PAGE_WEATHER)
    const jsonForecast = getResponse(cityName, PAGE_FORECAST)

    changeCityTitles(jsonWeather)
    changeWeatherInformation(jsonWeather)
    changeForecastInformation(jsonForecast)
    storage.changeCurrentCity(cityName)
})

UI_ELEMENTS.HEART_BTN.addEventListener('click', () => {
    const isNotActiveClass = UI_ELEMENTS.HEART_BTN.className !== 'weather-now__btn weather-now__btn--active'
    const cityName = UI_ELEMENTS.HEART_BTN.previousElementSibling.textContent

    if (isNotActiveClass){
        createCityElement(cityName)
        storage.saveFavoriteCities(cityName)
        addEventListenersUIElements()

        UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
    }
})

for (let tabBtn of UI_ELEMENTS.TABS_BUTTONS){
    tabBtn.addEventListener('click', () => {
        const idForTab = tabBtn.getAttribute('href')
        const currentTab = document.querySelector(idForTab)

        DeleteActiveClassesTabs()
        AddActiveClassesTabs(currentTab, tabBtn)
    })
}

window.onload = () => {
    const favoriteCities = storage.getFavoriteCities()
    const currentCity = storage.getCurrentCity()
    const jsonWeather = getResponse(currentCity, PAGE_WEATHER)
    const jsonForecast = getResponse(currentCity, PAGE_FORECAST)

    favoriteCities.forEach(favoriteCity => {
        createCityElement(favoriteCity)
        addEventListenersUIElements()

        if (favoriteCity === currentCity){
            UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
        }
    })

    changeCityTitles(jsonWeather)
    changeWeatherInformation(jsonWeather)
    changeForecastInformation(jsonForecast)
}
