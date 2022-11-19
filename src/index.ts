import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { OpenWeatherService } from './service/open-weather';
import { YelpService } from './service/yelp';
import { Constants } from './constants/constants';

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
  const weatherWithBusinessCities = await yelpService.retrieveBusinesses(weatherCities);
  res.json(weatherWithBusinessCities);

});

app.get('/v1/weather/cities', async (req: Request, res: Response) => {
  const cities = req.query.cities?.toString().split(',') as string[];

  const yelpService = new YelpService();
  const openWeatherService = new OpenWeatherService();

  const weatherCities = await openWeatherService.processWeatherPopularCities(cities);
  const weatherWithBusinessCities = await yelpService.retrieveBusinesses(weatherCities);
  res.json(weatherWithBusinessCities);

});
