"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIs = exports.Constants = void 0;
exports.Constants = {
    POPULAR_CITIES: ['Milan', 'Rome', 'Turin', 'Florence', 'Venice']
};
exports.APIs = {
    GET_WEATHER: (lat, lon, API_KEY) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    GET_LAT_LON: (city, API_KEY) => `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
};
