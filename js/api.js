import {
  API_KEY,
  WEATHER_BASE_URL,
  FORECAST_BASE_URL,
  AIR_POLLUTION_URL
} from "../data/constants.js";

// Get current weather by city name
export async function fetchWeatherByCity(city, unit = "metric") {
  const url = `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}&units=${unit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");

  const data = await res.json();
  return data;
}

// Get forecast by city name
export async function fetchForecastByCity(city, unit = "metric") {
  const url = `${FORECAST_BASE_URL}?q=${city}&appid=${API_KEY}&units=${unit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast fetch failed");

  const data = await res.json();
  return data;
}

// Get pollution data by lat/lon
export async function fetchPollution(lat, lon) {
  const url = `${AIR_POLLUTION_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Pollution data fetch failed");

  const data = await res.json();
  return data;
}

// ✅ Get weather by coordinates
export async function fetchWeatherByCoords(lat, lon, unit = "metric") {
  const url = `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch by coordinates failed.");
  return await res.json();
}

// ✅ Get forecast by coordinates
export async function fetchForecastByCoords(lat, lon, unit = "metric") {
  const url = `${FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast fetch by coordinates failed.");
  return await res.json();
}
