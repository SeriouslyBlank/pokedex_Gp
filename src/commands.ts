import type { Pokemon, State } from "./state.js";

export async function commandExit(_state: State): Promise<void> {
	console.log("Closing the Pokedex... Goodbye!");
	_state.readline.close();
	process.exit(0);
};


export async function commandHelp(_state: State):Promise<void> {
	console.log("Welcome to the Pokedex!");
	console.log("List of commands available:");
	console.log(" ");
	Object.values(_state.commands).forEach((command) => {
		console.log(`${command.name}: ${command.description} \n Command Usage: ${command.usage}`);
	});
}

//provides a map of the current place ig
export async function commandMap(_state: State): Promise<void> {
	if (_state.nextLocationsURL) {
		try {
			const data = await _state.PokeAPI.fetchLocations(_state.nextLocationsURL);
			const data2 = data.results;
			_state.prevLocationsURL = data.previous; //setting the state object to have the previous location as the url
			_state.nextLocationsURL = data.next;
			data2.forEach((data2: {name: string, url: string}) => {
				console.log(data2.name);
			})
		} catch(err) {
			throw new Error(`Failed Map command cuz of ${err}  \n Next location was provided: ${_state.nextLocationsURL}`)
		}
	} else {
		try {
			const data = await _state.PokeAPI.fetchLocations();
			const data2 = data.results;
			_state.nextLocationsURL = data.next;
			data2.forEach((data2) => {
				console.log(data2.name);
			})
		} catch(err) {
			throw new Error(`Failed Map command cuz of ${err}  \n Next location was provided: ${_state.nextLocationsURL}`)
		}
	}
}

export async function commandMapb(_state: State): Promise<void> {
	if (_state.prevLocationsURL){
		const data = await _state.PokeAPI.fetchLocations(_state.prevLocationsURL);
		const data2 = data.results;
		_state.nextLocationsURL = data.next;
		_state.prevLocationsURL = data.previous;
		data2.forEach((data2) => {
			console.log(data2.name);
		})
	} else {
		console.log(`You're on the first page!!!`);
	}

}


export async function explore(_state: State, ...[locarea, ...ignored]: string[]): Promise<void>{
	if (!locarea) {
		console.log(`No area-name provided: \n Command Usage: ${_state.commands.explore.usage}`);
	} else {
		console.log(`Exploring ${locarea}`);
		const dataLoc = await _state.PokeAPI.fetchLocation(locarea);
		if (!dataLoc) {
			console.log(`Incorrect area-name: ${locarea} \n Use map or mapb command to view CORRECT area-name`);
		} else {
			const pokeEncounter = await _state.PokeAPI.fetchPokemonInArea(dataLoc.url);
			console.log(`Found Pokemon: `);
			pokeEncounter.forEach((item)=> {
				console.log(` - ${item.pokemon.name}`)
			});
		}
		
	}
}


export async function handleCatch(_state: State, ...[pokname, ...ignored]: string[]) : Promise<void> {
	if (pokname) {
		const data :Pokemon | null = await _state.PokeAPI.pokemon(pokname);
		if (!data) {
			console.log(`\n Pokemon name not correct \n 	OR \n API errors \n Command Usage: ${_state.commands.handleCatch.usage}`);
		} else {
			console.log(`\n Throwing a Pokeball at ${pokname}...`);
			const captureChance = Math.random() * data.base_experience;
			if (captureChance > data.base_experience/2) {
				console.log(`${pokname} was caught!`);
				_state.Pokedex[pokname] = data;
			} else {
				console.log(`${pokname} escaped!`);
			}
		}
	} else {
		console.log(`Caught nothing`)
	}
	
}


export async function inspect(_state:State, ...[pokname,...ignored]: string[]):Promise<void> {
	if (pokname) {
		const pokData = _state.Pokedex[pokname];
		if (!pokData) {
			console.log(`You have not caught that Pokemon or the name is Incorrect :/`);
		} else {
			console.log("");
			console.log(`Name: ${pokData.name}`);
			console.log(`Height: ${pokData.height}`);
			console.log(`Weight: ${pokData.weight}`);
			console.log(`Stats: `);
			pokData.stats.forEach((item)=> {
				console.log(`  -${item.stat.name}: ${item.base_stat}`);
			})
			console.log(`Types: `);
			pokData.types.forEach((item)=> {
				console.log(`  -${item.type.name}`);
			})
		}
	} else {
		console.log(`\n Inspected nothing because nothing was provided \n Command Usage: ${_state.commands.inspect.usage}`)
	}
}


export async function pokedex(_state: State):Promise<void>{
	const pokeCaptured = Object.keys(_state.Pokedex)

	if (pokeCaptured.length === 0 ) {
		console.log(`Nothing in Your Pokedex, catch some when~?`);
	} else {
		console.log(`Your Pokedex`);
		pokeCaptured.forEach((item) => {
			console.log(` - ${item}`);
		});
	}
	
}