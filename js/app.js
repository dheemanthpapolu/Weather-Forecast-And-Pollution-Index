import { renderTempTrendChart } from "./chart.js";

let currentUnit = "metric";
let lastSearchedCity = null;
let lastWeatherData = null;
let lastForecastData = null;
let lastPollutionData = null;

const toggleUnitBtn = document.getElementById("toggleUnits");

toggleUnitBtn.addEventListener("click", () => {
  // Toggle unit flag
  currentUnit = currentUnit === "metric" ? "imperial" : "metric";
  toggleUnitBtn.textContent = currentUnit === "imperial" ? "🌡 Use °C" : "🌡 Use °F";

  // If we already have data, re-render it in the new unit
  if (lastWeatherData && lastForecastData && lastPollutionData) {
    clearStatusMessage();
    showStatusMessage(`Switched to ${currentUnit === "metric" ? "°C" : "°F"}`);
    renderWeatherCard(lastWeatherData, currentUnit);
    renderForecastGrid(lastForecastData, currentUnit);
    renderAQICard(lastPollutionData);
    renderTempTrendChart(lastForecastData, currentUnit); // ✅ chart rerender
    clearStatusMessage();
  } else {
    showStatusMessage("Please search a city first.");
  }
});

import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchPollution,
  fetchWeatherByCoords,
  fetchForecastByCoords
} from "./api.js";

import {
  renderWeatherCard,
  renderForecastGrid,
  renderAQICard,
  showStatusMessage,
  clearStatusMessage
} from "./dom.js";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showStatusMessage("Please enter a city name.");
    return;
  }
  cityInput.value = "";
  lastSearchedCity = city;

  clearStatusMessage();
  showStatusMessage("Fetching data...");

  try {
    // 1. Get current weather
    const weatherData = await fetchWeatherByCity(city, currentUnit);
    renderWeatherCard(weatherData, currentUnit);
    lastWeatherData = weatherData;

    // 2. Get forecast
    const forecastData = await fetchForecastByCity(city, currentUnit);
    renderForecastGrid(forecastData, currentUnit);
    renderTempTrendChart(forecastData, currentUnit); // ✅ draw chart
    lastForecastData = forecastData;

    // 3. Get pollution data (needs lat/lon)
    const { lat, lon } = weatherData.coord;
    const pollutionData = await fetchPollution(lat, lon);
    renderAQICard(pollutionData);
    lastPollutionData = pollutionData;

    clearStatusMessage();
  } catch (error) {
    showStatusMessage(error.message || "Something went wrong.");
  }
});

// Dark Mode Toggle
const toggleBtn = document.getElementById("toggleTheme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const dark = document.body.classList.contains("dark-mode");
  toggleBtn.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Use My Location
const useLocationBtn = document.getElementById("useLocationBtn");

useLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showStatusMessage("Geolocation is not supported by your browser.");
    return;
  }

  showStatusMessage("Getting your location...");

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      const weatherData = await fetchWeatherByCoords(latitude, longitude, currentUnit);
      lastWeatherData = weatherData;

      const forecastData = await fetchForecastByCoords(latitude, longitude, currentUnit);
      lastForecastData = forecastData;

      const pollutionData = await fetchPollution(latitude, longitude);
      lastPollutionData = pollutionData;

      renderWeatherCard(weatherData, currentUnit);
      renderForecastGrid(forecastData, currentUnit);
      renderTempTrendChart(forecastData, currentUnit); // ✅ chart for location
      renderAQICard(pollutionData);

      clearStatusMessage();
    } catch (err) {
      showStatusMessage("Failed to fetch location data.");
    }
  }, () => {
    showStatusMessage("Permission denied or failed to get location.");
  });
});
