import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp, commandMap, commandMapb } from "./commands.js";
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
		      callback: commandExit,
		    },
		    help: {
		    	name: "help",
		    	description: "Displays a help message",
		    	callback: commandHelp,
		    },
		    map: {
		    	name: "map",
		    	description: "Displays the next 20 locations",
		    	callback: commandMap,
		    },
		    mapb: {
		    	name: "mapb",
		    	description: "Displays the previous 20 locations",
		    	callback: commandMapb,
		    },
		};
	}

	const pokeapiInit = new PokeAPI();

	return {readline: rl, commands: getCommands(), PokeAPI: pokeapiInit, nextLocationsURL: null, prevLocationsURL: null}; //returns a initialized state object, idk if the callback should be commandExit(state) or not lets seee
}



export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => Promise<void>;
}



export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	PokeAPI: PokeAPI;
	nextLocationsURL : string | null;
	prevLocationsURL : string | null;
}