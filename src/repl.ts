import { State } from "./state.js";


export function cleanInput(input: string): string[] | string {
  if (input) {
    const list = input.trim().toLowerCase().split(" ")
    const result = list.filter(Boolean);
    return result;
  } else {
    return "";
  }
}






export function startREPL(_state: State){
  _state.readline.prompt();
  _state.readline.on('line', (input:string)=> {
    const inputClean = cleanInput(input);

    if (inputClean) {
      const cmdName = inputClean[0];

      const args = inputClean[1] ?? "";

      const command = _state.commands[cmdName];

      if (command) {
        command.callback(_state, args);
      } else {
        console.log("Unknown command");
      }
    }
    _state.readline.prompt();
  });
}