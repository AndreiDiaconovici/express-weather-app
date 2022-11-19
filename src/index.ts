import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Constants, APIs } from './constants';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const API_KEY = process.env.OPENWEATHERMAP_API_KEY ?? 'NOT_DEFINED';

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get('/v1/weather/city/popular', (req: Request, res: Response) => {
  const cities = Constants.POPULAR_CITIES;
  const apis: string[] = [];
  for (const city of cities) {
    apis.push(APIs.GET_LAT_LON(city, API_KEY));
  }
  console.info(apis)
});
