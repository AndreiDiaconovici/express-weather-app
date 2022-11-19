export interface APIResponse {
  cities: City[]
}

// API Get Weather
export interface City {
  weatherDecription: string;
  temp: number
}


// API Get Lat Lon
export interface GeocodingResponse {
  body: GeographicalCoordinates[]
}

export interface GeographicalCoordinates {
  lat: number;
  lon: number;
}