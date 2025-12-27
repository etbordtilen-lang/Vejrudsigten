function displayTemperature(response) {
  //console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  currentDateELement.innerHTML = formatDate(currentDate);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${windSpeed} km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "fe3at4b9ob076b4e8c6aecc0604ae6d6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fe3at4b9ob076b4e8c6aecc0604ae6d6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div><img src="${
      day.condition.icon_url
    }" class="weather-forecast-icon" /></div>
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temp"><strong>${Math.round(
      day.temperature.maximum
    )}°</strong></div>
    <div class="weather-forecast-temp">${Math.round(
      day.temperature.minimum
    )}°</div>
    </div>
    </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#five-day-forecast");
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
