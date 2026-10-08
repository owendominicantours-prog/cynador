export function readSnapshot<T>(directory:string,empty:()=>T):Promise<T>;
export function writeSnapshot<T>(directory:string,value:T):Promise<T>;
export function updateSnapshot<T>(directory:string,empty:()=>T,update:(value:T)=>T|Promise<T>):Promise<T>;
