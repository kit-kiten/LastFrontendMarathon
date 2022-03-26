export const storage = {
    createCitiesList : () => {
        if (localStorage.getItem('citiesList') === null){
            localStorage.setItem('citiesList', JSON.stringify([]))
        }
    },

    saveFavoriteCities : (cityName) => {
        const favoriteCities = JSON.parse(localStorage.getItem('citiesList'))

        favoriteCities.push(cityName)
        localStorage.setItem('citiesList', JSON.stringify(favoriteCities))
    },

    deleteFavoriteCity : (cityName) => {
        const favoriteCities = JSON.parse(localStorage.getItem('citiesList'))
        const indexCityName = favoriteCities.findIndex(item => item === cityName)

        if (indexCityName !== -1) {
            favoriteCities.splice(indexCityName, 1)
        }

        localStorage.setItem('citiesList', JSON.stringify(favoriteCities))
    },

    getFavoriteCities : () => {
        return JSON.parse(localStorage.getItem('citiesList'))
    }
}