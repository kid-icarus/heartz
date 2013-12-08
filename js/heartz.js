var scene, camera, renderer, newDae, heartmesh, hearts;
hearts = [];
var minX = -20, maxX = 20;
var minY = -20, maxY = 2;
var minZ = -80, maxZ = 0;

var position = { x : 0, y: 300 };
var target = { x : 400, y: 50 };

var userOpts	= {
	range		: 800,
	duration	: 2500,
	delay		: 200,
	easing		: 'Elastic.EaseInOut'
};

init();


function init() {
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor( 0xffd2ff, 1 );

  container = document.getElementById('heartz');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0,0,9);

  scene = new THREE.Scene();
  var light = new THREE.DirectionalLight(0xffffff, 1.5);

  light.position.set(0,0,1);
  scene.add(light);
  camera.position.z = 20;
  renderer.setSize( window.innerWidth, window.innerHeight   );
  loadModel();
  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  for (var i = 0; i < 10; i++) {
    // hearts[i].position.x += 0.0775;
    var derp = 
    hearts[2].rotation.y += 2.0775;
    hearts[3].rotation.y += 0.0175;
    hearts[3].scale.y += .01;
    hearts[3].scale.x += .01;
    hearts[3].scale.z += .01;
    // hearts[3].rotation.y += getRandomInt(0,100) / 1000;
  }

  renderer.render(scene, camera);
}

function loadModel() {
  var loader = new THREE.ColladaLoader();
  loader.options.convertUpAxis = true;
  loader.load( 'js/models/heart.dae', function(result) {
    window.dae = result.scene;
    heartmesh = dae.children[0];
    heartmesh.material = new THREE.MeshNormalMaterial();
    addHeart();
    animate();
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addHeart() {
  for (var i = 0; i < 10; i++) {
    var herpderp = heartmesh.clone();
    herpderp.position.z = getRandomInt(-80,1);
    herpderp.position.x = getRandomInt(-20,20) + ((heartmesh.position.z) * 2) - 20;
    herpderp.position.y = getRandomInt(-20,20) + ((heartmesh.position.z) * 2) - 20;
    console.log(herpderp);
    // herpderp.rotation.y += -Math.Pi/2;
    scene.add(herpderp);
    hearts.push(herpderp);
  }
}
