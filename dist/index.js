"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("./constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const API_KEY = (_a = process.env.OPENWEATHERMAP_API_KEY) !== null && _a !== void 0 ? _a : 'NOT_DEFINED';
app.get('/', (req, res) => {
    res.send('Hello Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
app.get('/v1/weather/city/popular', (req, res) => {
    const cities = constants_1.Constants.POPULAR_CITIES;
    const apis = [];
    for (const city of cities) {
        apis.push(constants_1.APIs.GET_LAT_LON(city, API_KEY));
    }
    console.info(apis);
});
