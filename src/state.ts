import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp } from "./commands.js";




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
		};
	}
	return {readline: rl, commands: getCommands()}; //returns a initialized state object, idk if the callback should be commandExit(state) or not lets seee
}



export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => void;
}



export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
}