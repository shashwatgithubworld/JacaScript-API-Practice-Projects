const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibilityDistance = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".discription-text");
const date = document.querySelector(".date");
const weatherIcon = document.querySelector(".weather-icon")

const apiKey = `4ee950fa26db59187a97a02b7582d413`;

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch weather data!");
    }
    const data = await response.json();
    // console.log(data);
    updateWeatherUI(data);
} catch (err) {
    console.log("Please Try again")
}
}

function updateWeatherUI(data) {
  city.textContent = data.name;
  temp.textContent = `${Math.round(data.main.temp)}°c`;
  windSpeed.textContent = `${data.wind.speed} Km/h`;
  humidity.textContent = `${data.main.humidity}%`;
  visibilityDistance.textContent = `${data.visibility / 1000} km`;
  descriptionText.textContent = data.weather[0].description;

  const currentDate = new Date();
  date.textContent = currentDate.toDateString();
  const weatherIconName = getWeatherIconName(data.weather[0].main)
  weatherIcon.innerHTML = `<i class="fa-solid fa-${weatherIconName}"></i>`
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = inputElement.value;
  if (city !== "") {
    fetchWeatherData(city);
    inputElement.value = "";
  }
});

function getWeatherIconName(weatherCondition){

    const iconMap = {
        Clear: "cloud-sun",
        Cloud: "cloud",
        Rain: "cloud-rain",
        Thunderstorm: "cloud-bolt",
        Drizzle: "cloud-rain",
        Snow: "snowflake",
        Mist: "cloud-sun-rain",
        Smoke: "smog",
        Haze: "cloud-sun",
        Fog: "smog",

    }

    return iconMap[weatherCondition] || "cloud-sun-rain"
}
