import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = "03201da637a2dc166817aadf94a1fedf"; // Replace this with your actual API key

    // Get user's geolocation using browser's geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        axios
          .get(apiUrl)
          .then((response) => {
            setWeatherData(response.data);
            setError(null);
          })
          .catch((error) => {
            console.error("Error fetching weather data: ", error);
            setError("Failed to fetch weather data");
          });
      },
      (error) => {
        console.error("Error getting user's location: ", error);
        setError("Failed to get user's location");
      }
    );
  }, []);

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!weatherData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="body1" paddingBottom={2}>
        We hope you are having a great time in {weatherData.name},{" "}
        {weatherData.sys.country}. The current temperature is{" "}
        {weatherData.main.temp} °C and we would adivise you to be prepared for{" "}
        {weatherData.weather[0].description} ! when you head out today. Have a
        wonderful rest of your day and stay safe!
      </Typography>
    </div>
  );
};

export default Weather;
