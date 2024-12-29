const inputForm = document.querySelector(".inputForm");
const cityName = document.querySelector(".cityName");
const weatherDetails = document.querySelector(".weatherDetails");
const apiKey = "994f4c98a70738345381f4eff82aab81";

inputForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityName.value;

    if(city){

        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city!");
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Couldn't fetch the data");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
            main: {temp,humidity}, 
            weather: [{description,id}]} = data;

    console.log(data);

    weatherDetails.textContent = "";
    weatherDetails.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const temperature = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    temperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityName");
    temperature.classList.add("temperature");
    humidityDisplay.classList.add("humidity");
    descDisplay.classList.add("description");
    weatherEmoji.classList.add("weatherEmoji");


    weatherDetails.appendChild(cityDisplay);
    weatherDetails.appendChild(temperature);
    weatherDetails.appendChild(humidityDisplay);
    weatherDetails.appendChild(descDisplay);
    weatherDetails.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "☔";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId > 800):
            return "☁️";
        default:
            return "❓";
    }

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weatherDetails.textContent = "";
    weatherDetails.style.display = "flex";
    weatherDetails.appendChild(errorDisplay);

}

