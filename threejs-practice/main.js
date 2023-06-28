import * as three from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

const scene = new three.Scene();

const geometry = new three.SphereGeometry(3, 64, 64);
const material = new three.MeshStandardMaterial({
  color: '#00ff83',
  // roughness: 0.4,
});
const mesh = new three.Mesh(geometry, material);

scene.add(mesh);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const light = new three.PointLight('#ffffff', 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new three.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);


const canvas = document.querySelector('#canvas');

const renderer = new three.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 20;

window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);
});

const loop = () => {
  controls.update();
  window.requestAnimationFrame(loop);

  mesh.rotation.x += 0.2;
  mesh.rotation.y += 0.2;

  renderer.render(scene, camera);
};

loop();

const timeline = gsap.timeline({
  defaults: {
    duration: 1,
    ease: 'power2.inOut',
  }
});

timeline.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
timeline.fromTo('nav', {y: '-100%'}, {y: '0%'});
timeline.fromTo('h1', {opacity: 0, y: 20}, {opacity: 1, y: 0, stagger: 0.2});

let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => {
  mouseDown = true;
});
window.addEventListener('mouseup', () => {
  mouseDown = false;
});

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    const x = e.clientX;
    const y = e.clientY;

    rgb = [Math.round((e.pageX / size.width) * 255), Math.round((e.pageY / size.height) * 255), 255];

    gsap.to(mesh.material.color, { r: rgb[0] / 255, g: rgb[1] / 255, b: rgb[2] / 255 });

    mesh.rotation.x = x * 0.01;
    mesh.rotation.y = y * 0.01;
  }
});