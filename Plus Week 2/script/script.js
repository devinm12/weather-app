function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];

  return `${day} <br /> ${hour}:${minutes}`;
}

let now = new Date();

let currentDate = document.querySelector("#date");

currentDate.innerHTML = formatDate(now);

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let temperature = Math.round(response.data.main.temp);

  let currentTemperatureElement = document.querySelector("#temperature");
  currentTemperatureElement.innerHTML = `${temperature}`;
}

function searchCity(city) {
  /*event.preventDefault();
  let searchBar = document.querySelector("#location-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchBar.value}`;*/

  //let city = `${searchBar.value}`;
  let weatherApiKey = "b40b135798f82a05aed08769f9275f50";
  let unit = "metric";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=${unit}`;
  axios.get(weatherUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let weatherApiKey = "b40b135798f82a05aed08769f9275f50";
  let unit = "metric";

  let latLonUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${unit}`;
  //console.log(latLonUrl);
  //let h1 = document.querySelector("h1");
  //h1.innerHTML = `${position.name}`;
  //console.log(position.coords.name);

  axios.get(`${latLonUrl}`).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

searchCity("New York");

/*function convertUnits(event) {
  let celsius = document.querySelector("#celsius-link");
  let temperature = document.querySelector("#temperature");
  let fahrenheit = (celsius * 9) / 5 + 32;

  temperature.innerHTML = `${fahrenheit}`;
  // document.querySelector("#fahrenheit-link");

  //currentTemperature= (${celsius} * 9/5) + 32
}

let currentTemperature = document.querySelector("#fahrenheit-link");
currentTemperature.addEventListener("click", convertUnits);
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = 12;
}

console.log(temperature);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);*/
