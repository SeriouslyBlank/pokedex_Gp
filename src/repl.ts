import { createInterface } from "node:readline";
import { commandExit, commandHelp } from "./command_exit.js";


export function cleanInput(input: string): string[] | string {
  if (input) {
    const list = input.trim().toLowerCase().split(" ")
    const result = list.filter(Boolean);
    return result;
  } else {
    return "";
  }
}




const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});



export function startREPL(){
  rl.prompt();
  rl.on('line', (input:string)=> {
    const inputClean = cleanInput(input);
    if (inputClean) {
      if (inputClean[0] === "help") {
        commandHelp();

      } else if (inputClean[0] === "exit") {
        commandExit();
      } else {
        console.log("Unknown command");
      }
      rl.prompt();
    } else {
      rl.prompt();
    }

  });

}