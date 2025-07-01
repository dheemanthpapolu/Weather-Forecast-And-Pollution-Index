# Weather & Pollution Tracker

This is a responsive web application that displays **real-time weather**, **7-day forecast**, and **air quality index (AQI)** for any city in the world. It uses the OpenWeatherMap API and provides a clean UI with dark mode, unit switching, location-based search, and dynamic visuals.

---

## 🌐 Features

| Feature                      | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| 🔍 City Search              | Search any city and instantly get weather + pollution data                  |
| 📍 Use My Location          | Auto-detect current location and fetch relevant data                        |
| 🌓 Dark Mode                | Toggle between light and dark UI themes                                     |
| 🌡 Unit Toggle              | Switch between Celsius (°C) and Fahrenheit (°F)                              |
| 📈 Temperature Forecast     | 5-day temperature forecast in daily steps                                   |
| 💨 AQI Indicator            | Displays AQI index with color-coded status + PM2.5 & PM10 levels            |
| 🌅 Sunrise/Sunset           | Shows sunrise and sunset times in local time                                |
| 🎨 Dynamic Background       | Weather-based background image changes (clear, rain, snow, etc.)            |
| 🧠 Smart Status Messages    | Helpful messages for errors, loading, and UI actions                        |
| ✅ Fully Responsive         | Mobile-friendly layout with adaptive elements                               |

---

## 🛠 Tech Stack

- **HTML, CSS, JavaScript (Vanilla)**
- **OpenWeatherMap API**
- **Chart.js** (optional, for future visual additions)
- **Geolocation API** (built-in browser support)
- **Modular File Structure** with separate files for API, DOM, charting, and main logic

---

## 📦 Folder Structure

```
/project-root
│
├── index.html
├── README.md
├── /assets
│   ├── /images       (weather backgrounds)
│   └── style/
│       └── main.css
│
├── /js
│   ├── app.js
│   ├── api.js
│   ├── dom.js
│   └── chart.js
│
└── /data
    └── constants.js
```

---

## 🔧 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/weather-pollution-app.git
   cd weather-pollution-app
   ```

2. Add your **OpenWeatherMap API key** to `data/constants.js`:
   ```js
   export const API_KEY = "YOUR_API_KEY";
   ```

3. Launch a simple server:
   - If using **VS Code**:
     - Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
     - Right-click `index.html` → **"Open with Live Server"**
   - If using **Python**:
     ```bash
     python3 -m http.server 8000
     ```

4. Open in browser:
   ```
   http://localhost:8000
   ```

---

## 📝 To-Do / Suggested Enhancements

- [ ] Temperature trend chart 📊
- [ ] Search history (localStorage)
- [ ] Save user preferences (theme, unit)
- [ ] Hourly forecast (3-hour steps)
- [ ] Weather alerts (via OneCall API)
- [ ] Multilingual support (via `lang` param)

---

## ⚖️ License

This project is licensed under the [MIT License](LICENSE).
