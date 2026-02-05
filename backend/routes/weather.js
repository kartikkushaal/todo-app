const express = require('express');
const router = express.Router();   
const axios = require('axios');

router.get("/:city", async (req, res) => {
try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    const weatherData = {
        city: response.data.name,
        Country: response.data.sys.country,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
    };
    res.json(weatherData);
}catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
}
});
module.exports = router;