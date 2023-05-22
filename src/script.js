import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import * as dat from "lil-gui";
import {
  getRandomTransformInCone,
  getRandomTransformInCube,
  getRandomTransformInSphere,
  getRandomTransformInTorus,
} from "./randomTarnsforms";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Scene
const scene = new THREE.Scene();

/**
 * Donut
 */
const shapeCount = 4;
const objectCount = 10000;
const donutGeometry = new THREE.TorusGeometry(0.5, 0.25, 5, 10);
const donutMaterial = new THREE.MeshBasicMaterial();
const instancedDonut = new THREE.InstancedMesh(
  donutGeometry,
  donutMaterial,
  objectCount * shapeCount
);
scene.add(instancedDonut);

// color attribute for donut instanced mesh
const colors = [];
for (var i = 0; i < shapeCount * objectCount; i += shapeCount) {
  colors.push(1, 0, 0);
  colors.push(0, 1, 0);
  colors.push(0, 0, 1);
  colors.push(1, 1, 0);
}

const bufferAttribute = new THREE.InstancedBufferAttribute(
  new Float32Array(colors),
  3
);
instancedDonut.instanceColor = bufferAttribute;

// gui for donut instanced mesh count
gui
  .add(instancedDonut, "count", 0, shapeCount * objectCount, shapeCount)
  .setValue((shapeCount * objectCount) / 2)
  .name("Donut Count");

for (let i = 0; i < objectCount * shapeCount; i += shapeCount) {
  // Cube Shape
  instancedDonut.setMatrixAt(i, getRandomTransformInCube().matrixWorld);

  // Sphere Shape
  instancedDonut.setMatrixAt(i + 1, getRandomTransformInSphere().matrixWorld);

  // Cone Shape
  instancedDonut.setMatrixAt(i + 2, getRandomTransformInCone().matrixWorld);

  // Torus Shape
  instancedDonut.setMatrixAt(i + 3, getRandomTransformInTorus().matrixWorld);

  instancedDonut.instanceMatrix.needsUpdate = true;
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 160;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Update renderer Info
var drawCallsDisplay = document.getElementById("drawCallsDisplay");
var trianglesDisplay = document.getElementById("trianglesDisplay");
var geometriesDisplay = document.getElementById("geometriesDisplay");
var texturesDisplay = document.getElementById("texturesDisplay");

const updaterendererInfo = () => {
  // Get the draw call count from the WebGLRenderer
  var renderInfo = renderer.info.render;
  var memoryInfo = renderer.info.memory;

  // Update the display element
  drawCallsDisplay.textContent = "Draw Calls: " + renderInfo.calls;
  trianglesDisplay.textContent = "Triangles: " + renderInfo.triangles;
  geometriesDisplay.textContent = "Geometries: " + memoryInfo.geometries;
  texturesDisplay.textContent = "Textures: " + memoryInfo.textures;
};

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Update stats
  stats.update();

  // Update renderer Info
  updaterendererInfo();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
