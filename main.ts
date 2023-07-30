import { Eta } from "eta";
const path = require("path");
const fs = require("fs");
import axios from "axios";

interface ActivityData {
  key: string;
  activity: string;
  price: number;
  accessibility: number;
}

const API_URL = "https://www.boredapi.com/api/activity";
const PAGES_COUNT = 3;

// Render the template
const eta = new Eta({ views: path.join(__dirname, "templates") });

async function fetchDataFromApi(): Promise<ActivityData> {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return null;
  }
}

async function fetchDataAndProcess(): Promise<void> {
  for (let i = 0; i < PAGES_COUNT; i++) {
    try {
      const data: ActivityData = await fetchDataFromApi();
      console.log(data);

      if (!data) {
        console.error("API response is empty.");
        continue;
      }

      const res = eta.render("./simple", {
        key: `${data.key}`,
        activity: `${data.activity}`,
        price: `${data.price}`,
        accessibility: `${data.accessibility}`,
      });

      const outputFilePath = path.join(__dirname, `output${i}.html`);
      fs.writeFileSync(outputFilePath, res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

fetchDataAndProcess();
