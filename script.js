const apiKey = 'fcc8de7015bbb202209bbf0261babf4c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
  console.log(response)
  const data = await response.json();

  if (response.ok) {
    displayWeather(data);
  } else {
    alert("City not found!");
  }
}

function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description, icon } = data.weather[0];
  const { speed } = data.wind;

  document.getElementById('cityName').innerText = name;
  document.getElementById('temp').innerText = `${Math.round(temp)}°C`;
  document.getElementById('humidity').innerText = humidity;
  document.getElementById('description').innerText = description;
  document.getElementById('windSpeed').innerText = speed;
  document.getElementById('icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
}

async function toggleForecast() {
  const city = document.getElementById('cityInput').value;
  const response = await fetch(`${forecastUrl}${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (response.ok) {
    displayForecast(data);
  } else {
    alert("City not found!");
  }
}

function displayForecast(data) {
  const forecastDiv = document.getElementById('forecastData');
  forecastDiv.classList.toggle('hidden');
  forecastDiv.innerHTML = ''; // clear previous forecast

  const forecastList = data.list.filter((item, index) => index % 8 === 0); // 5-day forecast

  forecastList.forEach(forecast => {
    const date = new Date(forecast.dt_txt).toLocaleDateString();
    const temp = Math.round(forecast.main.temp);
    const desc = forecast.weather[0].description;
    const icon = forecast.weather[0].icon;

    const forecastItem = `
      <div class="forecast-item">
        <p>${date}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>${temp}°C</p>
        <p>${desc}</p>
      </div>
    `;
    forecastDiv.innerHTML += forecastItem;
  });
}
//hello