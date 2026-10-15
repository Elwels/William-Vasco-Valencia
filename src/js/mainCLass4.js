import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const backgroundColor =  0x30544D ;
scene.background = new THREE.Color(backgroundColor);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

const light = new THREE.DirectionalLight( 0xffffff, 1.2 );
light.position.set( 5, 10, 7 );
scene.add( light );

//Definition of primitive shapes

const shapesData = [
    {
        name: 'Sol',
        geometry: new THREE.SphereGeometry(1, 200,200 ),
        color: 0xF09516, 
        posX: 0,
        size: 6
    },
    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0xEDD577, 
        posX: 10,
        size: 1
    },
    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0xBF8C52, 
        posX: 20,
        size: 2
    },
    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0x3773C4, 
        posX: 30,
        size: 2
    },
    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0xBA3306, 
        posX: 40,
        size: 3
    },
    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0x7A6D54, 
        posX: 50,
        size: 5
    },
    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0x8A654A, 
        posX: 62,
        size: 4
    },
    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0x3C9E9E, 
        posX: 72,
        size: 2
    },
    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry( 1, 200, 200 ),
        color: 0x3C659E, 
        posX: 78,
        size: 1
    },

];


    const meshes = [];
    let isWireframe = false;


    // Generate meshes for each shape and add them to the scene
shapesData.forEach( ( shapeData ) => {
    const material = new THREE.MeshStandardMaterial( { color: shapeData.color, wireframe: isWireframe, roughness: 0.3, metalness: 0.2} );
    const mesh = new THREE.Mesh( shapeData.geometry, material );
    mesh.position.x = shapeData.posX;
    mesh.scale.set( shapeData.size, shapeData.size,shapeData.size);
    scene.add( mesh );
    meshes.push( mesh );
} );




const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, -1.5, 9 );
controls.update();

const geometry = new THREE.RingGeometry( 1, 6, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xBD883C, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
mesh.position.x = 62
mesh.rotation.x = Math.PI / 2



function animate( time ) {

  renderer.render( scene, camera );
  controls.update();

}

// 2. Handle Responsive Resizing
function onWindowResize() {
  // Update camera aspect ratio based on the new container bounds
  camera.aspect = window.innerWidth / window.innerHeight;
  
  // Crucial: Update the projection matrix to apply changes
  camera.updateProjectionMatrix();

  // Update renderer size and pixel ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// 3. Listen for the resize event
window.addEventListener('resize', onWindowResize);
