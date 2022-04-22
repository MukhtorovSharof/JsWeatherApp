const api = {
  key: "8f3ce483b7772584099588428631316a",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = (document.querySelector(".location .city").innerHTML =
    weather.name);
  let country = (document.querySelector(".country").innerHTML =
    weather.sys.country);

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);
  let temp = (document.querySelector(".temp").innerHTML = Math.round(
    weather.main.temp - 273
  ));
  let differentWeather = (document.querySelector(".weather").innerHTML =
    weather.weather[0].main);
  let minTemp = (document.querySelector(".minTemp").innerHTML = Math.round(
    weather.main.temp_min - 273
  ));
  let maxTemp = (document.querySelector(".maxTemp").innerHTML = Math.round(
    weather.main.temp_max - 273
  ));
}

function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = week[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
