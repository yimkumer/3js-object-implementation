// Create a scene
var scene = new THREE.Scene();

// Creating and setting a camera
var camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.4,
  1000
);
camera.position.z = 100;

// Creating a renderer for the scene
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating the OrbitControls for camera interaction
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Creating the lights for the scene
var keyLight = new THREE.DirectionalLight(
  new THREE.Color("hsl(30, 100%, 75%)"),
  1.0
);
keyLight.position.set(-100, 0, 100);
scene.add(keyLight);

var fillLight = new THREE.DirectionalLight(
  new THREE.Color("hsl(240, 100%, 75%)"),
  0.75
);
fillLight.position.set(100, 0, 100);
scene.add(fillLight);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
scene.add(backLight);

// Creating a variable to store the mesh
var mesh;

// Loading the OBJ model into the scene
var objLoader = new THREE.OBJLoader();
objLoader.load("trial.obj", function (object) {
  object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      // To center the object
      child.geometry.computeBoundingBox();
      child.position.x =
        -child.geometry.boundingBox.min.x +
        (child.geometry.boundingBox.max.x - child.geometry.boundingBox.min.x) /
          2;
      child.position.y =
        -child.geometry.boundingBox.min.y +
        (child.geometry.boundingBox.max.y - child.geometry.boundingBox.min.y) /
          2;

      // To adjust the vertical position
      child.position.y -= 10;

      // Center the object horizontally
      child.position.x = 0;

      // Making the object face a certain direction
      child.rotation.y = Math.PI - 4;

      //To store the mesh
      mesh = child;

      scene.add(child);
    }
  });
});

//Function for Wrap 1
function wrapModel() {
  var textureLoader = new THREE.TextureLoader();

  textureLoader.load(
    "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    function (texture) {
      texture.minFilter = THREE.LinearFilter;
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    }
  );
}

//Function for Wrap 2
function wrapModel2() {
  var textureLoader = new THREE.TextureLoader();

  textureLoader.load(
    "https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    function (texture) {
      texture.minFilter = THREE.LinearFilter;
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    }
  );
}

//Function for Wrap 3
function wrapModel3() {
  var textureLoader = new THREE.TextureLoader();

  textureLoader.load(
    "https://static.vecteezy.com/system/resources/thumbnails/003/559/339/small/abstract-gradient-blue-and-pink-wave-background-free-vector.jpg",
    function (texture) {
      texture.minFilter = THREE.LinearFilter;
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    }
  );
}

//Function for Wrap 4
function wrapModel4() {
  var textureLoader = new THREE.TextureLoader();

  textureLoader.load(
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600",
    function (texture) {
      texture.minFilter = THREE.LinearFilter;
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    }
  );
}

//Function for resetting the model to default
function resetModel() {
  mesh.material = new THREE.MeshStandardMaterial();
  mesh.material.needsUpdate = true;
}

// Making wrapModels and the resetModel globally accessible
window.wrapModel = wrapModel;
window.wrapModel2 = wrapModel2;
window.wrapModel3 = wrapModel3;
window.wrapModel4 = wrapModel4;
window.resetModel = resetModel;

//setting the Animation loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
