export function cleanInput(input: string): string[] {
  if (input) {
    const list = input.trim().toLowerCase().split(" ")
    const result = list.filter(Boolean);
    return result;
  } else {
    console.log("Empty string input")
    return [""];
  }
}