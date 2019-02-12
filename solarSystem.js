var renderer = null, 
scene = null, 
camera = null,
orbitControls = null,
orbits = null,
solarSystem = null,
map = null,
normalMap = null,
specularMap = null,
bumpMap = null;

var sunMapUrl = "images/1 - sun.jpg";
map = new THREE.TextureLoader().load(sunMapUrl);
var sun_materials = new THREE.MeshPhongMaterial({ map: map });

var mercuryMapUrl = "images/2 - mercury.jpg";
var mercuryBumpMapUrl = "images/2.1 - mercurybump.jpg";
map = new THREE.TextureLoader().load(mercuryMapUrl);
bumpMap = new THREE.TextureLoader().load(mercuryBumpMapUrl);
var mercury_materials = new THREE.MeshPhongMaterial({ map: map, bumpMap: map, bumpScale: 1.5 });

var venusMapUrl = "images/3 - venus.jpg";
var venusBumpMapUrl = "images/3.1 - venusbump.jpg";
map = new THREE.TextureLoader().load(venusMapUrl);
bumpMap = new THREE.TextureLoader().load(venusBumpMapUrl);
var venus_materials = new THREE.MeshPhongMaterial({ map: map, bumpMap: map, bumpScale: 1.0 });

var earthMapUrl = "images/4 - earth.jpg";
var earthNormalMapUrl = "images/4.1 - earthnormal.jpg";
var earthspecularMapUrl = "images/4.2 - earthspecular.jpg";
map = new THREE.TextureLoader().load(earthMapUrl);
normalMap = new THREE.TextureLoader().load(earthNormalMapUrl);
specularMap = new THREE.TextureLoader().load(earthspecularMapUrl);
var earth_materials = new THREE.MeshPhongMaterial({ map: map, normalMap: normalMap, specularMap: specularMap });

var marsMapUrl = "images/5 - mars.jpg";
var marsBumpMapUrl = "images/5.1 - marsbump.jpg";
map = new THREE.TextureLoader().load(marsMapUrl);
bumpMap = new THREE.TextureLoader().load(marsBumpMapUrl);
var mars_materials = new THREE.MeshPhongMaterial({ map: map, bumpMap: map, bumpScale: 1.5 });

var jupiterMapUrl = "images/6 - jupiter.jpg";
map = new THREE.TextureLoader().load(jupiterMapUrl);
var jupiter_materials = new THREE.MeshPhongMaterial({ map: map });

var saturnMapUrl = "images/7 - saturn.jpg";
map = new THREE.TextureLoader().load(saturnMapUrl);
var saturn_materials = new THREE.MeshPhongMaterial({ map: map });

var uranusMapUrl = "images/8 - uranus.jpg";
map = new THREE.TextureLoader().load(uranusMapUrl);
var uranus_materials = new THREE.MeshPhongMaterial({ map: map });

var neptuneMapUrl = "images/9 - neptune.jpg";
map = new THREE.TextureLoader().load(neptuneMapUrl);
var neptune_materials = new THREE.MeshPhongMaterial({ map: map });

var plutoMapUrl = "images/10 - pluto.jpg";
var plutoBumpMapUrl = "images/10.1 - plutobump.jpg";
map = new THREE.TextureLoader().load(plutoMapUrl);
bumpMap = new THREE.TextureLoader().load(plutoBumpMapUrl);
var pluto_materials = new THREE.MeshPhongMaterial({map: map, bumpMap: map, bumpScale: 1.5 });

var moonMapUrl = "images/11 - moon.jpg";
var moonBumpMapUrl = "images/11.1 - moonbump.jpg";
map = new THREE.TextureLoader().load(moonMapUrl);
bumpMap = new THREE.TextureLoader().load(moonBumpMapUrl);
var moon_materials = new THREE.MeshPhongMaterial({map: map, bumpMap: map, bumpScale: 0.5 });

var sun = generatePlanet({ size_: 100, mat_: sun_materials });
var mercury = generatePlanet({ size_: 9.8, mat_: mercury_materials });
var venus = generatePlanet({ size_: 17.0, mat_: venus_materials });
var earth = generatePlanet({ size_: 17.6, mat_: earth_materials });
var mars = generatePlanet({ size_: 11.6, mat_: mars_materials });
var jupiter = generatePlanet({ size_: 40.9, mat_: jupiter_materials });
var saturn = generatePlanet({ size_: 35.2, mat_: saturn_materials });
var uranus = generatePlanet({ size_: 20.3, mat_: uranus_materials });
var neptune = generatePlanet({ size_: 19.6, mat_: neptune_materials });
var pluto = generatePlanet({ size_: 9.0, mat_: pluto_materials });

var orbitMercury = new THREE.Object3D;
var orbitVenus = new THREE.Object3D;
var orbitEarth = new THREE.Object3D;
var orbitMars = new THREE.Object3D;
var orbitJupiter = new THREE.Object3D;
var orbitSaturn = new THREE.Object3D;
var orbitUranus = new THREE.Object3D;
var orbitNeptune = new THREE.Object3D;
var orbitPluto = new THREE.Object3D;

var duration = 20000; // ms
var currentTime = Date.now();

function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    generateRotation(orbits, angle);
    generateRevolution(orbits, angle);
}

function run() {
    requestAnimationFrame(function() { run(); });
        // Render the scene
        renderer.render( scene, camera );
        // Spin the cube for next frame
        animate();
        // Update the camera controller
        orbitControls.update();
}

function createScene(canvas) {
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    // Set the viewport size
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Set for OrbitControls
    document.body.appendChild(renderer.domElement);
    // Create a new Three.js scene
    scene = new THREE.Scene();
    // Set background
    scene.background = new THREE.TextureLoader().load("images/milkyway.png");
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    orbitControls = new THREE.OrbitControls( camera, renderer.domElement);
    // controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(-500.52, 0, 0);
    // Add scene to the camera
    scene.add(camera);
    // Create Solar System
    createSolarSystem();
}

function createSolarSystem(){
    orbits = new THREE.Object3D;
    solarSystem = new THREE.Object3D;
    universeLight = new THREE.PointLight (0xffffff);
    universeLight.position.set(0,0,0);
    solarSystem.add(universeLight);

    sun.add(new THREE.AmbientLight(0xffffff, 1.0));

    sun.position.set(0, 0, 0);
    mercury.position.set(0, 0, 150);
    venus.position.set(0, 0, 200);
    earth.position.set(0, 0, 250);
    mars.position.set(0, 0, 300);
    jupiter.position.set(0, 0, 380);
    saturn.position.set(0, 0, 510);
    uranus.position.set(0, 0, 620);
    neptune.position.set(0, 0, 700);
    pluto.position.set(0, 0, 750);

    var saturnRadius = saturn.geometry.parameters.radius;
    var saturnRingsTexture = new THREE.TextureLoader().load("images/7.1 - saturn ring.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    var saturnGeometryRings = new THREE.RingGeometry(1.2 * saturnRadius, 2 * saturnRadius, 2 * 100, 5, 0, Math.PI * 2);
    var saturnRings = new THREE.Mesh(saturnGeometryRings, saturnMaterials);
    saturnRings.rotation.set(20, 0, 0);
    saturnRings.rotation.y = Math.PI / 5;
    saturn.add(saturnRings);

    var uranusRadius = uranus.geometry.parameters.radius;
    var uranusRingsTexture = new THREE.TextureLoader().load("images/8.1 - uranus ring.png");
    var uranusMaterials = new THREE.MeshPhongMaterial({ map: uranusRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    var uranusGeometryRings = new THREE.RingGeometry(1 * uranusRadius, 2 * uranusRadius, 2 * 100, 5, 0, Math.PI * 2);
    var uranusRings = new THREE.Mesh(uranusGeometryRings, uranusMaterials);
    uranusRings.rotation.set(20, 0, 0);
    uranusRings.rotation.y = Math.PI / 3;
    uranus.add(uranusRings);

    orbitMercury = generateOrbit(150);
    orbitVenus = generateOrbit(200);
    orbitEarth = generateOrbit(250);
    orbitMars = generateOrbit(300);
    orbitJupiter = generateOrbit(380);
    orbitSaturn = generateOrbit(510);
    orbitUranus = generateOrbit(620);
    orbitNeptune = generateOrbit(700);
    orbitPluto = generateOrbit(750);

    orbitMercury.add(mercury);
    orbitVenus.add(venus);
    orbitEarth.add(earth);
    orbitMars.add(mars);
    orbitJupiter.add(jupiter);
    orbitSaturn.add(saturn);
    orbitUranus.add(uranus);
    orbitNeptune.add(neptune);
    orbitPluto.add(pluto);

    orbits.add(orbitMercury);
    orbits.add(orbitVenus);
    orbits.add(orbitEarth);
    orbits.add(orbitMars);
    orbits.add(orbitJupiter);
    orbits.add(orbitSaturn);
    orbits.add(orbitUranus);
    orbits.add(orbitNeptune);
    orbits.add(orbitPluto);

    generateMoons(earth, 1);
    generateMoons(mars, 2);
    generateMoons(jupiter, 10);
    generateMoons(saturn, 10);
    generateMoons(uranus, 10);
    generateMoons(neptune, 10);
    generateMoons(pluto, 5);

    solarSystem.add(sun);
    solarSystem.add(orbits);
    
    scene.add(solarSystem);
}

function generatePlanet(specs){
    var size_ = specs.size_;
    var material = specs.mat_;

    var figure = new THREE.SphereGeometry(1, 70, 70);
    var planet = new THREE.Mesh(figure, material);

    planet.scale.set(size_, size_, size_);

    return planet;
}


function generateRevolution(orbits, angle){
    // Revolution
    for(var orbit in orbits.children){
        if (orbit == 0){ orbits.children[orbit].rotation.y += angle * 2.7; } // Mercury
        if (orbit == 1){ orbits.children[orbit].rotation.y += angle * 2.4; } // Venus
        // Earth
        if (orbit == 2){ 
            orbits.children[orbit].rotation.y += angle * 2.1; 
            generateMoonRevolution(earth, angle);
        } 
        // Mars
        if (orbit == 3){ 
            orbits.children[orbit].rotation.y += angle * 1.8; 
            generateMoonRevolution(mars, angle);
        } 
        // Jupiter
        if (orbit == 4){ 
            orbits.children[orbit].rotation.y += angle * 1.5; 
            generateMoonRevolution(jupiter, angle);
        } 
        // Saturn
        if (orbit == 5){ 
            orbits.children[orbit].rotation.y += angle * 2.4; 
            // Special case
            for(var i = 1; i < 11; i++){
                saturn.children[i].rotation.y += angle * 10;
            }
        } 
        // Uranus
        if (orbit == 6){ 
            orbits.children[orbit].rotation.y += angle * 1.2; 
            // Special case
            for(var i = 1; i < 11; i++){
                uranus.children[i].rotation.y += angle * 10;
            }
        } 
        // Neptune
        if (orbit == 7){ 
            orbits.children[orbit].rotation.y += angle * 0.9; 
            generateMoonRevolution(neptune, angle);
            } 
        // Pluto
        if (orbit == 8){ 
            orbits.children[orbit].rotation.y += angle * 0.6; 
            generateMoonRevolution(pluto, angle);
        }
    }
}

function generateRotation(orbits, angle){
    // Rotation
    solarSystem.children[1].rotation.y += angle / 2;
    for(var orbit in orbits.children){
        if (orbit == 0){ 
        orbits.children[orbit].children[0].rotation.y += angle * 2.0; 
        } // Mercury

        if (orbit == 1){ orbits.children[orbit].children[0].rotation.y += angle * 1.5; } // Venus
        // Earth
        if (orbit == 2){ 
            orbits.children[orbit].children[0].rotation.y += angle * 3.5; 
            generateMoonRotation(earth, angle);
        } 
        // Mars
        if (orbit == 3){ 
            orbits.children[orbit].children[0].rotation.y += angle * 3.0; 
            generateMoonRotation(mars, angle);
        } 
        // Jupiter
        if (orbit == 4){ 
            orbits.children[orbit].children[0].rotation.y += angle * 6.0; 
            generateMoonRotation(jupiter, angle);
        } 
        // Saturn
        if (orbit == 5){ 
            orbits.children[orbit].children[0].rotation.y += angle * 7.0;
            for(var i = 1; i < 11; i++){
                saturn.children[i].rotation.y += angle * 10;            //Revolution
                saturn.children[i].children[0].rotation.y += angle * 10;// Rotation
            }
        }
        // Uranus
        if (orbit == 6){ 
            orbits.children[orbit].children[0].rotation.y += angle * 4.5; //Rot
            for(var i = 1; i < 11; i++){
                uranus.children[i].children[0].rotation.y += angle * 10;// Rotation
            }
        } 
        // Neptune
        if (orbit == 7){ 
            orbits.children[orbit].children[0].rotation.y += angle * 5.0;
            generateMoonRotation(neptune, angle);
        } 
        // Pluto
        if (orbit == 8){ 
            orbits.children[orbit].children[0].rotation.y += angle * 2.5;
            generateMoonRotation(pluto, angle);
         } 
    }
}

function generateMoonRevolution(planet, angle){
    for(var i in planet.children){
        planet.children[i].rotation.y += angle * 10;            //Revolution
    }
}

function generateMoonRotation(planet, angle){
    for(var i in planet.children){
        planet.children[i].children[0].rotation.y += angle * 10;// Rotation
    }
}
function generateMoons(planet, n_moons){
    for (var i = 0; i < n_moons; i++) {
        
        var radius = planet.geometry.parameters.radius;
        var coords = randomSpherePoint(radius);
        var moon = generatePlanet({ size_:0.1, mat_: moon_materials });
        moon.position.set(coords[0], coords[1], coords[2]);
        var orbitMoon = new THREE.Object3D;
        planet.add(orbitMoon);
        orbitMoon.add(moon);
    }
}

// source = https://stackoverflow.com/questions/5531827/random-point-on-a-given-sphere
// Function that returns a random xyz point
function randomSpherePoint(radius){
   radius = 1 + 0.25;
   var u = Math.random();
   var v = Math.random();
   var theta = 2 * Math.PI * u;
   var phi = Math.acos(2 * v - 1);
   var x = radius * Math.sin(phi) * Math.cos(theta);
   var y = radius * Math.sin(phi) * Math.sin(theta);
   var z = radius * Math.cos(phi);

   return [x, y, z];
}

function generateOrbit(r){
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    var segments = 90;
    
    for (var i = 0; i <= segments; i++) {
        var theta = (i / segments) * Math.PI * 2;
        var coordX = Math.cos(theta) * r;
        var coordY = -0.978 * Math.sin(theta) * r;
        
        geometry.vertices.push(new THREE.Vector3(coordX, 0, coordY));            
    }

    orbit = new THREE.Line(geometry, material);

    return orbit;
}