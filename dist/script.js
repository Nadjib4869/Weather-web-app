const time1= document.getElementsByClassName('time');
const date1= document.getElementsByClassName('date');
const currWeatherItems1= document.getElementsByClassName('curr-weather-item');
const timeZone= document.getElementsByClassName('time-zone');
const country1= document.getElementsByClassName('country');
const weatherForecast1= document.getElementsByClassName('weather-forecast');
const currTemp1= document.getElementsByClassName('today');

// Hour + Date
const days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];

const API_KEY= '49cc8c821cd2aff9af04c9f98c36eb74';
const API_URL= 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Blida';

//!
async function getWeather(){
    const res= await fetch(API_URL + '&appid=' + API_KEY);
    const data= await res.json();
    console.log(data)
    showWeatherData(data);
}

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    time1[0].innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes : minutes) + ' ' + `<span class="am-pm text-3xl ml-2">${ampm}</span>`
    date1[0].innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);
//!
getWeather();
getWeatherData();
// Weather Data
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData(data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timeZone[0].innerHTML = data.timezone;
    country1[0].innerHTML = data.lat + 'N ' + data.lon + 'E';

    currWeatherItems1[0].innerHTML = 
    `<div class="weather-item flex justify-between">
    <div>Humidity</div>
    <div>${humidity}%</div>
    </div>
    <div class="weather-item flex justify-between">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item flex justify-between">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item flex justify-between">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item flex justify-between">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>`;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currTemp1[0].innerHTML = 
            `<img class="w-24" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon">
            <div class="other">
            <div class="day px-4 py-1 bg-[#3c3c44] rounded-xl text-center">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="text-lg pt-4">Day ~ ${day.temp.day}&#176; C</div>
            <div>Night ~ ${day.temp.night}&#176; C</div>`
        }else{
            otherDayForcast += 
            `<div class="weather-forecast-item border-white border-2 rounded-lg p-3 mx-4">
                <div class="day  px-4 py-1 bg-[#3c3c44] rounded-xl text-center">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img class="w-24" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon">
                <div class="font-thin">Day ~ ${day.temp.day}&#176; C</div>
                <div class="font-thin">Night ~ ${day.temp.night}&#176; C</div>
            </div>`
        }

    })
    
    weatherForecast1[0].innerHTML = otherDayForcast;

}