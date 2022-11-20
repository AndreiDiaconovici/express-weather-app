# express-weather-app

Example: http://weath-expr-5oqpuascdpgo.eba-2q6kwmd3.eu-west-1.elasticbeanstalk.com/v1/weather/city/popular

Backend express application with 2 API
- GET /v1/weather/city/popular
- GET /v1/weather/cities?cities={cities string joined by ,} (Example: /v1/weather/cities?cities=Rome,Turin,Milan)

Weather Third Party : Open Weather Map (https://openweathermap.org/api)

Current weather data API:
- Retrieve weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY} (Docs: https://openweathermap.org/current)
- Retrieve lat&lon: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API_KEY} (Docs: https://openweathermap.org/api/geocoding-api)

Cities businesses Third Party : Yelp Fusion (https://www.yelp.com/developers/documentation/v3/business_search)

# How To Run

In order to run correctly the application create .env file with following keys:
```
  PORT=8000
  OPENWEATHERMAP_API_KEY=[API_KEY]
  YELP_API_KEY=[API_KEY]
```

Start server: npm start
Build server: npm run-script build
Development environment: npm run-script dev

# AWS Deployment

Build the application
```
npm run-script build
´´´
Create a zip of content inside dist folder

You need to manually create:
- the S3 bucket where the cloudformation template will be uploaded
- the S3 bucket where the nodejs zip application will be uploaded

```
aws cloudformation package --template-file cloudformation/template.yml --s3-bucket [S3_BUCKET] --output-template-file cloudformation/template-generated.yml

Example:
aws cloudformation package --template-file cloudformation/template.yml --s3-bucket weather-app-express --output-template-file cloudformation/template-generated.yml

aws cloudformation deploy --template-file cloudformation/template-generated.yml --stack-name [StackName] --parameter-overrides KeyName=[KeyName] --capabilities CAPABILITY_IAM

Example:
aws cloudformation deploy --template-file cloudformation/template-generated.yml --stack-name weather-express --parameter-overrides KeyName=weather --capabilities CAPABILITY_IAM
```
weather-app-express

# TODO

Unit & Integretion Tests

