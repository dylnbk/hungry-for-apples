import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let renderer, scene, camera, controls, apple;


// Setup

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#container'),
});

renderer.setClearColor( 0x000000, 0 );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(90, 40, -60);

renderer.render(scene, camera);

controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 70;
controls.maxDistance = 130;
controls.enableDamping = true;
controls.enablePan = false;

// Lights

const pointLightB = new THREE.PointLight(0xffffff, 0.3);
pointLightB.position.set(20, 100, -80);

const pointLightA = new THREE.PointLight(0xffffff, 0.05);
pointLightA.position.set(-60, -100, -100);

const ambientLight = new THREE.AmbientLight(0x222222, 2);

const hemiLight = new THREE.HemisphereLight( 0xFDFAFB, 0x090909, 0.45 );

scene.add( pointLightA, pointLightB, ambientLight, hemiLight );

// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

// object

var loader = new GLTFLoader();;
            
loader.load( 'apple/scene.gltf', function ( gltf )
{
    apple = gltf.scene;
    apple.scale.set(0.29, 0.29, 0.29);
    apple.position.set(0, -30, 0);
    scene.add(apple);
} );

// window perspective

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  if ( apple ) apple.rotation.y += 0.007;
  controls.update();
  renderer.render(scene, camera);
}

animate();
window.addEventListener( 'resize', onWindowResize );