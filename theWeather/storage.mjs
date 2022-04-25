import Cookies from 'js-cookie'

export const storage = {
    createCitiesListAndDefaultCity : () => {
        if (JSON.parse(localStorage.getItem('citiesList')) === null){
            const favoriteCities = new Set()
            localStorage.setItem('citiesList', JSON.stringify([...favoriteCities]))
        }
        if (Cookies.get('currentCity') === undefined){
            Cookies.set('currentCity', 'Vladivostok')
        }
    },

    saveFavoriteCities : (cityName) => {
        const favoriteCities = new Set(JSON.parse(localStorage.getItem('citiesList')))

        favoriteCities.add(cityName)
        localStorage.setItem('citiesList', JSON.stringify([...favoriteCities]))
    },

    deleteFavoriteCity : (cityName) => {
        const favoriteCities = new Set(JSON.parse(localStorage.getItem('citiesList')))
        favoriteCities.delete(cityName)

        localStorage.setItem('citiesList', JSON.stringify([...favoriteCities]))
    },

    getFavoriteCities : () => {
        return new Set(JSON.parse(localStorage.getItem('citiesList')))
    },

    changeCurrentCity : (cityName) => {
        const cookieTime = 1 / 24
        Cookies.set('currentCity', cityName, {expires: cookieTime})
    },

    getCurrentCity : () => {
        return Cookies.get('currentCity')
    }
}