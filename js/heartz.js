var scene, camera, renderer, newDae, heartmesh, hearts;
var scaley = 0;
var flaggy = 0;
hearts = [];
var minX = -20, maxX = 20;
var minY = -20, maxY = 2;
var minZ = -80, maxZ = 0;

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
    hearts[2].rotation.y += 2.0775;
    hearts[3].rotation.y += 0.00175;

    if (scaley >= 10) {
      flaggy = 1;
    }
    if (scaley <= 0) {
      flaggy = 0;
    }

    if (flaggy == 0) {
      hearts[3].scale.y += 0.02;
      hearts[3].scale.x += 0.02;
      hearts[3].scale.z += 0.02;
      scaley += 0.01;
    }
    else {
      hearts[3].scale.y -= 0.02;
      hearts[3].scale.x -= 0.02;
      hearts[3].scale.z -= 0.02;
      scaley -= 0.01;
    }
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
    addText();
    animate();
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addHeart() {
  var bigHeart = heartmesh.clone();
  for (var i = 0; i < 10; i++) {
    var herpderp = heartmesh.clone();
    herpderp.position.z = getRandomInt(-80,1);
    herpderp.position.x = getRandomInt(-20,20) + ((heartmesh.position.z) * 2) - 20;
    herpderp.position.y = getRandomInt(-20,20) + ((heartmesh.position.z) * 2) - 20;
    herpderp.rotation.y = 1.75;
    scene.add(herpderp);
    hearts.push(herpderp);
  }
}

function addText() {
	// add 3D text
	var materialFront = new THREE.MeshNormalMaterial();
	var materialSide = new THREE.MeshNormalMaterial();
  var materialArray = [ materialFront, materialSide ];
  var textGeom = new THREE.TextGeometry( "I <3 U", {
    font: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 30,
    height: 4,
    bevelThickness: 1,
    bevelSize: 2,
    bevelEnabled: true,
    curveSegments: 3,
    material: 0,
    extrudeMaterial: 1
  });

  var textMaterial = new THREE.MeshFaceMaterial(materialArray);
  var textMesh = new THREE.Mesh(textGeom, textMaterial );

  textGeom.computeBoundingBox();
  var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

  textMesh.position.set( -0.5 * textWidth, 1, -40 );
  textMesh.rotation.x = -Math.PI / 4;
  scene.add(textMesh);
}
