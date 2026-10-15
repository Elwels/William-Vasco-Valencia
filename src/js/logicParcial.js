import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. ESCENA, CÁMARA Y RENDER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a); // Noche azulada

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 12, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);
controls.update();

// 2. ILUMINACIÓN Y PISO
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(15, 30, 20);
dirLight.castShadow = true;
scene.add(dirLight);

const floorGeo = new THREE.PlaneGeometry(40, 40);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// =========================================================
// TODO: CONSTRUIR LA RUEDA DE LA FORTUNA
// =========================================================

// En esta seccion, debes crear la rueda de la fortuna utilizando geometrías y materiales de Three.js. 


const numCabinas = 8;
const radioRueda = 6;

//================================
// CABINAS
//================================

const cabinas = [];

for (let i = 0; i < numCabinas; i++) {

    const angulo = (i / numCabinas) * Math.PI * 2;

    const cabina = new THREE.Group();

    const cajaGeo = new THREE.BoxGeometry(1.5, 1.5, 1.2);

    const cajaMat = new THREE.MeshStandardMaterial({color: 0x1B497A,roughness: 0.3,metalness: 0.2});

    const caja = new THREE.Mesh(cajaGeo, cajaMat);

    caja.position.y = 0;

    cabina.add(caja);

    const techoGeo = new THREE.CylinderGeometry(0,1.2, 0.6, 4);

    const techoMat = new THREE.MeshStandardMaterial({color: 0xC71A2E,roughness: 0.3,metalness: 0.2});

    const techo = new THREE.Mesh(techoGeo, techoMat);

    techo.position.y = 1.08;

    cabina.add(techo);

    cabina.position.x =
        -1 + Math.cos(angulo) * radioRueda;

    cabina.position.y =
        10 + Math.sin(angulo) * radioRueda;

    cabina.position.z = -1.5;


    scene.add(cabina);
    cabinas.push(cabina);
}

//================================
// SOPORTES
//================================
const altura = 30
const shapesData = [
    
    {name: 'Cylinder',geometry: new THREE.CylinderGeometry( 1, 1, altura, 32 ),posX: -10,posZ:2,rotation:140*(Math.PI / 180)},
    {name: 'Cylinder',geometry: new THREE.CylinderGeometry( 1, 1, altura, 32 ),posX: 10,posZ:2,rotation: Math.PI / 4},
    {name: 'Cylinder',geometry: new THREE.CylinderGeometry( 1, 1, altura, 32 ),posX: -10,posZ:-5,rotation:140*(Math.PI / 180)},
    {name: 'Cylinder',geometry: new THREE.CylinderGeometry( 1, 1, altura, 32 ),posX: 10,posZ:-5,rotation: Math.PI / 4},

];

    const meshes = [];
    let isWireframe = false;

shapesData.forEach( ( shapeData ) => {
    const material = new THREE.MeshStandardMaterial( { color: 0x7A371B, roughness: 0.3, metalness: 0.2} );
    const mesh = new THREE.Mesh( shapeData.geometry, material );
    mesh.position.x = shapeData.posX;
    mesh.position.z = shapeData.posZ;
    
    scene.add( mesh );
    meshes.push( mesh );
    //mesh.rotation.x = Math.PI / 4;
    mesh.rotation.z = shapeData.rotation;
} );

const ejeGeo = new THREE.CylinderGeometry(0.8,0.8,10,32);
const ejeMat = new THREE.MeshStandardMaterial({color:0x8C8773 ,roughness: 0.4,metalness: 0.2})
const eje = new THREE.Mesh(ejeGeo,ejeMat);
eje.position.y = 10
eje.position.z = -1.5
eje.position.x = -1
eje.rotation.x =  Math.PI / 2;
scene.add(eje)

//================================
// RADIOS   
//================================

const numRadios = 8;

const radioGeo = new THREE.CylinderGeometry(0.12, 0.12, radioRueda, 12);
const radioMat = new THREE.MeshStandardMaterial({
    color: 0x8C8773,
    roughness: 0.4,
    metalness: 0.2
});

const radios = [];

for (let i = 0; i < numRadios; i++) {

    const angulo = (i / numRadios) * Math.PI * 2;

  
    const radio1 = new THREE.Mesh(radioGeo, radioMat);

    radio1.position.x = -1 + Math.cos(angulo) * radioRueda / 2;
    radio1.position.y = 10 + Math.sin(angulo) * radioRueda / 2;
    radio1.position.z = 1;

    radio1.rotation.z = angulo - Math.PI / 2;

    scene.add(radio1);
    radios.push(radio1);

    const radio2 = new THREE.Mesh(radioGeo, radioMat);

    radio2.position.x = -1 + Math.cos(angulo) * radioRueda / 2;
    radio2.position.y = 10 + Math.sin(angulo) * radioRueda / 2;
    radio2.position.z = -4;

    radio2.rotation.z = angulo - Math.PI / 2;

    scene.add(radio2);
    radios.push(radio2);
}
//================================
// TORUS
//================================
const geometry = new THREE.TorusGeometry(radioRueda, 0.2, 16, 100);
const material = new THREE.MeshStandardMaterial({  color: 0x8C8773, roughness: 0.4,metalness: 0.2
});
const torus = new THREE.Mesh(geometry, material);
torus.position.y = 10;
torus.position.z = 1
torus.position.x = -1
scene.add(torus);
const torus2 = new THREE.Mesh(geometry, material);
torus2.position.y = 10;
torus2.position.z = -4
torus2.position.x = -1
scene.add(torus2);


let velocidadGiro = 0.01;

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.z += velocidadGiro;
    torus2.rotation.z += velocidadGiro;

    for (let i = 0; i < radios.length; i++) {

        const indiceRadio = Math.floor(i / 2);

        const anguloInicial =
            (indiceRadio / numRadios) * Math.PI * 2;

        const angulo =
            anguloInicial + torus.rotation.z;


        radios[i].position.x =
            -1 + Math.cos(angulo) * radioRueda / 2;

        radios[i].position.y =
            10 + Math.sin(angulo) * radioRueda / 2;

        radios[i].rotation.z =
            angulo - Math.PI / 2;
    }

    for (let i = 0; i < cabinas.length; i++) {

        const anguloInicial =
            (i / numCabinas) * Math.PI * 2;

        const angulo =
            anguloInicial + torus.rotation.z;


        // Movimiento circular

        cabinas[i].position.x =
            -1 + Math.cos(angulo) * radioRueda;

        cabinas[i].position.y =
            10 + Math.sin(angulo) * radioRueda;

        cabinas[i].rotation.z = 0;
    }


    controls.update();

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});