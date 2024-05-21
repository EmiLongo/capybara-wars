// document.getElementById('fullscreen-btn').addEventListener('click', () => {
//     if (!document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//     } else if (!document.documentElement.mozRequestFullScreen) { // Firefox
//         document.documentElement.mozRequestFullScreen();
//     } else if (!document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
//         document.documentElement.webkitRequestFullscreen();
//     } else if (!document.documentElement.msRequestFullscreen) { // IE/Edge
//         document.documentElement.msRequestFullscreen();
//     }
// });

// document.addEventListener("DOMContentLoaded", () => {
//     if (!document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//     } else if (document.documentElement.mozRequestFullScreen) { // Firefox
//         document.documentElement.mozRequestFullScreen();
//     } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
//         document.documentElement.webkitRequestFullscreen();
//     } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
//         document.documentElement.msRequestFullscreen();
//     }
// });


const capa1 = document.getElementById('capa1')
const capa2 = document.getElementById('capa2')
const capa3 = document.getElementById('capa3')

// colocar el efecto agua a destiempo
capa1.style.animation= "seaAnimation 6s infinite ease-in-out"
setTimeout(()=>{capa2.style.animation= "seaAnimation 6s infinite ease-in-out"},200)
setTimeout(()=>{capa3.style.animation= "seaAnimation 6s infinite ease-in-out"},400)
// animation: seaAnimation 6s infinite ease-in-out;

// baja el volumen del audio al 20%
// document.addEventListener('DOMContentLoaded', function() {
//     const audio = document.getElementById('audio');
//     audio.volume = 0.2;
// });