let tempChartInstance = null;

export function renderTempTrendChart(forecastData, unit) {
  const labels = [];
  const maxTemps = [];

  for (let i = 0; i < forecastData.list.length; i += 8) {
    const item = forecastData.list[i];
    const date = new Date(item.dt_txt);
    labels.push(date.toLocaleDateString(undefined, { weekday: "short" }));
    maxTemps.push(item.main.temp_max);
  }

  // Convert to °F if unit is imperial
  const temps = unit === "imperial"
    ? maxTemps.map(c => c * 1.8 + 32)
    : maxTemps;

  const ctx = document.getElementById("tempChart").getContext("2d");

  if (tempChartInstance) {
    tempChartInstance.destroy(); // Clear old chart
  }

  tempChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `Max Temp (${unit === "imperial" ? "°F" : "°C"})`,
        data: temps,
        fill: false,
        borderColor: "#2a9df4",
        backgroundColor: "#2a9df4",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
