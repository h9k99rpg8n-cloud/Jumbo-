import {getProjects,putProject,makeId,putSetting} from './storage.js';
import {notesHTML} from './versions.js';
export const apps=[
  {name:'Nuevo Proyecto',icon:'➕',desc:'Crea juegos, apps y mundos.'},
  {name:'Mis Proyectos',icon:'📁',desc:'Abre tus proyectos guardados.'},
  {name:'Ajustes',icon:'⚙️',desc:'Tema, fondo y versiones.'},
  {name:'PC Virtual',icon:'🖥️',desc:'Escritorio interno de Jumbo.'},
  {name:'Consola Virtual',icon:'🎮',desc:'Zona tipo consola.'},
  {name:'IA Jumbo',icon:'🤖',desc:'Asistente del ecosistema.'},
  {name:'Jumbo Studio',icon:'🎬',desc:'Cine, texturas y animacion.'},
  {name:'iOS y Android Unificados',icon:'📱',desc:'Compatibilidad experimental.'}
];
export function appButton(app){return '<button class="tile" onclick="Jumbo.showApp(\''+app.name+'\')"><span class="ico">'+app.icon+'</span><b>'+app.name+'</b><small>'+app.desc+'</small></button>';}
export async function content(name){
  if(name==='Nuevo Proyecto')return '<span class="tag">Creacion</span><h2>Nuevo Proyecto</h2><p>Guardado con Index Store.</p><div class="form"><input id="projectName" placeholder="Nombre"><textarea id="projectDesc" rows="3" placeholder="Descripcion"></textarea><select id="projectType"><option>3D</option><option>2D</option><option>VR</option><option>App</option></select><select id="projectDevice"><option>Movil</option><option>PC</option><option>Web</option><option>Consola</option></select><button class="primary" onclick="Jumbo.createProject()">Crear proyecto</button></div>';
  if(name==='Mis Proyectos'){const ps=await getProjects();let html='<span class="tag">Index Store</span><h2>Mis Proyectos</h2>';if(!ps.length)return html+'<div class="panel"><p>No hay proyectos todavia.</p></div>';return html+ps.map(p=>'<div class="panel"><b>'+p.name+'</b><p>'+p.type+' · '+p.device+'<br>'+(p.desc||'Sin descripcion')+'</p></div>').join('');}
  if(name==='Ajustes')return '<span class="tag">Ajustes</span><h2>Ajustes de Jumbo</h2><div class="panel"><b>Color de fondo</b><div class="form"><button class="mini" onclick="Jumbo.setTheme(\'dark\')">Negro</button><button class="mini" onclick="Jumbo.setTheme(\'light\')">Blanco</button><button class="mini" onclick="Jumbo.setTheme(\'jumbo\')">Verde Jumbo</button></div></div><div class="panel"><b>Fondo del launcher</b><div class="form"><button class="mini" onclick="Jumbo.setBg(\'lines\')">Lineas Jumbo</button><button class="mini" onclick="Jumbo.setBg(\'glow\')">Brillo</button><button class="mini" onclick="Jumbo.setBg(\'clean\')">Limpio</button></div></div><div class="panel"><b>Documentacion oficial</b><p>Lee los cambios de esta version.</p><button class="primary" onclick="Jumbo.showDocs()">Ver versiones</button></div>';
  if(name==='PC Virtual')return '<span class="tag">Modulo</span><h2>PC Virtual</h2><p>Base preparada para ventanas, archivos y apps internas.</p>';
  if(name==='Consola Virtual')return '<span class="tag">Modulo</span><h2>Consola Virtual</h2><p>Zona futura para probar proyectos como consola.</p>';
  if(name==='IA Jumbo')return '<span class="tag">Modulo</span><h2>IA Jumbo</h2><p>Asistente futuro para codigo, ideas y errores.</p>';
  if(name==='Jumbo Studio')return '<span class="tag">Modulo</span><h2>Jumbo Studio</h2><p>Animaciones, trailers, texturas y cinemáticas.</p>';
  return '<span class="tag">Experimental</span><h2>iOS y Android Unificados</h2><p>Panel de compatibilidad movil experimental.</p>';
}
export async function createProjectFromForm(){const p={id:makeId(),name:document.getElementById('projectName').value.trim()||'Proyecto sin nombre',desc:document.getElementById('projectDesc').value.trim(),type:document.getElementById('projectType').value,device:document.getElementById('projectDevice').value,createdAt:new Date().toISOString()};await putProject(p);return p;}
export async function setTheme(t){document.body.classList.remove('theme-dark','theme-light','theme-jumbo');document.body.classList.add('theme-'+t);await putSetting('theme',t);}
export async function setBg(b){document.body.classList.remove('bg-lines','bg-glow','bg-clean');document.body.classList.add('bg-'+b);await putSetting('bg',b);}
export {notesHTML};
