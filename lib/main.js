var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45,innerWidth/innerHeight,1,2000);
cam.position.z+=5;
var sky_texture = new THREE.TextureLoader().load('./texture/sky.jpg');
// scene.background = new THREE.Color(0x000000);
// scene.background= sky_texture;
scene.background = new THREE.CubeTextureLoader()
	.setPath( './skybox/' )
	.load( [
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	] );

var renderer=new THREE.WebGLRenderer();
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

//lighting
// var light = new THREE.PointLight(0xffffff,2);
// light.position.set(2,2,2);
// scene.add(light);
// scene.add(new THREE.PointLightHelper(light, 0.2, 0xff0000));

// var light2 = new THREE.PointLight(0xffffff,2);
// light2.position.set(0,-3,2);
// scene.add(light2);

var directional = new THREE.DirectionalLight(0xffffff,2);
scene.add(directional); 
// directional.castShadow = true;


var loader = new THREE.GLTFLoader().load('./models/Class.gltf', function(result){
    console.log(result);
    // var roomMesh = result.scene.children.find((child)=> child.name === "ruangan" && child.name === "kursi");
    // roomMesh.scale();
    // scene.add(roomMesh)
    scene.add(result.scene.children[0]);
});

//Box Geometry
// var box = new THREE.BoxGeometry(1,1,1);
// var rock_texture = new THREE.TextureLoader().load('./texture/rock.jpg');
// var rock_alpha = new THREE.TextureLoader().load('./texture/rock_alpha.jpg');
// var boxMat = new THREE.MeshBasicMaterial({
//     // color:0xff0000, 
//     map: rock_texture});
// var boxMesh = new THREE.Mesh(box,boxMat);
// scene.add(boxMesh);


// var boxMat2 = new THREE.MeshLambertMaterial({
//     // color:0xff0000, 
//     map: rock_texture});
// var boxMesh2 = new THREE.Mesh(box,boxMat2);
// boxMesh2.position.set(2,0,0);
// scene.add(boxMesh2);

// var boxMat3 = new THREE.MeshPhongMaterial({
//     // color:0xff0000, 
//     map: rock_texture,
//     shininess: 100,
//     bumpMap: rock_alpha
//     // displacementMap: rock_alpha
// });
// var boxMesh3 = new THREE.Mesh(box,boxMat3);
// boxMesh3.position.set(-2,0,0);
// scene.add(boxMesh3);


//Plane geometry/bidang tanah
var planeGeo = new THREE.PlaneGeometry(100,100,5000,500);
var grass_texture = new THREE.TextureLoader().load('./texture/grass.jpg');
var grass_alpha = new THREE.TextureLoader().load('./texture/grass_alpha.png');

var planeMat = new THREE.MeshPhongMaterial({
    //color:0xffffff,
    map: grass_texture,
    displacementMap: grass_alpha
});
var planeMesh = new THREE.Mesh(planeGeo, planeMat);
planeMesh.rotation.x -= Math.PI/2;
planeMesh.position.y -= 2;
scene.add(planeMesh);

// var controls = new THREE.OrbitControls(cam, renderer.domElement);
var controls = new THREE.PointerLockControls(cam, renderer.domElement);
// var clock = new THREE.Clock();

// var btn1 = document.querySelector("#button1");
// btn1.addEventListener('click',()=>{
//     controls.lock();
// });

document.addEventListener('click',()=>{
    controls.lock();
});

var keyboard = [];
addEventListener('keydown',(e)=>{
    keyboard[e.key]=true;
});
addEventListener('keyup',(e)=>{
    keyboard[e.key]=false;
});

function process_keyboard(){
    var speed = 0.2;
    if (keyboard['w']){
        controls.moveForward(speed);
    }
    if(keyboard['s']){
        controls.moveForward(-speed);
    }
    if (keyboard['a']){
        controls.moveRight(-speed);
    }
    if(keyboard['d']){
        controls.moveRight(speed);
    }
    if(keyboard[' ']){
        cam.position.y += 0.05;
    }
    if(keyboard['c']){
        cam.position.y -= 0.05;
    }
};


// var controls = new THREE.FirstPersonControls(cam,renderer.domElement);
// controls.lookSpeed = 0.1;

//var controls = new THREE.TrackballControls(cam, renderer.domElement);

window.addEventListener('resize', function(){
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    cam.aspect = this.window.innerWidth/this.window.innerHeight;
    cam.updateProjectionMatrix();
});


function draw(){
    // controls.update(clock.getDelta());
    process_keyboard();
    requestAnimationFrame(draw);
    
    renderer.render(scene,cam);
}

draw();
