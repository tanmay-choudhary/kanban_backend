const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const api = {
  key: "2e771d144142dcd2ccd8e9afdf85f3a3",
  base: "http://api.openweathermap.org/data/2.5/",
};
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

router.get("/", async (req, res) => {
  try {
    //const kanban = await kanbanModel.find();
    const lat = 55;
    const lon = -3; // Replace with the actual longitude
    const apiKey = api.key; // Replace with your actual API key

    const kanban = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=delhi&limit=5&appid=2e771d144142dcd2ccd8e9afdf85f3a3`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
    res.json(kanban);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/get-weather", async (req, res) => {
  try {
    //const kanban = await kanbanModel.find();
    const lat = 28.6517178;
    const lon = 77.2219388; // Replace with the actual longitude
    const apiKey = api.key; // Replace with your actual API key

    const kanban = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
    res.json(kanban);
  } catch (err) {
    res.send("Error " + err);
  }
});
module.exports = router;
