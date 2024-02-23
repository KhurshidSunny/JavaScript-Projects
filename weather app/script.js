const searchPlaceEl = document.querySelector(".search-place");
const searchBtn = document.querySelector(".search-icon");
const weatherImgEl = document.querySelector(".weather-img");

let cityName = "";

const renderWeatherImg = function () {
  return new Promise(function (resolve, reject) {
    resolve(weatherImgEl.src);
  });
};

const renderWeatherDetails = function (data) {
  const countryName = data.name;
  const countryWeather = data.weather[0];
  const { _, gust, speed } = data.wind;
  console.log(countryWeather);
};

const getPosition = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  return data[0];
};

const getWeatherData = async function (country) {
  const pos = await getPosition(country);
  console.log(pos);
  const [lat, lng] = pos.latlng;
  console.log(lat, lng);

  const apiKey = `49a192416257fecea9d2a35770e556c0`;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  renderWeatherDetails(data);
  console.log(data);
};

searchPlaceEl.addEventListener("input", function (e) {
  cityName = searchPlaceEl.value;
});

searchBtn.addEventListener("click", function () {
  getWeatherData(cityName);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") getWeatherData(cityName);
});
