import {mkdir,readFile,open,rename,unlink,stat} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';

function location(directory){
  if(!path.isAbsolute(directory))throw new Error('CRM storage requires an absolute private directory.');
  return path.join(directory,'cynador-agency.json');
}

export async function readSnapshot(directory,empty){
  try{return JSON.parse(await readFile(location(directory),'utf8'));}
  catch(error){if(error.code==='ENOENT')return empty();throw new Error('Private CRM storage could not be read.');}
}

async function withLock(directory,operation){
  await mkdir(directory,{recursive:true,mode:0o700});
  const lock=path.join(directory,'.crm-write.lock');
  const deadline=Date.now()+15000;
  let handle;
  while(!handle){
    try{handle=await open(lock,'wx',0o600);await handle.writeFile(String(process.pid));}
    catch(error){
      if(error.code!=='EEXIST')throw error;
      const details=await stat(lock).catch(()=>null);
      if(details && Date.now()-details.mtimeMs>600000){await unlink(lock).catch(()=>{});continue;}
      if(Date.now()>deadline)throw new Error('CRM storage is busy. Retry your save.');
      await new Promise(resolve=>setTimeout(resolve,25));
    }
  }
  try{return await operation();}
  finally{await handle.close();await unlink(lock);}
}

async function atomicWrite(directory,value){
  const destination=location(directory);
  const temporary=destination+'.'+randomUUID()+'.tmp';
  const handle=await open(temporary,'wx',0o600);
  try{await handle.writeFile(JSON.stringify(value));await handle.sync();}
  finally{await handle.close();}
  try{
    for(let attempt=0;;attempt++){
      try{await rename(temporary,destination);break;}
      catch(error){
        if(process.platform!=='win32' || !['EPERM','EBUSY'].includes(error.code) || attempt>=10)throw error;
        await new Promise(resolve=>setTimeout(resolve,50));
      }
    }
  }
  catch(error){await unlink(temporary).catch(()=>{});throw error;}
  return value;
}

export function writeSnapshot(directory,value){
  return withLock(directory,()=>atomicWrite(directory,value));
}

export function updateSnapshot(directory,empty,update){
  return withLock(directory,async()=>atomicWrite(directory,await update(await readSnapshot(directory,empty))));
}
