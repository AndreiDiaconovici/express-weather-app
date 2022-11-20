import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { OpenWeatherService } from './service/open-weather';
import { YelpService } from './service/yelp';
import { Constants } from './constants/constants';
import { Business, City } from './model/model';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get('/v1/weather/city/popular', async (_req: Request, res: Response) => {
  const cities = Constants.POPULAR_CITIES;
  const yelpService = new YelpService();
  const openWeatherService = new OpenWeatherService();

  const weatherCities = await openWeatherService.processWeatherPopularCities(cities);
  const businesses = await yelpService.retrieveBusinesses(weatherCities.cityCoords);

  const citiesResult: City[] = []

  for (const city of weatherCities.cities) {
    citiesResult.push({...city, business: businesses.at(weatherCities.cities.indexOf(city)) as Business[] })
  }

  res.json(citiesResult);

});

app.get('/v1/weather/cities', async (req: Request, res: Response) => {
  const cities = req.query.cities?.toString().split(',') as string[];

  const yelpService = new YelpService();
  const openWeatherService = new OpenWeatherService();

  const weatherCities = await openWeatherService.processWeatherPopularCities(cities);
  const businesses = await yelpService.retrieveBusinesses(weatherCities.cityCoords);

  const citiesResult: City[] = []

  for (const city of weatherCities.cities) {
    citiesResult.push({...city, business: businesses.at(weatherCities.cities.indexOf(city)) as Business[] })
  }

  res.json(citiesResult);

});
