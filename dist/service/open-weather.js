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
exports.OpenWeatherService = void 0;
const constants_1 = require("../constants/constants");
const utils_1 = require("../utils/utils");
class OpenWeatherService {
    processWeatherPopularCities(cities) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const API_KEY = (_a = process.env.OPENWEATHERMAP_API_KEY) !== null && _a !== void 0 ? _a : 'NOT_DEFINED';
            const arrPromisesLatLon = [];
            for (const city of cities) {
                arrPromisesLatLon.push(this.getLatLon(constants_1.OPENWEATHER_HOSTNAME, `/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`, 'GET'));
            }
            const latLonOfCities = yield Promise.all(arrPromisesLatLon);
            const arrPromisesWeather = [];
            for (const coords of latLonOfCities) {
                arrPromisesWeather.push(this.getWeather(constants_1.OPENWEATHER_HOSTNAME, `/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`, 'GET', coords.lat, coords.lon));
            }
            const result = yield Promise.all(arrPromisesWeather);
            console.debug('OpenWeatherService | processWeatherPopularCities | ' + JSON.stringify(result));
            return {
                cities: result
            };
        });
    }
    getWeather(hostname, path, method, lat, lon) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const response = {
                weatherDecription: parsedResult.weather[0].description,
                temp: parsedResult.main.temp,
                cityName: parsedResult.name,
                lat: lat,
                lon: lon,
                business: []
            };
            return response;
        });
    }
    getLatLon(hostname, path, method) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                hostname: hostname,
                path: path,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const result = yield (0, utils_1.processApi)(options);
            const parsedResult = JSON.parse(result);
            const response = {
                lat: parsedResult[0].lat,
                lon: parsedResult[0].lon
            };
            return response;
        });
    }
}
exports.OpenWeatherService = OpenWeatherService;
