import { YELP_HOSTNAME } from "../constants/constants";
import { APIResponse, City } from "../model/model";
import { processApi } from "../utils/utils";

export class YelpService {
  public async retrieveBusinesses(input: APIResponse) : Promise<APIResponse> {
    const arrBusinesses: Promise<City>[] = [];

    for (const city of input.cities) {
      arrBusinesses.push(this.getBusiness(
        YELP_HOSTNAME,
        `/v3/businesses/search?latitude=${city.lat}&longitude=${city.lon}`,
        'GET',
        city
      ))
    }
  
    const cities = await Promise.all(arrBusinesses);
    console.debug('YelpService | retrieveBusinesses | '+JSON.stringify(cities));
  
    return {
      cities: cities
    };
  }

  private async getBusiness(hostname: string, path: string, method: string, city: City): Promise<City> {
    const API_KEY = process.env.YELP_API_KEY ?? 'NOT_DEFINED';
    const options = {
      hostname: hostname,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
    }; 
  
    const result = await processApi(options)
    const parsedResult = JSON.parse(result)  
  
    return {
      ...city,
      business: parsedResult.businesses
    };
  }
}
