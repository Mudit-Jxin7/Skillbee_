const { Eta } = require("eta");
const path = require("path");
const fs = require("fs");
const axios = require('axios');

const API_URL = 'https://www.boredapi.com/api/activity';
const PAGES_COUNT = 3;

// Render the template
const eta = new Eta({ views: path.join(__dirname, "templates") });

async function fetchDataFromApi() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from the API:', error);
        return [];
    }
}

async function fetchDataAndProcess() {
    for (let i = 0; i < PAGES_COUNT; i++) {
        try {
            const data = await fetchDataFromApi();
            console.log(data);
            const res = eta.render("./simple", { name: `${data.activity}` });
            const outputFilePath = path.join(__dirname, `output${i}.html`);
            fs.writeFileSync(outputFilePath, res);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

fetchDataAndProcess();