
export type CacheEntry<T> = {
	createdAt: number;
	val: T;
}


export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId : NodeJS.Timeout | undefined = undefined;
  #interval:number // ms x s x m x h

  constructor(num:number) {
  	this.#interval = num;
  	this.#startReapLoop();
  }


  add<T>(key:string, val: T) :void{
  	const entry:CacheEntry<T> = {
  		createdAt: Date.now(),
  		val: val
  	} 
  	this.#cache.set(key, entry)
  }
  get<T>(key:string):T | undefined {
  	const result =  this.#cache.get(key);
  	return result ? (result.val as T) : undefined;
  }

  #reap():void {
  	//goes through the entries of the map obj and deletes the obj which are older than the set interval
  	for (const [key, val] of this.#cache.entries()) {
  		if (Date.now() - val.createdAt > this.#interval) {
  			this.#cache.delete(key);
  		}
  	}
  }

  #startReapLoop() {
  	this.#reapIntervalId = setInterval( () => {
  		this.#reap()
  	},this.#interval);
  }

  stopReapLoop() {
  	clearInterval(this.#reapIntervalId);
  	this.#reapIntervalId = undefined;
  }
  get size() {
  	return this.#cache.size;
  }
}