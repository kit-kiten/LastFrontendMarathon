export const storage = {
    createCitiesListAndDefaultCity : () => {
        if (JSON.parse(localStorage.getItem('citiesList')) === null){
            const favoriteCities = new Set()
            localStorage.setItem('citiesList', JSON.stringify([...favoriteCities]))
        }
        if (JSON.parse(localStorage.getItem('currentCity')) === null){
            localStorage.setItem('currentCity', JSON.stringify('Vladivostok'))
        }
    },

    saveFavoriteCities : (cityName) => {
        const favoriteCities = new Set(JSON.parse(localStorage.getItem('citiesList')))

        favoriteCities.add(cityName)
        console.log(favoriteCities)
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
        localStorage.setItem('currentCity', JSON.stringify(cityName))
    },

    getCurrentCity : () => {
        return JSON.parse(localStorage.getItem('currentCity'))
    }
}