import {getProjects,putProject,makeId,putSetting,deleteProject,renameProject,duplicateProject,toggleFavorite,markUsed} from './storage.js';
import {notesHTML} from './versions.js';
export const labels={
 es:{new:'Nuevo Proyecto',projects:'Mis Proyectos',settings:'Ajustes',pc:'PC Virtual',console:'Consola Virtual',ai:'IA Jumbo',studio:'Jumbo Studio',mobile:'iOS y Android Unificados'},
 en:{new:'New Project',projects:'My Projects',settings:'Settings',pc:'Virtual PC',console:'Virtual Console',ai:'Jumbo AI',studio:'Jumbo Studio',mobile:'iOS and Android Unified'}
};
export const apps=[
 {id:'new',name:'Nuevo Proyecto',icon:'➕',desc:'Crea juegos, apps y mundos.'},
 {id:'projects',name:'Mis Proyectos',icon:'📁',desc:'Abre tus proyectos guardados.'},
 {id:'settings',name:'Ajustes',icon:'⚙️',desc:'Tema, idioma y versiones.'},
 {id:'pc',name:'PC Virtual',icon:'🖥️',desc:'Escritorio interno de Jumbo.'},
 {id:'console',name:'Consola Virtual',icon:'🎮',desc:'Zona tipo consola.'},
 {id:'ai',name:'IA Jumbo',icon:'🤖',desc:'Asistente del ecosistema.'},
 {id:'studio',name:'Jumbo Studio',icon:'🎬',desc:'Cine, texturas y animacion.'},
 {id:'mobile',name:'iOS y Android Unificados',icon:'📱',desc:'Compatibilidad experimental.'}
];
export function byName(name){return apps.find(a=>a.name===name)||apps.find(a=>a.id===name)||apps[0];}
export function appButton(app){return '<button class="tile" onclick="Jumbo.openPage(\''+app.id+'\')"><span class="ico">'+app.icon+'</span><b>'+app.name+'</b><small>'+app.desc+'</small></button>';}
export async function pageContent(id){
 if(id==='new')return newProjectHTML();
 if(id==='projects')return await projectsHTML();
 if(id==='settings')return await settingsHTML();
 if(id==='pc')return '<span class="tag">Modulo</span><h2>PC Virtual</h2><p>Pantalla completa preparada para escritorio, ventanas, archivos y apps internas. Esta base sera el inicio del sistema tipo computadora de Jumbo.</p><div class="panel"><b>Estado</b><p>Base estructural lista. Falta construir explorador, ventanas y apps.</p></div>';
 if(id==='console')return '<span class="tag">Modulo</span><h2>Consola Virtual</h2><p>Pantalla futura para probar proyectos como si fueran juegos de consola.</p>';
 if(id==='ai')return '<span class="tag">Modulo</span><h2>IA Jumbo</h2><p>Asistente futuro para codigo, ideas, errores y ayuda dentro del ecosistema.</p>';
 if(id==='studio')return '<span class="tag">Modulo</span><h2>Jumbo Studio</h2><p>Zona para animaciones, trailers, texturas, modelos y cinematica.</p>';
 return '<span class="tag">Experimental</span><h2>iOS y Android Unificados</h2><p>Panel experimental para compatibilidad movil. No todo funciona igual en iPhone y Android, por eso queda como zona de pruebas.</p>';
}
function newProjectHTML(){return '<span class="tag">Pantalla completa</span><h2>Nuevo Proyecto</h2><p>Ahora esta seccion usa una pantalla completa y guarda con Index Store.</p><div class="form"><input id="projectName" placeholder="Nombre del proyecto"><textarea id="projectDesc" rows="3" placeholder="Descripcion"></textarea><select id="projectType"><option>3D</option><option>2D</option><option>VR</option><option>App</option></select><select id="projectDevice"><option>Movil</option><option>PC</option><option>Web</option><option>Consola</option></select><button class="primary" onclick="Jumbo.createProject()">Crear proyecto</button></div>';}
async function projectsHTML(){const ps=await getProjects();let html='<span class="tag">Index Store</span><h2>Mis Proyectos</h2><p>Experimental: renombrar, duplicar, eliminar, favoritos y ultima vez usado.</p>';if(!ps.length)return html+'<div class="panel"><p>No hay proyectos todavia.</p></div>';return html+ps.map(p=>'<div class="panel project-card '+(p.favorite?'favorite':'')+'"><b>'+(p.favorite?'⭐ ':'')+p.name+'</b><p>'+p.type+' · '+p.device+'<br>Creado: '+fmt(p.createdAt)+'<br>Ultimo uso: '+fmt(p.lastUsedAt)+'</p><div class="project-actions"><button class="mini" onclick="Jumbo.useProject(\''+p.id+'\')">Usar</button><button class="mini" onclick="Jumbo.renameProject(\''+p.id+'\')">Renombrar</button><button class="mini" onclick="Jumbo.duplicateProject(\''+p.id+'\')">Duplicar</button><button class="mini" onclick="Jumbo.favoriteProject(\''+p.id+'\')">Favorito</button><button class="mini" onclick="Jumbo.deleteProject(\''+p.id+'\')">Eliminar</button></div></div>').join('');}
async function settingsHTML(){return '<span class="tag">Sistema</span><h2>Ajustes</h2><div class="panel"><b>Lenguaje</b><div class="form"><button class="mini" onclick="Jumbo.setLang(\'es\')">Español</button><button class="mini" onclick="Jumbo.setLang(\'en\')">English</button></div></div><div class="panel"><b>Color de fondo</b><div class="form"><button class="mini" onclick="Jumbo.setTheme(\'dark\')">Negro</button><button class="mini" onclick="Jumbo.setTheme(\'light\')">Blanco</button><button class="mini" onclick="Jumbo.setTheme(\'jumbo\')">Verde Jumbo</button></div></div><div class="panel"><b>Fondo del launcher</b><div class="form"><button class="mini" onclick="Jumbo.setBg(\'lines\')">Lineas Jumbo</button><button class="mini" onclick="Jumbo.setBg(\'glow\')">Brillo</button><button class="mini" onclick="Jumbo.setBg(\'clean\')">Limpio</button></div></div><div class="panel"><b>Color de botones</b><div class="form"><button class="mini" onclick="Jumbo.setButtons(\'green\')">Verde/Oro</button><button class="mini" onclick="Jumbo.setButtons(\'blue\')">Azul</button><button class="mini" onclick="Jumbo.setButtons(\'red\')">Rojo/Oro</button><button class="mini" onclick="Jumbo.setButtons(\'purple\')">Morado</button></div></div><div class="panel"><b>Dock inferior</b><p>Elige los tres accesos rapidos de abajo.</p><div class="form"><select id="dock1">'+opts()+'</select><select id="dock2">'+opts()+'</select><select id="dock3">'+opts()+'</select><button class="primary" onclick="Jumbo.saveDock()">Guardar Dock</button></div></div><div class="panel"><b>Experimental</b><p>Funciones de Mis Proyectos: renombrar, duplicar, eliminar, favoritos y ultima vez usado.</p><button class="primary" onclick="Jumbo.toggleExperimental()">Activar / desactivar experimental</button></div><div class="panel"><b>Documentacion oficial</b><button class="primary" onclick="Jumbo.showDocs()">Ver versiones</button></div>';}
function opts(){return apps.map(a=>'<option value="'+a.id+'">'+a.name+'</option>').join('');}
function fmt(v){if(!v)return 'Sin datos';try{return new Date(v).toLocaleString('es-MX');}catch(e){return v;}}
export async function createProjectFromForm(){const p={id:makeId(),name:document.getElementById('projectName').value.trim()||'Proyecto sin nombre',desc:document.getElementById('projectDesc').value.trim(),type:document.getElementById('projectType').value,device:document.getElementById('projectDevice').value,createdAt:new Date().toISOString(),lastUsedAt:null,favorite:false};await putProject(p);return p;}
export async function setTheme(t){document.body.classList.remove('theme-dark','theme-light','theme-jumbo');document.body.classList.add('theme-'+t);await putSetting('theme',t);}
export async function setBg(b){document.body.classList.remove('bg-lines','bg-glow','bg-clean');document.body.classList.add('bg-'+b);await putSetting('bg',b);}
export async function setButtons(c){document.body.classList.remove('btn-green','btn-blue','btn-red','btn-purple');document.body.classList.add('btn-'+c);await putSetting('buttons',c);}
export async function setLang(l){await putSetting('lang',l);}
export async function saveDock(ids){await putSetting('dock',ids);}
export {notesHTML,deleteProject,renameProject,duplicateProject,toggleFavorite,markUsed};
