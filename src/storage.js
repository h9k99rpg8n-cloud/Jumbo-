const DB_NAME='jumbo-index-store';const DB_VERSION=1;let dbPromise=null;
function openDB(){if(dbPromise)return dbPromise;dbPromise=new Promise((resolve,reject)=>{const req=indexedDB.open(DB_NAME,DB_VERSION);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('projects'))db.createObjectStore('projects',{keyPath:'id'});if(!db.objectStoreNames.contains('settings'))db.createObjectStore('settings',{keyPath:'id'});};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});return dbPromise;}
async function store(name,mode='readonly'){const db=await openDB();return db.transaction(name,mode).objectStore(name);}
export async function putProject(project){const s=await store('projects','readwrite');return new Promise((res,rej)=>{const r=s.put(project);r.onsuccess=()=>res(project);r.onerror=()=>rej(r.error);});}
export async function getProjects(){const s=await store('projects');return new Promise((res,rej)=>{const r=s.getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);});}
export async function putSetting(id,value){const s=await store('settings','readwrite');return new Promise((res,rej)=>{const r=s.put({id,value});r.onsuccess=()=>res(value);r.onerror=()=>rej(r.error);});}
export async function getSetting(id,fallback){const s=await store('settings');return new Promise((res)=>{const r=s.get(id);r.onsuccess=()=>res(r.result?r.result.value:fallback);r.onerror=()=>res(fallback);});}
export function makeId(){return 'jumbo-'+Date.now()+'-'+Math.random().toString(16).slice(2);}
