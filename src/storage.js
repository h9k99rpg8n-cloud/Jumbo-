const DB_NAME='jumbo-index-store';
const DB_VERSION=1;
let dbPromise=null;
function openDB(){
 if(dbPromise)return dbPromise;
 dbPromise=new Promise((resolve,reject)=>{
  const req=indexedDB.open(DB_NAME,DB_VERSION);
  req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('projects'))db.createObjectStore('projects',{keyPath:'id'});if(!db.objectStoreNames.contains('settings'))db.createObjectStore('settings',{keyPath:'id'});};
  req.onsuccess=()=>resolve(req.result);
  req.onerror=()=>reject(req.error);
 });
 return dbPromise;
}
async function store(name,mode='readonly'){const db=await openDB();return db.transaction(name,mode).objectStore(name);}
function run(req){return new Promise((res,rej)=>{req.onsuccess=()=>res(req.result);req.onerror=()=>rej(req.error);});}
export async function putProject(project){const s=await store('projects','readwrite');project.updatedAt=new Date().toISOString();return run(s.put(project)).then(()=>project);}
export async function getProject(id){const s=await store('projects');return run(s.get(id));}
export async function getProjects(){const s=await store('projects');const list=await run(s.getAll());return (list||[]).sort((a,b)=>(b.favorite===true)-(a.favorite===true)||String(b.updatedAt||b.createdAt).localeCompare(String(a.updatedAt||a.createdAt)));}
export async function deleteProject(id){const s=await store('projects','readwrite');return run(s.delete(id));}
export async function renameProject(id,name){const p=await getProject(id);if(!p)return null;p.name=name||p.name;return putProject(p);}
export async function duplicateProject(id){const p=await getProject(id);if(!p)return null;const copy={...p,id:makeId(),name:p.name+' copia',favorite:false,createdAt:new Date().toISOString(),lastUsedAt:null};return putProject(copy);}
export async function toggleFavorite(id){const p=await getProject(id);if(!p)return null;p.favorite=!p.favorite;return putProject(p);}
export async function markUsed(id){const p=await getProject(id);if(!p)return null;p.lastUsedAt=new Date().toISOString();return putProject(p);}
export async function putSetting(id,value){const s=await store('settings','readwrite');return run(s.put({id,value})).then(()=>value);}
export async function getSetting(id,fallback){try{const s=await store('settings');const result=await run(s.get(id));return result?result.value:fallback;}catch(e){return fallback;}}
export function makeId(){return 'jumbo-'+Date.now()+'-'+Math.random().toString(16).slice(2);}
