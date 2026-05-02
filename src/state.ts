import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp, commandMap, commandMapb, explore } from "./commands.js";
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
		    }
		};
	}

	const pokeapiInit = new PokeAPI();

	return {readline: rl, commands: getCommands(), PokeAPI: pokeapiInit, nextLocationsURL: null, prevLocationsURL: null}; //returns a initialized state object, idk if the callback should be commandExit(state) or not lets seee
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
	nextLocationsURL : string | null;
	prevLocationsURL : string | null;
}