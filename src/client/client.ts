import * as THREE from "three";

function render() {
  renderer.render(scene, camera);
}

function createSpotlights(scene: THREE.Scene) {
  const color = 0xffffff;
  const intensity = 5;
  const distance = 25;
  const angle = Math.PI / 7;

  for (let i = 0; i < 6; i++) {
    const spotlight = new THREE.SpotLight(color, intensity, distance, angle);
    const value = i % 2 === 0 ? 25 : -25;

    spotlight.position.set(
      i < 2 ? value : 0,
      i >= 2 && i < 4 ? value : 0,
      i >= 4 ? value : 0,
    );
    scene.add(spotlight);
  }
}

function createPlanet(
  scene: THREE.Scene,
  planet: THREE.Mesh,
  group: THREE.Group,
  x: number,
  scale: number,
): void {
  planet.position.set(x, 0, 0);
  planet.scale.setScalar(scale);
  planet.rotateX(0.3);
  group.add(planet);
  scene.add(group);
}

function createRing(
  color: THREE.Texture,
  innerRadius: number,
  outerRadius: number,
): THREE.Mesh {
  const ring = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    100,
    8,
    0,
    6.283185307179586,
  );
  const ringTexture = new THREE.TextureLoader().load("./img/ring-texture.jpg");
  const meshMaterial = new THREE.MeshStandardMaterial({
    map: color,
    normalMap: ringTexture,
  });
  const planetRing = new THREE.Mesh(ring, meshMaterial)
    .rotateY(9.5)
    .rotateX(-14.4)
    .rotateZ(8);

  return planetRing;
}

function createPlanetaryRing(
  scene: THREE.Scene,
  ring: THREE.Mesh,
  group: THREE.Group,
  x: number,
) {
  ring.position.set(x, 0, 0);
  group.add(ring);
  scene.add(group);
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.07, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(100)
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  const scrollDirection = Math.sign(t - previousScrollTop);
  previousScrollTop = t;

  joshCube.rotation.x += scrollDirection * 0.01;
  joshCube.rotation.y -= scrollDirection * 0.01;
  joshCube.rotation.z += scrollDirection * 0.01;

  camera.position.z = t * -0.019;
  camera.position.x = t * -0.00006;
  camera.rotation.y = t * -0.00006;

  isUserScrolling = true;
  if (scrollTimeoutId !== undefined) {
    clearTimeout(scrollTimeoutId);
  }
  scrollTimeoutId = setTimeout(() => {
    isUserScrolling = false;
  }, 66) as unknown as number;
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (!isUserScrolling && window.scrollY === 0) {
    // reset cube's rotation when not scrolling and scrollbar is at the top
    joshCube.rotation.x *= 0.95;
    joshCube.rotation.y *= 0.95;
    joshCube.rotation.z *= 0.95;
  }
  // rotation speed
  const rotationSpeed = 0.1 * delta;

  sun.rotateY(rotationSpeed);
  mercury.rotateY(rotationSpeed);
  venus.rotateY(rotationSpeed);
  earth.rotateY(rotationSpeed);
  mars.rotateY(rotationSpeed);
  jupiter.rotateY(rotationSpeed);
  saturn.rotateY(rotationSpeed);
  uranus.rotateY(rotationSpeed);
  neptune.rotateY(rotationSpeed);
  pluto.rotateY(rotationSpeed);
  saturnRing0.rotateZ(rotationSpeed);
  saturnRing1.rotateZ(rotationSpeed);
  saturnRing2.rotateZ(rotationSpeed);
  saturnRing3.rotateZ(rotationSpeed);
  saturnRing4.rotateZ(rotationSpeed);
  uranusRing0.rotateZ(rotationSpeed);
  uranusRing1.rotateZ(rotationSpeed);

  // orbit speed
  mercuryOrbit.rotateY(0.5 * delta);
  venusOrbit.rotateY(0.35 * delta);
  earthOrbit.rotateY(0.3 * delta);
  marsOrbit.rotateY(0.2 * delta);
  jupiterOrbit.rotateY(0.05 * delta);
  saturnOrbit.rotateY(0.03 * delta);
  uranusOrbit.rotateY(0.02 * delta);
  neptuneOrbit.rotateY(0.015 * delta);
  plutoOrbit.rotateY(0.005 * delta);
  saturnRingOrbit0.rotateY(0.03 * delta);
  saturnRingOrbit1.rotateY(0.03 * delta);
  saturnRingOrbit2.rotateY(0.03 * delta);
  saturnRingOrbit3.rotateY(0.03 * delta);
  saturnRingOrbit4.rotateY(0.03 * delta);
  uranusRingOrbit0.rotateY(0.02 * delta);
  uranusRingOrbit1.rotateY(0.02 * delta);

  render();
}

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.setZ(30);
camera.position.setX(-9);

// render
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

// textures
const loader = new THREE.TextureLoader();

const spaceTexture = loader.load("./img/space.jpg");
const joshTexture = loader.load("./img/josh.png");
const sunTexture = loader.load("img/sun.jpg");
const mercuryTexture = loader.load("img/mercury.jpg");
const venusTexture = loader.load("img/venus.jpg");
const earthTexture = loader.load("img/earth.jpg");
const marsTexture = loader.load("img/mars.jpg");
const jupiterTexture = loader.load("img/jupiter.jpg");
const saturnTexture = loader.load("img/saturn.jpg");
const uranusTexture = loader.load("img/uranus.jpg");
const neptuneTexture = loader.load("img/neptune.jpg");
const plutoTexture = loader.load("img/pluto.jpeg");
const saturnRingTexture0 = loader.load("./img/saturn-ring-0.jpg");
const saturnRingTexture1 = loader.load("./img/saturn-ring-1.jpg");
const uranusRingTexture = loader.load("./img/uranus-ring.jpg");

// materials
const joshMaterial = new THREE.MeshStandardMaterial({ map: joshTexture });
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
const plutoMaterial = new THREE.MeshStandardMaterial({ map: plutoTexture });

scene.background = spaceTexture;

// profile cube
const joshCube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), joshMaterial);
scene.add(joshCube);
joshCube.position.z = -4.9;
joshCube.position.x = 1.57;

// sun
const sphere = new THREE.SphereGeometry(1, 100, 50);
const sun = new THREE.Mesh(sphere, sunMaterial);
sun.scale.setScalar(10);
scene.add(sun);

// planets

const mercuryOrbit = new THREE.Group();
const mercury = new THREE.Mesh(sphere, mercuryMaterial);
createPlanet(scene, mercury, mercuryOrbit, 25, 0.8);

const venusOrbit = new THREE.Group();
const venus = new THREE.Mesh(sphere, venusMaterial);
createPlanet(scene, venus, venusOrbit, 28, 0.9);

const earthOrbit = new THREE.Group();
const earth = new THREE.Mesh(sphere, earthMaterial);
createPlanet(scene, earth, earthOrbit, 31, 1);

const marsOrbit = new THREE.Group();
const mars = new THREE.Mesh(sphere, marsMaterial);
createPlanet(scene, mars, marsOrbit, 34, 0.8);

const jupiterOrbit = new THREE.Group();
const jupiter = new THREE.Mesh(sphere, jupiterMaterial);
createPlanet(scene, jupiter, jupiterOrbit, 36, 3.5);

const saturnOrbit = new THREE.Group();
const saturn = new THREE.Mesh(sphere, saturnMaterial);
createPlanet(scene, saturn, saturnOrbit, 50, 2.9);

const uranusOrbit = new THREE.Group();
const uranus = new THREE.Mesh(sphere, uranusMaterial);
createPlanet(scene, uranus, uranusOrbit, 61, 1.7);

const neptuneOrbit = new THREE.Group();
const neptune = new THREE.Mesh(sphere, neptuneMaterial);
createPlanet(scene, neptune, neptuneOrbit, 68, 1.65);

const plutoOrbit = new THREE.Group();
const pluto = new THREE.Mesh(sphere, plutoMaterial);
createPlanet(scene, pluto, plutoOrbit, 71, 0.5);

const saturnRingOrbit0 = new THREE.Group();
const saturnRing0 = createRing(saturnRingTexture0, 5.2, 5.45);
createPlanetaryRing(scene, saturnRing0, saturnRingOrbit0, 50);

const saturnRingOrbit1 = new THREE.Group();
const saturnRing1 = createRing(saturnRingTexture1, 5.55, 5.8);
createPlanetaryRing(scene, saturnRing1, saturnRingOrbit1, 50);

const saturnRingOrbit2 = new THREE.Group();
const saturnRing2 = createRing(saturnRingTexture0, 5.9, 6.15);
createPlanetaryRing(scene, saturnRing2, saturnRingOrbit2, 50);

const saturnRingOrbit3 = new THREE.Group();
const saturnRing3 = createRing(saturnRingTexture1, 6.25, 6.5);
createPlanetaryRing(scene, saturnRing3, saturnRingOrbit3, 50);

const saturnRingOrbit4 = new THREE.Group();
const saturnRing4 = createRing(saturnRingTexture0, 6.6, 6.85);
createPlanetaryRing(scene, saturnRing4, saturnRingOrbit4, 50);

const uranusRingOrbit0 = new THREE.Group();
const uranusRing0 = createRing(uranusRingTexture, 2.45, 2.55);
createPlanetaryRing(scene, uranusRing0, uranusRingOrbit0, 61);

const uranusRingOrbit1 = new THREE.Group();
const uranusRing1 = createRing(uranusRingTexture, 3.25, 3.45);
createPlanetaryRing(scene, uranusRing1, uranusRingOrbit1, 61);

// sunlight
const light = new THREE.PointLight("white", 1.25);
light.position.set(0, 0, 0);
scene.add(light);

// illuminate the sun
createSpotlights(scene);

// stars
Array(600).fill(100).forEach(addStar);

// scroll animation
let previousScrollTop = document.body.getBoundingClientRect().top;
let isUserScrolling: boolean = false;
let scrollTimeoutId: number | undefined;

document.body.onscroll = moveCamera;
moveCamera();

const clock = new THREE.Clock();

animate();
