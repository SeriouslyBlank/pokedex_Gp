import type { State } from "./state.js";

export function commandExit(_state: State): void {
	console.log("Closing the Pokedex... Goodbye!");
	_state.readline.close();
	process.exit(0);
};


export function commandHelp(_state: State):void {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:");
	console.log(" ");
	console.log(`help: ${_state.commands.help.description}`);
	console.log(`exit: ${_state.commands.exit.description}`);
}