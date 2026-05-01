// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const _state = initState();
  startREPL(_state);
}

main();