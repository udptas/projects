const form = document.querySelector('form');
const searchField = document.querySelector('.searchField');
const apikey = "1fbfb0a69c7749bf816181553252807";

const temperatureField = document.querySelector('.temp');
const locationField = document.querySelector('.location');
const datetimeField = document.querySelector('.time_location span');
const weatherIcon = document.querySelector('.weather-icon img');
const weatherCondition = document.querySelector('.weather_condition span');

const detailNodeList = document.querySelectorAll('.detail-item');
console.log(detailNodeList);

let target = "Mumbai";

// console.log(form)

form.addEventListener('submit', search);

function search(e){
    e.preventDefault();
    // console.log("Event Submitted");
    target = searchField.value;
    console.log(target);
    fetchData(target);
}


async function fetchData(target){
    try{
        const endpoint = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${target}&aqi=no`;
        // console.log(endpoint);
        const response  = await fetch(endpoint);
        const data = await response.json();
        
        // console.log(response);
        console.log(data);
        
        let currTemp = data.current.temp_c;
        let cityName = data.location.name;
        let condition = data.current.condition.text;
        let localTime = data.location.localtime;
        let feelsLike = data.current.feelslike_c;
        let humidity = data.current.humidity;
        let wind = data.current.wind_kph;
        let visibility = data.current.vis_km;
        let uvIndex = data.current.uv;
        let pressure = data.current.pressure_mb;
        let conditionIcon = data.current.condition.icon;
        console.log(currTemp);
        updateCard(currTemp, cityName, localTime, conditionIcon, condition, feelsLike, humidity, wind, visibility, uvIndex, pressure);
    }
    catch(error){
        console.log(error);
    }
}

function updateCard(
    currTemp, 
    cityName, 
    localTime, 
    conditionIcon, 
    condition,
    feelsLike, 
    humidity, 
    wind, 
    visibility,
    uvIndex,
    pressure){

    // console.log(conditionIcon);

    temperatureField.innerText = currTemp + '°';
    locationField.innerText = cityName;
    datetimeField.innerText = localTime;
    weatherIcon.src = 'http://' + conditionIcon;
    weatherCondition.innerText = condition;

    for(let i=0; i<detailNodeList.length; i++){
        console.log(detailNodeList[i]);
        if(detailNodeList[i].querySelector('.label').textContent =='Feels like'){
            detailNodeList[i].querySelector('.value').textContent = feelsLike;
        }
        if(detailNodeList[i].querySelector('.label').textContent =='Humidity'){
            detailNodeList[i].querySelector('.value').textContent = humidity;
        }
        if(detailNodeList[i].querySelector('.label').textContent =='Wind'){
            detailNodeList[i].querySelector('.value').textContent = wind;
        }
        if(detailNodeList[i].querySelector('.label').textContent =='Visibility'){
            detailNodeList[i].querySelector('.value').textContent = visibility;
        }
        if(detailNodeList[i].querySelector('.label').textContent =='UV Index'){
            detailNodeList[i].querySelector('.value').textContent = uvIndex;
        }
        if(detailNodeList[i].querySelector('.label').textContent =='Pressure'){
            detailNodeList[i].querySelector('.value').textContent = pressure;
        }
    }

    searchField.value = " ";

}
