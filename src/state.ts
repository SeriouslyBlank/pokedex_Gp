import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp, commandMap, commandMapb, explore, handleCatch } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";



export function initState() :State {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	function getCommands(): Record<string, CLICommand> {
		return {
		    exit: {
		      name: "exit",
		      description: "Exits the pokedex",
		      usage: "exit",
		      callback: commandExit,
		    },
		    help: {
		    	name: "help",
		    	description: "Displays a help message",
		    	usage: "help",
		    	callback: commandHelp,
		    },
		    map: {
		    	name: "map",
		    	description: "Displays the next 20 locations",
		    	usage: "map",
		    	callback: commandMap,
		    },
		    mapb: {
		    	name: "mapb",
		    	description: "Displays the previous 20 locations",
		    	usage: "mapb",
		    	callback: commandMapb,
		    },
		    explore: {
		    	name: "explore",
		    	description: "Explores the area and shows the list of pokemon that can be found:",
		    	usage: "explore <area-name>",
		    	callback: explore,
		    },
		    catch: {
		    	name: "catch",
		    	description: "Tries to catch the pokemon",
		    	usage: "catch <pokemon-name>",
		    	callback: handleCatch,
		    }
		};
	}


	const pokeapiInit = new PokeAPI();
	const myPokedex: Record<string, Pokemon> = {};

	return {readline: rl, commands: getCommands(), PokeAPI: pokeapiInit, Pokedex: myPokedex, nextLocationsURL: null, prevLocationsURL: null}; //returns a initialized state object, idk if the callback should be commandExit(state) or not lets seee
}



export type CLICommand = {
	name: string;
	description: string;
	usage: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
}



export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	PokeAPI: PokeAPI;
	Pokedex: Record<string, Pokemon>;
	nextLocationsURL : string | null;
	prevLocationsURL : string | null;
}


export type Pokemon = {
	abilities: any;
	base_experience: number; //needed
	cries: any;
	forms: any;
	game_indices: any;
	height: number; //needed
	held_items: any;
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: any;
	name: string; //needed
	order: number;
	past_abilities: any;
	past_stats: any;
	past_types: any;
	species: any;
	sprites: any;
	stats: Stats[] //needed
	types: Typo[] // needed
	weight: number // needed
}


export type Stats = {
	base_stat: number;
	effort: number;
	stat: {name: string, url: string};
}

export type Typo = {
	slot: number;
	type: {name: string, url: string};
}