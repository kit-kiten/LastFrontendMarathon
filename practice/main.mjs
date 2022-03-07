const inputName = document.querySelector('.main-input')
const submitOnServer = document.querySelector('.main-btn')
const serverUrl =  'https://api.genderize.io'

submitOnServer.addEventListener('click', function () {
    const firstName = inputName.value
    const url = `${serverUrl}?name=${firstName}`
    fetch(url)
        .then(response => response.json())
        .then(result => alert(`${firstName} - ${result.gender}`))
})