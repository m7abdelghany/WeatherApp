
let today = document.getElementById("today"),
todayDate = document.getElementById("today-date"),
cityLocation = document.getElementById("location"),
todayDegree = document.getElementById("today-degree"),
todayIcon = document.getElementById("today-icon"),
description = document.getElementById("today-description"),
humidty = document.getElementById("humidty"),
wind = document.getElementById("wind"),
compass = document.getElementById("compass"),
searchBar = document.getElementById("search-bar"),
currentCity = "Cairo",
res,
finalRes,
date = new Date(),
weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];

let nextDay = document.getElementsByClassName("nextDay"),
    afterNextDay = document.getElementsByClassName("afterNextDay"),
    nextDate = document.getElementsByClassName("nextDate"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description");


async function getWeatherData() {
    res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
   finalRes = await res.json();
   console.log(finalRes);
   displayTodayWeather();
   displayNextdayWeather();
}
getWeatherData();
function displayTodayWeather(){
    let date = new Date();
    today.innerHTML=weekDays[date.getDay()];
    todayDate.innerHTML=`${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML =  finalRes.location.name ;
    todayDegree.innerHTML = finalRes.current.temp_c;
    todayIcon.setAttribute("src" ,`https:${finalRes.current.condition.icon}`)
    description.innerHTML = finalRes.current.condition.text;
    humidty.innerHTML = finalRes.current.humidity;
    wind.innerHTML = finalRes.current.wind_kph;
    compass.innerHTML =finalRes.current.wind_dir;
}
function displayNextdayWeather(){
    for( let i=0; i<nextDay.length;i++){
      nextDay[i].innerHTML= weekDays[new Date(finalRes.forecast.forecastday[i+1].date).getDay()];
       nextDayIcon[i].setAttribute('src',`https:${finalRes.forecast.forecastday[i+1].day.condition.icon}`)
       maxDegree[i].innerHTML = finalRes.forecast.forecastday[i+1].day.maxtemp_c;
       minDegree[i].innerHTML =finalRes.forecast.forecastday[i+1].day.mintemp_c;
       nextDayDescription[i].innerHTML =finalRes.forecast.forecastday[i+1].day.condition.text;
      }
    }

searchBar.addEventListener("keyup",function(){
    currentCity =searchBar.value;
    getWeatherData();

})