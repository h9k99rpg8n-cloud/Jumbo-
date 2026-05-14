export const VERSION='Alpha 0.4';
export const NOTES={
 title:'Jumbo Alpha 0.4: Primera escena 3D',
 summary:'Esta version inicia la base del motor Jumbo Engine. Al crear un proyecto se abre una escena 3D basica con camara tactil para acercar, alejar y mover la vista.',
 items:[
  'Nuevo Proyecto ahora crea un proyecto y abre una escena 3D basica.',
  'La escena usa Babylon.js como libreria grafica para navegador y movil.',
  'La camara permite rotar, acercar y alejar con controles tactiles.',
  'Se agrego una flecha para salir facilmente del proyecto y volver al launcher.',
  'Renombrar, duplicar, eliminar, favoritos y ultima vez usado pasan de experimental a oficial.',
  'El idioma ahora se aplica al launcher, tarjetas principales, dock y pantallas principales.',
  'El sistema queda preparado para empezar la construccion real de Jumbo Engine.'
 ]
};
export function notesHTML(){return '<span class="tag">Versiones</span><h2>'+NOTES.title+'</h2><p>'+NOTES.summary+'</p>'+NOTES.items.map(x=>'<div class="panel"><p>'+x+'</p></div>').join('');}
