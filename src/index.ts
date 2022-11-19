import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Constants } from './constants';
import { processWeatherPopularCities } from './open-weather';

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

  const result = await processWeatherPopularCities(cities);

  res.json(result);

});

app.get('/v1/weather/cities', async (req: Request, res: Response) => {
  const cities = req.query.cities?.toString().split(',') as string[];

  const result = await processWeatherPopularCities(cities);

  res.json(result);

});
