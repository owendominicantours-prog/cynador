import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,writeFile,stat} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {readSnapshot,writeSnapshot,updateSnapshot} from '../lib/crm-file-store.mjs';

test('Private CRM survives concurrent additions and a fresh read',async()=>{
 const directory=await mkdtemp(path.join(os.tmpdir(),'cynador-crm-'));
 try{
  const empty=()=>({leads:[],clients:[{id:'existing-client'}]});
  await writeSnapshot(directory,empty());
  await Promise.all(Array.from({length:30},(_,id)=>updateSnapshot(directory,empty,data=>({...data,leads:[...data.leads,{id}]}))));
  const restored=await readSnapshot(directory,empty);
  assert.equal(restored.leads.length,30);assert.equal(new Set(restored.leads.map(x=>x.id)).size,30);
  assert.equal(restored.clients[0].id,'existing-client');
  if(process.platform!=='win32')assert.equal((await stat(path.join(directory,'cynador-agency.json'))).mode&0o777,0o600);
 }finally{await rm(directory,{recursive:true,force:true});}
});
test('Corrupt CRM fails without silently replacing records with an empty store',async()=>{
 const directory=await mkdtemp(path.join(os.tmpdir(),'cynador-crm-'));
 try{await writeFile(path.join(directory,'cynador-agency.json'),'invalid');await assert.rejects(readSnapshot(directory,()=>({leads:[]})),/could not be read/);}
 finally{await rm(directory,{recursive:true,force:true});}
});
