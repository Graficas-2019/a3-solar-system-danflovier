/*
Name: Daniela Flores Javier.
ID: A01023226.
*/

//General variables
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

/******* Textures *******/
// Sun material
var sunMapUrl = "images/1 - sun.jpg";
map = new THREE.TextureLoader().load(sunMapUrl);
var sun_materials = new THREE.MeshPhongMaterial({ map: map });
// Mercury material
var mercuryMapUrl = "images/2 - mercury.jpg";
var mercuryBumpMapUrl = "images/2.1 - mercurybump.jpg";
map = new THREE.TextureLoader().load(mercuryMapUrl);
bumpMap = new THREE.TextureLoader().load(mercuryBumpMapUrl);
var mercury_materials = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
// Venus material
var venusMapUrl = "images/3 - venus.jpg";
var venusBumpMapUrl = "images/3.1 - venusbump.jpg";
map = new THREE.TextureLoader().load(venusMapUrl);
bumpMap = new THREE.TextureLoader().load(venusBumpMapUrl);
var venus_materials = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.0 });
// Earth material
var earthMapUrl = "images/4 - earth.jpg";
var earthNormalMapUrl = "images/4.1 - earthnormal.jpg";
var earthspecularMapUrl = "images/4.2 - earthspecular.jpg";
map = new THREE.TextureLoader().load(earthMapUrl);
normalMap = new THREE.TextureLoader().load(earthNormalMapUrl);
specularMap = new THREE.TextureLoader().load(earthspecularMapUrl);
var earth_materials = new THREE.MeshPhongMaterial({ map: map, normalMap: normalMap, specularMap: specularMap });
// Mars material
var marsMapUrl = "images/5 - mars.jpg";
var marsBumpMapUrl = "images/5.1 - marsbump.jpg";
map = new THREE.TextureLoader().load(marsMapUrl);
bumpMap = new THREE.TextureLoader().load(marsBumpMapUrl);
var mars_materials = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
// Jupiter material
var jupiterMapUrl = "images/6 - jupiter.jpg";
map = new THREE.TextureLoader().load(jupiterMapUrl);
var jupiter_materials = new THREE.MeshPhongMaterial({ map: map });
// Saturn material
var saturnMapUrl = "images/7 - saturn.jpg";
map = new THREE.TextureLoader().load(saturnMapUrl);
var saturn_materials = new THREE.MeshPhongMaterial({ map: map });
// Uranus material
var uranusMapUrl = "images/8 - uranus.jpg";
map = new THREE.TextureLoader().load(uranusMapUrl);
var uranus_materials = new THREE.MeshPhongMaterial({ map: map });
// Neptune material
var neptuneMapUrl = "images/9 - neptune.jpg";
map = new THREE.TextureLoader().load(neptuneMapUrl);
var neptune_materials = new THREE.MeshPhongMaterial({ map: map });
// Pluto material
var plutoMapUrl = "images/10 - pluto.jpg";
var plutoBumpMapUrl = "images/10.1 - plutobump.jpg";
map = new THREE.TextureLoader().load(plutoMapUrl);
bumpMap = new THREE.TextureLoader().load(plutoBumpMapUrl);
var pluto_materials = new THREE.MeshPhongMaterial({map: map, bumpMap: bumpMap, bumpScale: 1.5 });
// Moon material
var moonMapUrl = "images/11 - moon.jpg";
var moonBumpMapUrl = "images/11.1 - moonbump.jpg";
map = new THREE.TextureLoader().load(moonMapUrl);
bumpMap = new THREE.TextureLoader().load(moonBumpMapUrl);
var moon_materials = new THREE.MeshPhongMaterial({map: map, bumpMap: bumpMap, bumpScale: 0.5 });
// Asteroid material
var asteroidMapUrl = "images/12 - asteroid.jpg";
map = new THREE.TextureLoader().load(asteroidMapUrl);
var asteroid_materials = new THREE.MeshPhongMaterial({ map: map });

/******* Planets ********/
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
var asteroids = new THREE.Object3D;

var timeMercury = 0;
var timeVenus = 0;
var timeEarth = 0;
var timeMars = 0;
var timeJupiter = 0;
var timeSaturn = 0;
var timeUranus = 0;
var timeNeptune = 0;
var timePluto = 0;
var time = 0;
var asteroidSpeed = new Array(150).fill(0);

console.log(asteroidSpeed)
/******** Orbits ********/
var orbitMercury = new THREE.Object3D;
var orbitVenus = new THREE.Object3D;
var orbitEarth = new THREE.Object3D;
var orbitMars = new THREE.Object3D;
var orbitJupiter = new THREE.Object3D;
var orbitSaturn = new THREE.Object3D;
var orbitUranus = new THREE.Object3D;
var orbitNeptune = new THREE.Object3D;
var orbitPluto = new THREE.Object3D;
var orbitAsteroid = new THREE.Object3D;

var distMercury = 200;
var distVenus = 250;
var distEarth = 300;
var distMars = 350;
var distJupiter = 430;
var distSaturn = 560;
var distUranus = 670;
var distNeptune = 750;
var distPluto = 800;

/******* Time *******/
var duration = 20000; // ms
var currentTime = Date.now();



for(var i = 0; i < asteroidSpeed.length; i++){
    asteroidSpeed[i] = (Math.random() * 0.0000001);
}
// Function that generates the animation
function animate() {
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    //Rotates the elements of the Solar System

    generateRotation(orbits, angle);
    //Generates the revolution of the elements from the Solar System
    generateRevolution(orbits, angle);
}

// Function that renders the scene
function run() {
    requestAnimationFrame(function() { run(); });
        // Render the scene
        renderer.render( scene, camera );
        // Spin the cube for next frame
        animate();
        // controls.update() must be called after any manual changes to the camera's transform
        orbitControls.update();
}

// Function that creates the scene
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
    // Set the controls
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    // Set the camera position
    camera.position.set(-500.52, 0, 0);
    // Add scene to the camera
    scene.add(camera);
    // Create Solar System
    createSolarSystem();
}

// Function that creates the Solar System
function createSolarSystem(){
    orbits = new THREE.Object3D;
    solarSystem = new THREE.Object3D;
    // Generates the light of the Solar System
    universeLight = new THREE.AmbientLight(0xffffff);
    universeLight.position.set(0,0,0);
    // Adds a point light to the sun
    sun.add(new THREE.PointLight(0xffffff, 1.2));
    // Sets the position of each planet
    sun.position.set(0, 0, 0);
    mercury.position.set(0, 0, distMercury);
    venus.position.set(0, 0, distVenus);
    earth.position.set(0, 0, distEarth);
    mars.position.set(0, 0, distMars);
    jupiter.position.set(0, 0, distJupiter);
    saturn.position.set(0, 0, distSaturn);
    uranus.position.set(0, 0, distUranus);
    neptune.position.set(0, 0, distNeptune);
    pluto.position.set(0, 0, distPluto);
    // Generates the rings of Saturn
    var saturnRadius = saturn.geometry.parameters.radius;
    var saturnRingsTexture = new THREE.TextureLoader().load("images/7.1 - saturn ring.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    var saturnGeometryRings = new THREE.RingGeometry(1.2 * saturnRadius, 2 * saturnRadius, 2 * 100, 5, 0, Math.PI * 2);
    var saturnRings = new THREE.Mesh(saturnGeometryRings, saturnMaterials);
    saturnRings.rotation.set(20, 0, 0);    // Pos.X
    saturnRings.rotation.y = Math.PI / 5;
    saturn.add(saturnRings);
    // Generates the rings of Uranus
    var uranusRadius = uranus.geometry.parameters.radius;
    var uranusRingsTexture = new THREE.TextureLoader().load("images/8.1 - uranus ring.png");
    var uranusMaterials = new THREE.MeshPhongMaterial({ map: uranusRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    var uranusGeometryRings = new THREE.RingGeometry(1 * uranusRadius, 2 * uranusRadius, 2 * 100, 5, 0, Math.PI * 2);
    var uranusRings = new THREE.Mesh(uranusGeometryRings, uranusMaterials);
    uranusRings.rotation.set(20, 0, 0);    // Pos.X
    uranusRings.rotation.y = Math.PI / 3;
    uranus.add(uranusRings);
    // Creates the orbit with a specific radius
    orbitMercury = generateOrbit(distMercury);
    orbitVenus = generateOrbit(distVenus);
    orbitEarth = generateOrbit(distEarth);
    orbitMars = generateOrbit(distMars);
    orbitJupiter = generateOrbit(distJupiter);
    orbitSaturn = generateOrbit(distSaturn);
    orbitUranus = generateOrbit(distUranus);
    orbitNeptune = generateOrbit(distNeptune);
    orbitPluto = generateOrbit(distPluto);
    // Add planets to each orbit
    orbitMercury.add(mercury);
    orbitVenus.add(venus);
    orbitEarth.add(earth);
    orbitMars.add(mars);
    orbitJupiter.add(jupiter);
    orbitSaturn.add(saturn);
    orbitUranus.add(uranus);
    orbitNeptune.add(neptune);
    orbitPluto.add(pluto);
    // Create a group of orbits
    orbits.add(orbitMercury);
    orbits.add(orbitVenus);
    orbits.add(orbitEarth);
    orbits.add(orbitMars);
    orbits.add(orbitJupiter);
    orbits.add(orbitSaturn);
    orbits.add(orbitUranus);
    orbits.add(orbitNeptune);
    orbits.add(orbitPluto);
    orbits.add(orbitAsteroid);
    // Generates moons of certain planets
    generateMoons(earth, 1, 0.1);
    generateMoons(mars, 2, 0.15);
    generateMoons(jupiter, 79, 0.025);
    generateMoons(saturn, 62, 0.030);
    generateMoons(uranus, 27, 0.025);
    generateMoons(neptune, 14, 0.05);
    generateMoons(pluto, 5, 0.1);
    // Generates the asteroids of the Solar System
    generateAsteroids(orbitAsteroid, 150);
    // Add the light to the Solar System
    solarSystem.add(universeLight);
    // Add sun
    solarSystem.add(sun);
    // Add orbits
    solarSystem.add(orbits);
    // Add Solar System to scene
    scene.add(solarSystem);
    //generateAsteroidRotation(angle);
}

// Function that generates a planet
function generatePlanet(specs){
    var size_ = specs.size_;
    var material = specs.mat_;

    var figure = new THREE.SphereGeometry(1, 15, 15);
    var planet = new THREE.Mesh(figure, material);

    planet.scale.set(size_, size_, size_);

    return planet;
}

// Function that creates asteroids
function generateAsteroids(orbit, numAsteroids){
    var size_min = 1; 
    var size_max = 6;
    var verts_min = 3;
    var verts_max = 5;

    for(var i = 0; i < numAsteroids; i++){
        var size = Math.random() * (+ size_max - + size_min) + +size_min; 
        var verts = Math.random() * (+ verts_max - + verts_min) + +verts_min; 

        var geometry = new THREE.SphereGeometry(size, verts, verts);
        var asteroid = new THREE.Mesh(geometry, asteroid_materials);

        var radius = 390;
        var coords = randomRingPoint(radius);
        asteroid.position.set(coords[0], coords[1], coords[2]);

        asteroids.add(asteroid);
    }

    orbit.add(asteroids);
}

// Function that generates the moons
function generateMoons(planet, numberMoons, scale){
    for (var i = 0; i < numberMoons; i++) {
        // Get the radius of the planet
        var radius = 1.25;
        // generate a random coordinates
        var coords = randomSpherePoint(radius);
        // Create the moon
        var moon = generatePlanet({ size_:scale, mat_: moon_materials });
        moon.position.set(coords[0], coords[1], coords[2]);

        // Generate a orbit
        var orbitMoon = new THREE.Object3D;
        // Add the moon to its planet
        planet.add(orbitMoon);
        orbitMoon.add(moon);
    }
}

// Function that generates the orbits
function generateOrbit(radius){
    var a = radius + 100;
    var b = radius;
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    var segments = 50;
    
    for (var i = 0; i <= segments; i++) {
        var theta = (i / segments) * Math.PI * 2;

        var coordX = a * Math.cos(theta);
        var coordY = b * Math.sin(theta);
        
        geometry.vertices.push(new THREE.Vector3(coordX, 0, coordY));            
    }

    var orbit = new THREE.Line(geometry, material);

    return orbit;
}

// Funtion that generates the revolution of the elements
function generateRevolution(orbits, angle){
    // Revolution
    timeMercury += 0.008;
    timeVenus += 0.007;
    timeEarth += 0.006;
    timeMars += 0.005;
    timeJupiter += 0.004;
    timeSaturn += 0.009;
    timeUranus += 0.003;
    timeNeptune += 0.002;
    timePluto += 0.001;
    //time += 0.008;

    mercury.position.x = (distMercury + 100) * Math.cos(timeMercury);
    mercury.position.z = distMercury * Math.sin(timeMercury);

    venus.position.x = (distVenus + 100) * Math.cos(timeVenus);
    venus.position.z = distVenus * Math.sin(timeVenus);

    earth.position.x = (distEarth + 100) * Math.cos(timeEarth);
    earth.position.z = distEarth * Math.sin(timeEarth);

    mars.position.x = (distMars + 100) * Math.cos(timeMars);
    mars.position.z = distMars * Math.sin(timeMars);

    jupiter.position.x = (distJupiter + 100) * Math.cos(timeJupiter);
    jupiter.position.z = distJupiter * Math.sin(timeJupiter);

    saturn.position.x = (distSaturn + 100) * Math.cos(timeSaturn);
    saturn.position.z = distSaturn * Math.sin(timeSaturn);

    uranus.position.x = (distUranus + 100) * Math.cos(timeUranus);
    uranus.position.z = distUranus * Math.sin(timeUranus);

    neptune.position.x = (distNeptune + 100) * Math.cos(timeNeptune);
    neptune.position.z = distNeptune * Math.sin(timeNeptune);

    pluto.position.x = (distPluto + 100) * Math.cos(timePluto);
    pluto.position.z = distPluto * Math.sin(timePluto);

    // Creates the moon revolution
    generateMoonRevolution(earth, angle);
    generateMoonRevolution(mars, angle);
    generateMoonRevolution(jupiter, angle);
    generateMoonRevolution(neptune, angle);
    generateMoonRevolution(pluto, angle);

    // Special case: generating the revolution of the moons for Uranus
    for(var i = 1; i < 28; i++){
        uranus.children[i].rotation.y += angle * 10;
    }
    // Special case: generating the revolution of the moons for Saturn
    for(var i = 1; i < 63; i++){
        saturn.children[i].rotation.y += angle * 10;
    }

    // Create the asteroid's revolution
    generateAsteroidRevolution(angle);
}

// Funtion that generates the rotation of the elements
function generateRotation(orbits, angle){
    // Rotation
    solarSystem.children[1].rotation.y += angle / 2;
    for(var orbit in orbits.children){
        // Mercury
        if (orbit == 0){ orbits.children[orbit].children[0].rotation.y += angle * 2.0; } 
        // Venus
        if (orbit == 1){ orbits.children[orbit].children[0].rotation.y += angle * 1.5; } 
        // Earth
        if (orbit == 2){ orbits.children[orbit].children[0].rotation.y += angle * 3.5; } 
        // Mars
        if (orbit == 3){ orbits.children[orbit].children[0].rotation.y += angle * 3.0; } 
        // Jupiter
        if (orbit == 4){ orbits.children[orbit].children[0].rotation.y += angle * 5.5; } 
        // Saturn
        if (orbit == 5){ 
            orbits.children[orbit].children[0].rotation.y += angle * 5.6;
            // Special case: generating the rotation of the moons
            for(var i = 1; i < 63; i++){
                saturn.children[i].rotation.y += angle * 10;
                saturn.children[i].children[0].rotation.y += angle * 10;
            }
        }
        // Uranus
        if (orbit == 6){ 
            orbits.children[orbit].children[0].rotation.y += angle * 4.0;
            // Special case: generating the rotation of the moons
            for(var i = 1; i < 28; i++){
                uranus.children[i].children[0].rotation.y += angle * 10;
            }
        } 
        // Neptune
        if (orbit == 7){ orbits.children[orbit].children[0].rotation.y += angle * 5.0; } 
        // Pluto
        if (orbit == 8){ orbits.children[orbit].children[0].rotation.y += angle * 2.5; } 
    }
    // Creates the rotation of the moons
    generateMoonRotation(earth, angle);
    generateMoonRotation(mars, angle);
    generateMoonRotation(jupiter, angle);
    generateMoonRotation(neptune, angle);
    generateMoonRotation(pluto, angle);
    // Creates the rotation of the asteroids
    generateAsteroidRotation(angle);
}


// Function that generates the asteroid revolution
function generateAsteroidRevolution(angle){
    // Revolution
    time += 0.008;
    
    for(var or in orbitAsteroid.children){
        /*
        orbitAsteroid.children[or].rotation.y += angle * 0.5;

        */
        //orbitAsteroid.children[or].rotation.z +=  angle / 10; 
    }
    
}
// Function that generates the rotation of the asteroid
function generateAsteroidRotation(angle){
    
    // Rotation
    console.log(asteroidSpeed)
    for(var or in asteroids.children){
        //time += Math.random()
        time += or * 0.01;
        asteroidSpeed[or] += asteroidSpeed[or];
        asteroids.children[or].position.x =  490 * Math.cos(time); 
        asteroids.children[or].position.z =  390 * Math.sin(time); 
        
        asteroids.children[or].rotation.y += angle * 2;
    }
}
// Function that generates the revolution of the moons
function generateMoonRevolution(planet, angle){
    //Revolution
    for(var i in planet.children){
        planet.children[i].rotation.y += angle * 10;            
    }
}
// Function that generates the rotation of the moons
function generateMoonRotation(planet, angle){
    // Rotation
    for(var i in planet.children){
        planet.children[i].children[0].rotation.y += angle * 10;
    }
}
// Function that creates a random point coordinate on a ring
function randomRingPoint(radius){
    var a = radius + 100;
    var b = radius;

    var theta = (Math.random() * Math.PI * 2);
    var phi = (Math.acos(2 * Math.random() - 1)) / 20;

    var x = a * Math.cos(theta) * Math.cos(phi);
    var y = radius * Math.sin(phi);
    var z = b * Math.sin(theta) * Math.cos(phi);
    
    return [x, y, z];
}
// Function that returns a random xyz point on a sphere
// Source = https://stackoverflow.com/questions/5531827/random-point-on-a-given-sphere
function randomSpherePoint(radius){
   var theta = 2 * Math.PI * Math.random();
   var phi = Math.acos(2 * Math.random() - 1);
   var x = radius * Math.sin(phi) * Math.cos(theta);
   var y = radius * Math.sin(phi) * Math.sin(theta);
   var z = radius * Math.cos(phi);

   return [x, y, z];
}