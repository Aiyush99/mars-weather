const API_KEY = "oxpEqhfNExgEqr9N9ORR2JFPksvUZ6KyWYGh6xVh"
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`


const previousWeatherToggle = document.querySelector('.show-previous-weather');

const previousWeather = document.querySelector('.previous-weather')

const currentSolElement = document.querySelector(`[data-current-sol]`)
const currentDateElement = document.querySelector(`[data-current-date]`)
const currentTempHighElement = document.querySelector(`[data-current-temp-high]`)
const currentTempLowElement = document.querySelector(`[data-current-temp-low]`)
const WindSpeedElement = document.querySelector(`[data-wind-speed]`)
const WindDirectionArrow = document.querySelector(`[data-wind-direction-arrow]`)
const WindDirectionText = document.querySelector(`[data-wind-direction-text]`)







previousWeatherToggle.addEventListener('click', () => {
    previousWeather.classList.toggle('show-weather')
} )

let selectedSolIndex

getWeather().then(sols =>{
    selectedSolIndex = sols.length - 1
    displaySelectedSols(sols)
})

function displaySelectedSols(sols){
    const selectedSol = sols[selectedSolIndex]
    currentSolElement.innerText = selectedSol.sol;
    currentDateElement.innerText = selectedSol.date;
    currentTempHighElement.innerText = selectedSol.maxTemp;
    currentTempLowElement.innerText = selectedSol.minTemp;
    WindSpeedElement.innerText = selectedSol.windSpeed;
    WindDirectionArrow.style.setProperty('...direction',`${selectedSol.windDirectionDegrees}deg`)
    WindDirectionText.innerText = selectedSol.windDirectionCardinal

}

function getWeather(){
    return fetch(API_URL)
    .then(res => res.json())
    .then(data =>{
        const {
            sol_keys,
            validity_checks,
            ...solData
        } = data
        return Object.entries(solData).map(([sol,data])=>{
            return{
                sol:sol,
                maxTemp:data.AT.mx,
                minTemp:data.AT.mn,
                windSpeed:data.HWS.av,
                windDirectionDegrees:data.WD.most_common.compass_degrees,
                windDirectionCardinal:data.WD.most_common.compass_point,
                date:new Date(data.First_UTC)
            }
        })
        
    })
}
