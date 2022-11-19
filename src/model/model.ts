export interface APIResponse {
  cities: City[]
}

// API Get Weather
export interface City {
  weatherDecription: string;
  temp: number;
  cityName: string;
  business: Business[];
  lat: number;
  lon: number;
}

export interface Business {
  rating: number,
  price: string,
  phone: string
  id: string,
  alias: string,
  is_closed: boolean,
  categories: {alias: string, title: string}[],
  review_count: number,
  name: string,
  url: string,
  coordinates: {
    latitude: number,
    longitude: number
  },
  image_url: string,
  location: {
    city: string,
    country: string,
    address2: string,
    address3: string,
    state: string,
    address1: string,
    zip_code: string
  },
  distance: number,
  transactions: string[]
}


// API Get Lat Lon
export interface GeocodingResponse {
  body: GeographicalCoordinates[]
}

export interface GeographicalCoordinates {
  lat: number;
  lon: number;
}

