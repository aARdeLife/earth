
document.addEventListener('DOMContentLoaded', () => {
    const skybox = document.getElementById('earth-skybox');
    skybox.setAttribute('src', 'https://github.com/aARdeLife/earth/blob/4ce21e07738e4aa5cec8ca4dcb5f2d5b2620d336/Earth4096.jpg?raw=true');
    skybox.setAttribute('rotation', '0 180 0');

    // Create red pulsating dot
    const redDot = document.createElement('a-sphere');
    redDot.setAttribute('color', 'red');
    redDot.setAttribute('radius', '0.005');
    redDot.setAttribute('position', '0 0 -1'); // Placeholder position
    document.querySelector('a-scene').appendChild(redDot);

    // Pulsating animation
    const animation = document.createElement('a-animation');
    animation.setAttribute('attribute', 'scale');
    animation.setAttribute('to', '0.01 0.01 0.01');
    animation.setAttribute('direction', 'alternate');
    animation.setAttribute('dur', '1000');
    animation.setAttribute('repeat', 'indefinite');
    redDot.appendChild(animation);
    
    // Get user's geolocation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Map latitude and longitude to x, y, z coordinates
            const radius = 1; // Normalized radius of the Earth sphere
            const phi = (90 - latitude) * (Math.PI / 180);
            const theta = (longitude + 180) * (Math.PI / 180);
            
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);
            
            redDot.setAttribute('position', `${x} ${y} ${z}`);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});

const rotationSpeed = 360 / (24 * 60 * 60); // Degrees per second

function updateRotation() {
    const skybox = document.getElementById('earth-skybox');
    const currentRotation = skybox.object3D.rotation; // Get the rotation object
    const yRotation = THREE.Math.radToDeg(currentRotation.y);
    skybox.setAttribute('rotation', `0 ${yRotation + rotationSpeed} 0`);
}
