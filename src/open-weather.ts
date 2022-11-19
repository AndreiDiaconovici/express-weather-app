import { OPENWEATHER_HOSTNAME } from "./constants";
import { APIResponse, City, GeographicalCoordinates } from "./model";
import { processApi } from "./utils";



export const processWeatherPopularCities = async (cities: string[]): Promise<APIResponse> => {
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY ?? 'NOT_DEFINED';
  const arrPromisesLatLon: Promise<GeographicalCoordinates>[] = [];
  for (const city of cities) {
    arrPromisesLatLon.push(getLatLon(
      OPENWEATHER_HOSTNAME,
      `/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
      'GET'
    ));
  }

  const latLonOfCities = await Promise.all(arrPromisesLatLon);

  const arrPromisesWeather: Promise<City>[] = [];
  for (const coords of latLonOfCities) {
    arrPromisesWeather.push(getWeather(
      OPENWEATHER_HOSTNAME,
      `/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`,
      'GET'
    ))
  }

  const result = await Promise.all(arrPromisesWeather);

  return {
    cities: result
  };
  
}

const getWeather = async (hostname: string, path: string, method: string): Promise<City> => {
  const options = {
    hostname: hostname,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }; 

  const result = await processApi(options)
  const parsedResult = JSON.parse(result)

  console.debug(parsedResult);

  const response = {
    weatherDecription: parsedResult.weather[0].description,
    temp: parsedResult.main.temp,
    cityName: parsedResult.name
  }

  console.debug(response)

  return response;
}

const getLatLon = async (hostname: string, path: string, method: string): Promise<GeographicalCoordinates> => {
  const options = {
    hostname: hostname,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }; 

  const result = await processApi(options)
  const parsedResult = JSON.parse(result);

  console.debug(parsedResult);

  const response = {
    lat: parsedResult[0].lat,
    lon: parsedResult[0].lon
  }

  console.debug(response)

  return response;

}
