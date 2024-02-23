const searchPlaceEl = document.querySelector(".search-place");
const searchBtn = document.querySelector(".search-icon");
const weatherImgEl = document.querySelector(".weather-img");
const temperatureEl = document.querySelector(".weather-deg");
const humidityEl = document.querySelector(".humidity");
const windSpeedEl = document.querySelector(".wind-speed");
const countryNameEl = document.querySelector(".place");
const weatherDescEl = document.querySelector(".weather-description");

let countryName = "";

const weatherCode = [
  "01n",
  "02n",
  "03n",
  "04n",
  "09n",
  "10n",
  "11n",
  "13n",
  "50n",
  "01d",
  "02d",
  "03d",
  "04d",
  "09d",
  "10d",
  "11d",
  "13d",
  "50d",
];

const renderWeatherImg = function (code) {
  return new Promise(function (resolve, reject) {
    const matchCode = weatherCode.find((cod) => cod === code);

    if (matchCode) {
      resolve(`weather/${matchCode}.png`);
    } else {
      reject("invalid code");
    }
  });
};

const displayDetails = async function (data) {
  const countryWeather = data.weather[0];
  const { description, icon } = countryWeather;
  const { temp: kelvin, humidity } = data.main;
  const { speed: windSpeed } = data.wind;
  const celcius = Math.floor(kelvin - 273);
  temperatureEl.textContent = `${celcius}°C`;
  countryNameEl.textContent = countryName[0]
    .toUpperCase()
    .concat(countryName.slice(1));
  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${windSpeed} km/h`;
  weatherDescEl.textContent = description;

  const imgUrl = await renderWeatherImg(icon);
  weatherImgEl.src = imgUrl;
};

const renderWeatherDetails = function (data) {
  displayDetails(data);
};

const getJSON = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getPosition = async function (country) {
  const data = await getJSON(`https://restcountries.com/v3.1/name/${country}`);
  return data[0];
};

const getWeatherData = async function (country) {
  const pos = await getPosition(country);

  const [lat, lng] = pos.latlng;
  const apiKey = `49a192416257fecea9d2a35770e556c0`;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

  const data = await getJSON(url);
  renderWeatherDetails(data);
};

getWeatherData("pakistan");

searchPlaceEl.addEventListener("input", function (e) {
  countryName = searchPlaceEl.value;
});

searchBtn.addEventListener("click", function () {
  getWeatherData(countryName);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") getWeatherData(countryName);
});
