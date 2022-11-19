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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processWeatherPopularCities = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const processWeatherPopularCities = (cities) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const API_KEY = (_a = process.env.OPENWEATHERMAP_API_KEY) !== null && _a !== void 0 ? _a : 'NOT_DEFINED';
    const arrPromisesLatLon = [];
    for (const city of cities) {
        arrPromisesLatLon.push(getLatLon(constants_1.OPENWEATHER_HOSTNAME, `/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`, 'GET'));
    }
    const latLonOfCities = yield Promise.all(arrPromisesLatLon);
    const arrPromisesWeather = [];
    for (const coords of latLonOfCities) {
        arrPromisesWeather.push(getWeather(constants_1.OPENWEATHER_HOSTNAME, `/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`, 'GET'));
    }
    const result = yield Promise.all(arrPromisesWeather);
    return {
        cities: result
    };
});
exports.processWeatherPopularCities = processWeatherPopularCities;
const getWeather = (hostname, path, method) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        hostname: hostname,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const result = yield (0, utils_1.processApi)(options);
    const parsedResult = JSON.parse(result);
    console.debug(parsedResult);
    const response = {
        weatherDecription: parsedResult.weather[0].description,
        temp: parsedResult.main.temp,
        cityName: parsedResult.name
    };
    console.debug(response);
    return response;
});
const getLatLon = (hostname, path, method) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        hostname: hostname,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const result = yield (0, utils_1.processApi)(options);
    const parsedResult = JSON.parse(result);
    console.debug(parsedResult);
    const response = {
        lat: parsedResult[0].lat,
        lon: parsedResult[0].lon
    };
    console.debug(response);
    return response;
});
