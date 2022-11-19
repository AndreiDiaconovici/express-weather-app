# express-weather-app

Backend express application with 2 API
- GET /v1/weather/city/popular
- GET /v1/weather/city?name={name}

Weather Third Party : Open Weather Map (https://openweathermap.org/api)

Current weather data API:
- Retrieve weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY} (Docs: https://openweathermap.org/current)
- Retrieve lat&lon: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API_KEY} (Docs: https://openweathermap.org/api/geocoding-api)

Cities businesses Third Party : Yelp Fusion (https://www.yelp.com/developers/documentation/v3/business_search)

# Tutorial

In order to run correctly the application create .env file with following keys:
```
  PORT=8000
  OPENWEATHERMAP_API_KEY=[API_KEY]
```

Start server: npm start
Build server: npm run-script build
Development environment: npm run-script dev
