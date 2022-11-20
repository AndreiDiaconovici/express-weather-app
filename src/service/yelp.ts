import { YELP_HOSTNAME } from "../constants/constants";
import { Business, GeographicalCoordinates } from "../model/model";
import { processApi } from "../utils/utils";

export class YelpService {
  public async retrieveBusinesses(citiesCoords: GeographicalCoordinates[]) : Promise<Business[][]> {
    const arrBusinesses: Promise<Business[]>[] = [];

    for (const city of citiesCoords) {
      arrBusinesses.push(this.getBusiness(
        YELP_HOSTNAME,
        `/v3/businesses/search?latitude=${city.lat}&longitude=${city.lon}`,
        'GET'
      ))
    }
  
    const businesses = await Promise.all(arrBusinesses);
    console.debug('YelpService | retrieveBusinesses | '+JSON.stringify(businesses));
  
    return businesses;
  }

  private async getBusiness(hostname: string, path: string, method: string): Promise<Business[]> {
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
  
    return parsedResult.businesses;
  }
}
