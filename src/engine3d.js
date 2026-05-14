let engine=null;let scene=null;let active=false;
export function startEngine3D(canvasId){
 const canvas=document.getElementById(canvasId);if(!canvas||!window.BABYLON)return;
 if(engine){engine.dispose();engine=null;scene=null;}
 engine=new BABYLON.Engine(canvas,true,{preserveDrawingBuffer:true,stencil:true,antialias:true});
 scene=new BABYLON.Scene(engine);scene.clearColor=new BABYLON.Color4(0.02,0.05,0.03,1);
 const camera=new BABYLON.ArcRotateCamera('JumboCamera',Math.PI/4,Math.PI/3,8,new BABYLON.Vector3(0,1,0),scene);
 camera.attachControl(canvas,true);camera.lowerRadiusLimit=2;camera.upperRadiusLimit=25;camera.wheelDeltaPercentage=0.02;camera.pinchDeltaPercentage=0.01;camera.inputs.attached.pointers.angularSensibilityX=900;camera.inputs.attached.pointers.angularSensibilityY=900;
 const light=new BABYLON.HemisphericLight('JumboLight',new BABYLON.Vector3(0,1,0),scene);light.intensity=0.85;
 const sun=new BABYLON.DirectionalLight('JumboSun',new BABYLON.Vector3(-0.5,-1,-0.5),scene);sun.position=new BABYLON.Vector3(5,8,5);sun.intensity=0.7;
 const ground=BABYLON.MeshBuilder.CreateGround('Piso Jumbo',{width:10,height:10},scene);
 const cube=BABYLON.MeshBuilder.CreateBox('Cubo inicial',{size:1.4},scene);cube.position.y=0.7;
 const sphere=BABYLON.MeshBuilder.CreateSphere('Esfera de prueba',{diameter:1.1,segments:24},scene);sphere.position.set(2,0.55,0);
 const matGround=new BABYLON.StandardMaterial('matPiso',scene);matGround.diffuseColor=new BABYLON.Color3(0.04,0.28,0.12);ground.material=matGround;
 const matCube=new BABYLON.StandardMaterial('matCubo',scene);matCube.diffuseColor=new BABYLON.Color3(1,0.82,0.1);cube.material=matCube;
 const matSphere=new BABYLON.StandardMaterial('matEsfera',scene);matSphere.diffuseColor=new BABYLON.Color3(0.15,0.85,0.45);sphere.material=matSphere;
 const grid=BABYLON.MeshBuilder.CreateGround('Grid',{width:10,height:10,subdivisions:10},scene);grid.position.y=0.003;const gridMat=new BABYLON.StandardMaterial('gridMat',scene);gridMat.wireframe=true;gridMat.diffuseColor=new BABYLON.Color3(1,1,1);gridMat.alpha=0.2;grid.material=gridMat;
 active=true;engine.runRenderLoop(()=>{if(active&&scene)scene.render();});window.addEventListener('resize',resizeEngine);
}
export function resizeEngine(){if(engine)engine.resize();}
export function stopEngine3D(){active=false;if(engine){engine.dispose();engine=null;scene=null;}window.removeEventListener('resize',resizeEngine);}
