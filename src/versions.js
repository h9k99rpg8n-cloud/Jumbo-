export const VERSION='Alpha 0.3';
export const NOTES={
 title:'Jumbo Alpha 0.3: Pantallas Completas',
 summary:'Esta actualizacion cambia la forma de navegar en Jumbo. Los modulos principales ya no se abren como ventanas pequenas: ahora funcionan como pantallas completas. Las ventanas emergentes quedan para resumenes, avisos y acciones rapidas.',
 items:[
  'Nuevo Proyecto, Mis Proyectos y Ajustes pasan a pantalla completa para sentirse como una app real.',
  'Las ventanas emergentes se conservan para resumenes de actualizacion, documentacion y acciones rapidas.',
  'Ajustes agrega lenguaje en espanol e ingles.',
  'Ajustes agrega color de botones para personalizar el estilo visual de Jumbo.',
  'El Dock inferior ahora se puede personalizar: el usuario decide que tres accesos rapidos quiere abajo.',
  'Mis Proyectos agrega funciones experimentales: renombrar, duplicar, eliminar, marcar favorito y registrar ultima vez usado.',
  'Las funciones experimentales se activan desde Ajustes porque todavia no pertenecen al motor Jumbo Engine final.'
 ]
};
export function notesHTML(){return '<span class="tag">Versiones</span><h2>'+NOTES.title+'</h2><p>'+NOTES.summary+'</p>'+NOTES.items.map(x=>'<div class="panel"><p>'+x+'</p></div>').join('');}
