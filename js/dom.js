function formatDate(str) {
  const d = new Date(str);
  return `${d.toLocaleDateString(undefined, { weekday: "short" })} - ${d.getDate()}/${d.getMonth() + 1}`;
}

function formatTime(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Utility: Create DOM element
function el(tag, className = "", innerHTML = "") {
  const elem = document.createElement(tag);
  if (className) elem.className = className;
  if (innerHTML) elem.innerHTML = innerHTML;
  return elem;
}

// Show weather card
export function renderWeatherCard(data, unit) {
  const container = document.getElementById("weatherCard");
  container.innerHTML = "";

  const html = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡 Temp: ${formatTemp(data.main.temp, unit)} 
    (Feels like ${formatTemp(data.main.feels_like, unit)})</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${formatWind(data.wind.speed, unit)}</p>
    <p>🌅 Sunrise: ${formatTime(data.sys.sunrise)}</p>
    <p>🌇 Sunset: ${formatTime(data.sys.sunset)}</p>
    <p>🔍 Visibility: ${(data.visibility / 1000).toFixed(1)} km</p>
  `;
  container.innerHTML = html;
}

// Show 7-day forecast (really 5-day, 3-hr steps)
export function renderForecastGrid(data, unit) {
  const container = document.getElementById("forecastGrid");
  container.innerHTML = "";

  // Show one forecast per day (every 8th entry = 24 hours)
  for (let i = 0; i < data.list.length; i += 8) {
    const item = data.list[i];
    const card = el("div", "card");
    card.innerHTML = `
      <h4>${formatDate(item.dt_txt)}</h4>
      <p>${item.weather[0].main}</p>
      <p>🌡 ${formatTemp(item.main.temp_min, unit)} - ${formatTemp(item.main.temp_max, unit)}</p>
    `;
    container.appendChild(card);
  }
}

// Show AQI card
export function renderAQICard(data) {
  const container = document.getElementById("aqiCard");
  container.innerHTML = "";

  const aqi = data.list[0].main.aqi;
  const pm25 = data.list[0].components.pm2_5;
  const pm10 = data.list[0].components.pm10;

  const levels = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];
  const colors = ["", "#2ecc71", "#f1c40f", "#e67e22", "#e74c3c", "#8e44ad"];
  const advisories = [
    "",
    "✅ Air quality is great. Enjoy outdoor activities!",
    "😌 Air is acceptable. Sensitive people may feel mild irritation.",
    "⚠️ Prolonged outdoor exertion not advised for sensitive groups.",
    "🚫 Unhealthy air. Limit time outside and wear a mask.",
    "☠️ Very poor air. Stay indoors and use purifiers if available.",
  ];

  container.innerHTML = `
    <div style="padding: 1rem; border-radius: 10px; background-color: ${colors[aqi]}20;">
      <p><strong>AQI Level:</strong> ${levels[aqi]}</p>
      <p style="color:${colors[aqi]}; font-size: 2rem;">● AQI Index: ${aqi}</p>
      <p>💨 PM2.5: ${pm25} μg/m³</p>
      <p>💨 PM10: ${pm10} μg/m³</p>
      <p style="margin-top: 10px;"><strong>🩺 Health Advisory:</strong></p>
      <p>${advisories[aqi]}</p>
    </div>
  `;
}

// Status messages
export function showStatusMessage(msg) {
  document.getElementById("status").textContent = msg;
}

export function clearStatusMessage() {
  document.getElementById("status").textContent = "";
}

function formatTemp(celsius, unit) {
  if (unit === "imperial") {
    const f = celsius * 1.8 + 32;
    return `${f.toFixed(1)}°F`;
  }
  return `${celsius.toFixed(1)}°C`;
}

function formatWind(speedMs, unit) {
  if (unit === "imperial") {
    const mph = speedMs * 2.237;
    return `${mph.toFixed(1)} mph`;
  }
  return `${speedMs.toFixed(1)} m/s`;
}
