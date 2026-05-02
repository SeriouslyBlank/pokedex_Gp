import { Cache } from "./pokecache.js";


export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;


  constructor(cacheInterval: number = 1000 * 60 * 5) {
    this.#cache = new Cache(cacheInterval); //default 5 mins for now
  }


  //returns the pokeapi location area, the returned value is being used to set the nextlocationurl and prevlocationurl of the state obj and a list of locations are sent limited to 20
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const targetURL = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`; //null or undefined then the url will be locarea
    if (this.#cache.size === 0) {
    } else {
      const cachedResult =  this.#cache.get<ShallowLocations>(targetURL);
      //checking if the value was undefined
      if (cachedResult) { 
        console.log("Found in cache")
        return cachedResult;
      }
    }

    //refactored the logic using targel url instead to make LIFE EASIER and code READABLE 6 months donw the line if i ever look back

    try {
      const response = await fetch(targetURL, {
        method: "GET",
        mode: "cors",
      });

      const data = await response.json();
      console.log("Caching...");
      this.#cache.add(targetURL, data);
      return data;      
    } catch(err) {
      throw new Error(`Failed fetchlocations Error: ${err} \n pageURL: ${pageURL}`);
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
      throw new Error(`Failed in fetching the location for ${locationName} with the error ${error}`);
    }
  }

  async fetchPokemonInArea(url: string) :Promise<PokemonEncounter[]> {
    if (this.#cache.size === 0) {
    } else {
      const cacheResult = this.#cache.get<PokemonEncounter[]>(url);
      if (cacheResult) {
        console.log("Found in Cache");
        return cacheResult;
      }
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      this.#cache.add(url, data.pokemon_encounters);
      const result = data.pokemon_encounters;
      return result;
    } catch (err) {
      throw new Error(`Fetching pokemeon in area failed url: ${url}  with the error: ${err}`);
    }  
  }
}

export type ShallowLocations = {
  count: number;
  next: string| null;
  previous: string | null;
  results: Location[],
};

export type Location = {
  name:string;
  url: string;
};

export type PokemonEncounter = {
  pokemon: {name: string, url: string}
  version_details: any
}

