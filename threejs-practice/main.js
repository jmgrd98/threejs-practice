import * as three from 'three';

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

renderer.render(scene, camera);
