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
      if (inputClean[0] === "help") {
        _state.commands.help.callback(_state);

      } else if (inputClean[0] === "exit") {
        _state.commands.exit.callback(_state);
      } else {
        console.log("Unknown command");
      }
      _state.readline.prompt();
    } else {
      _state.readline.prompt();
    }

  });

}