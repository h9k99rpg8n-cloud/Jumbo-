import {apps,appButton,content,createProjectFromForm,setTheme,setBg,notesHTML} from './apps.js';
import {getSetting,putSetting} from './storage.js';
import {VERSION} from './versions.js';
const $=id=>document.getElementById(id);
async function init(){
 const theme=await getSetting('theme','dark');
 const bg=await getSetting('bg','lines');
 document.body.classList.add('theme-'+theme);
 document.body.classList.add('bg-'+bg);
 $('versionBadge').textContent='JUMBO LAUNCHER - '+VERSION;
 renderApps();tick();setInterval(tick,1000);
 const seen=await getSetting('seen-'+VERSION,false);
 if(seen!==true){showUpdate();await putSetting('seen-'+VERSION,true);}
 if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(function(){});}
}
function tick(){const c=$('clock');if(c)c.textContent=new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'});}
function openLauncher(){$('home').classList.remove('active');$('desk').classList.add('active');}
function renderApps(){$('ecosystem').innerHTML=apps.map(appButton).join('');}
async function showApp(name){$('wtitle').textContent=name;$('wbody').innerHTML=await content(name);$('window').classList.add('open');}
function closeWindow(){$('window').classList.remove('open');}
async function createProject(){await createProjectFromForm();await showApp('Mis Proyectos');}
async function setThemePublic(t){await setTheme(t);}
async function setBgPublic(b){await setBg(b);}
function showDocs(){$('wtitle').textContent='Documentacion oficial';$('wbody').innerHTML=notesHTML();$('window').classList.add('open');}
function showUpdate(){$('wtitle').textContent='Actualizacion de Jumbo';$('wbody').innerHTML=notesHTML();$('window').classList.add('open');}
window.Jumbo={openLauncher,showApp,closeWindow,createProject,setTheme:setThemePublic,setBg:setBgPublic,showDocs};
init();
