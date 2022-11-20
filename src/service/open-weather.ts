import { OPENWEATHER_HOSTNAME } from "../constants/constants";
import { City, GeographicalCoordinates } from "../model/model";
import { processApi } from "../utils/utils";

export class OpenWeatherService {
  public async processWeatherPopularCities(cities: string[]): Promise<{cities: City[], cityCoords: GeographicalCoordinates[]}> {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY ?? 'NOT_DEFINED';
    const arrPromisesLatLon: Promise<GeographicalCoordinates>[] = [];
    for (const city of cities) {
      arrPromisesLatLon.push(this.getLatLon(
        OPENWEATHER_HOSTNAME,
        `/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
        'GET'
      ));
    }
  
    const latLonOfCities = await Promise.all(arrPromisesLatLon);
  
    const arrPromisesWeather: Promise<City>[] = [];
    for (const coords of latLonOfCities) {
      arrPromisesWeather.push(this.getWeather(
        OPENWEATHER_HOSTNAME,
        `/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`,
        'GET'
      ))
    }
  
    const result = await Promise.all(arrPromisesWeather);

    console.debug('OpenWeatherService | processWeatherPopularCities | '+JSON.stringify(result));

  
    return {
      cities: result,
      cityCoords: latLonOfCities
    };
  }

  private async getWeather(hostname: string, path: string, method: string): Promise<City> {
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
  
    const response = {
      weatherDecription: parsedResult.weather[0].description,
      temp: parsedResult.main.temp,
      cityName: parsedResult.name,
      business: []
    }
  
    return response;
  }

  private async getLatLon(hostname: string, path: string, method: string): Promise<GeographicalCoordinates> {
    const options = {
      hostname: hostname,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    }; 
  
    const result = await processApi(options)
    const parsedResult = JSON.parse(result);
  
    const response = {
      lat: parsedResult[0].lat,
      lon: parsedResult[0].lon
    }
  
    return response;
  }
}
