const searchPlaceEl = document.querySelector(".search-place");
const searchBtn = document.querySelector(".search-icon");
const weatherImgEl = document.querySelector(".weather-img");
const temperatureEl = document.querySelector(".weather-deg");
const humidityEl = document.querySelector(".humidity");
const windSpeedEl = document.querySelector(".wind-speed");
const countryNameEl = document.querySelector(".place");
const weatherDescEl = document.querySelector(".weather-description");
const errorMsgEl = document.querySelector(".error-msg");
const removeErrorMsgBtn = document.querySelector(".remove-btn");

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

//////////////// FUNCTIONS //////////////////

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

const displayDetails = async function (data, country) {
  const countryWeather = data.weather[0];
  const { description, icon } = countryWeather;
  const { temp: kelvin, humidity } = data.main;
  const { speed: windSpeed } = data.wind;
  const celcius = Math.floor(kelvin - 273);
  temperatureEl.textContent = `${celcius}°C`;
  countryNameEl.textContent = country[0].toUpperCase().concat(country.slice(1));
  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${windSpeed} km/h`;
  weatherDescEl.textContent = description;

  const imgUrl = await renderWeatherImg(icon);
  weatherImgEl.src = imgUrl;
};

const renderWeatherDetails = function (data, country) {
  displayDetails(data, country);
};

const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) throw new Error("The country can not be found");
    const data = await response.json();
    return data;
  } catch (err) {
    errorMsgEl.classList.remove("hidden");
    errorMsgEl.firstChild.textContent = `Something went Wrong, ${err.message}, Try Again`;
  }
};

const getPosition = async function (country) {
  try {
    const data = await getJSON(
      `https://restcountries.com/v3.1/name/${country}`
    );
    return data[0];
  } catch (err) {}
};

const getWeatherData = async function (country) {
  try {
    const pos = await getPosition(country);

    const [lat, lng] = pos.latlng;
    const apiKey = `49a192416257fecea9d2a35770e556c0`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

    const data = await getJSON(url);
    renderWeatherDetails(data, country);
  } catch (err) {}
};

////////////////////// EVENTS //////////////
searchPlaceEl.addEventListener("input", function (e) {
  countryName = searchPlaceEl.value;
});

searchBtn.addEventListener("click", function () {
  getWeatherData(countryName);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") getWeatherData(countryName);
});

removeErrorMsgBtn.addEventListener("click", function () {
  errorMsgEl.classList.add("hidden");
});

// DEFAULT COUNTRY WEATHER
getWeatherData("France");
