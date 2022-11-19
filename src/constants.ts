export const Constants = {
  POPULAR_CITIES: ['Milan','Rome','Turin', 'Florence', 'Venice']
}

export const APIs = {
  GET_WEATHER: (lat: string, lon: string, API_KEY: string) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  GET_LAT_LON: (city: string, API_KEY: string) => `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
}