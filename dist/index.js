"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("./constants");
const open_weather_1 = require("./open-weather");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hello Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
app.get('/v1/weather/city/popular', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = constants_1.Constants.POPULAR_CITIES;
    const result = yield (0, open_weather_1.processWeatherPopularCities)(cities);
    res.json(result);
}));
app.get('/v1/weather/cities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cities = (_a = req.query.cities) === null || _a === void 0 ? void 0 : _a.toString().split(',');
    const result = yield (0, open_weather_1.processWeatherPopularCities)(cities);
    res.json(result);
}));
