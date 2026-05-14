import {appDefs,appButton,pageContent,createProjectFromForm,setTheme,setBg,setButtons,setLang,setCurrentLang,appName,notesHTML,deleteProject,renameProject,duplicateProject,toggleFavorite,markUsed} from './apps.js';
import {getSetting,putSetting} from './storage.js';
import {VERSION} from './versions.js';
import {startEngine3D,stopEngine3D} from './engine3d.js';
const $=id=>document.getElementById(id);
let dockIds=['new','projects','settings'];let currentLang='es';
async function init(){
 const theme=await getSetting('theme','dark');const bg=await getSetting('bg','lines');const buttons=await getSetting('buttons','green');currentLang=await getSetting('lang','es');dockIds=await getSetting('dock',dockIds);setCurrentLang(currentLang);
 document.body.classList.add('theme-'+theme,'bg-'+bg,'btn-'+buttons);
 $('versionBadge').textContent='JUMBO LAUNCHER - '+VERSION;
 renderApps();renderDock();tick();setInterval(tick,1000);
 const seen=await getSetting('seen-'+VERSION,false);if(seen!==true){showUpdate();await putSetting('seen-'+VERSION,true);}
 if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(function(){});}
}
function tick(){const c=$('clock');if(c)c.textContent=new Date().toLocaleTimeString(currentLang==='en'?'en-US':'es-MX',{hour:'2-digit',minute:'2-digit'});}
function openLauncher(){$('home').classList.remove('active');$('desk').classList.add('active');}
function renderApps(){$('ecosystem').innerHTML=appDefs.map(appButton).join('');}
function renderDock(){$('dock').innerHTML=dockIds.map(id=>'<button onclick="Jumbo.openPage(\''+id+'\')">'+appName(id)+'</button>').join('');}
async function openPage(id){const app=appDefs.find(a=>a.id===id)||appDefs[0];$('pageTitle').textContent=appName(app.id);$('pageBody').innerHTML=await pageContent(app.id);$('appPage').classList.add('active');}
function closePage(){$('appPage').classList.remove('active');}
function closeWindow(){$('window').classList.remove('open');}
async function createProject(){const p=await createProjectFromForm();await openProject3D(p.id);}
async function openProject3D(id){await markUsed(id);$('projectView').classList.add('active');setTimeout(()=>startEngine3D('jumboCanvas'),60);}
function closeProject3D(){stopEngine3D();$('projectView').classList.remove('active');}
async function setThemePublic(t){await setTheme(t);}async function setBgPublic(b){await setBg(b);}async function setButtonsPublic(c){await setButtons(c);}async function setLangPublic(l){currentLang=l;await setLang(l);renderApps();renderDock();if($('appPage').classList.contains('active'))await openPage('settings');showToast(l==='en'?'Language changed to English.':'Lenguaje cambiado a español.');}
async function saveDockPublic(){dockIds=[document.getElementById('dock1').value,document.getElementById('dock2').value,document.getElementById('dock3').value];await putSetting('dock',dockIds);renderDock();showToast(currentLang==='en'?'Dock updated.':'Dock actualizado.');}
function showDocs(){showWindow('Documentacion oficial',notesHTML());}
function showUpdate(){showWindow('Actualizacion de Jumbo',notesHTML());}
function showWindow(title,html){$('wtitle').textContent=title;$('wbody').innerHTML=html;$('window').classList.add('open');}
function showToast(text){showWindow('Jumbo','<div class="panel"><p>'+text+'</p></div>');}
async function renameProjectPublic(id){const name=prompt(currentLang==='en'?'New project name:':'Nuevo nombre del proyecto:');if(name){await renameProject(id,name);await openPage('projects');}}
async function deleteProjectPublic(id){if(confirm(currentLang==='en'?'Delete this project?':'Eliminar este proyecto?')){await deleteProject(id);await openPage('projects');}}
async function duplicateProjectPublic(id){await duplicateProject(id);await openPage('projects');}
async function favoriteProjectPublic(id){await toggleFavorite(id);await openPage('projects');}
window.Jumbo={openLauncher,openPage,closePage,closeWindow,createProject,openProject3D,closeProject3D,setTheme:setThemePublic,setBg:setBgPublic,setButtons:setButtonsPublic,setLang:setLangPublic,saveDock:saveDockPublic,showDocs,renameProject:renameProjectPublic,deleteProject:deleteProjectPublic,duplicateProject:duplicateProjectPublic,favoriteProject:favoriteProjectPublic};
init();
