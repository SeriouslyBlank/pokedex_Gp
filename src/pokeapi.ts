import { error } from "console";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}


  //returns the pokeapi location area, the returned value is being used to set the nextlocationurl and prevlocationurl of the state obj and a list of locations are sent limited to 20
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
      if (pageURL) {
        const response = await fetch(pageURL, {
          method: "GET",
          mode: "cors",
        });
        const data = await response.json();
        return data;
      } else {
        const locAreaURL = `${PokeAPI.baseURL}/location-area`;
        const response = await fetch(locAreaURL, {
          method: "GET",
          mode: "cors",
        });
        const data = await response.json();
        return data;
      }      
    } catch(err) {
      throw error(`Failed fetchlocations Error: ${err} \n pageURL: ${pageURL}`);
    }    
  }

  //fetches the location obj based on name; idk what to do with this function as it is rn though
  async fetchLocation(locationName: string): Promise<Location> {
    const locURL = `${PokeAPI.baseURL}/location-area?limit=1500`;
    try {
      const response = await fetch(locURL, {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      const locationFind = data.results.find( (data: {name: string, url: string}) => data.name === locationName);
      return locationFind;
    } catch(error) {
      throw Error(`Failed in fetching the location for ${locationName} with the error ${error}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string| null;
  previous: string | null;
  results: [{
    name: string,
    url: string
  }]
};

export type Location = {
  name:string;
  url: string;
};



