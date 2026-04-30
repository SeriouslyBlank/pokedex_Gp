import type { CLICommand } from "./types.js";


export function commandExit(): void {
	console.log("Closing the Pokedex... Goodbye!");
	process.exit(0);
};


export function getCommands(): Record<string, CLICommand> {
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


export function commandHelp():void {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:");
	console.log(" ");
	console.log(`help: ${getCommands().help.description}`);
	console.log(`exit: ${getCommands().exit.description}`);
}