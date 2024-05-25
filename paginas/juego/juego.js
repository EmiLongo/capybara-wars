import { piezas } from "../tablero/helpers.js";
const piezasIslaAcomodadas = JSON.parse(localStorage.getItem("piezasIslaAcomodadas"));
const tableroIslaArray = JSON.parse(localStorage.getItem("tableroIslaArray"));
const piezasPirataAcomodadas = JSON.parse(localStorage.getItem("piezasPirataAcomodadas"));
const tableroPirataArray = JSON.parse(localStorage.getItem("tableroPirataArray"));
// console.log('piezasIslaAcomodadas:', piezasIslaAcomodadas)
// console.log('tableroIslaArray:', tableroIslaArray)
// console.log('piezasPirataAcomodadas:', piezasPirataAcomodadas)
// console.log('tableroPirataArray:', tableroPirataArray)

const tableroIslaFondo = document.getElementById('tablero-isla-fondo')
const tableroIslaFondoDivs = tableroIslaFondo.getElementsByTagName('div')
const tableroPirataFondo = document.getElementById('tablero-pirata-fondo')
const tableroPirataFondoDivs = tableroPirataFondo.getElementsByTagName('div')
const tableroPirata = document.getElementById('tablero-pirata')
const tableroPirataDivs = tableroPirata.getElementsByTagName('div')
const tableroIsla = document.getElementById('tablero-isla')
const tableroIslaDivs = tableroIsla.getElementsByTagName('div')

// piezasIslaAcomodadas 0:{nombre: 'ficha1', largo: 3, girado: false, posicion: 23}
function generaImagen (tablero, pieza, islaPirata) {
    // const div = document.createElement('div')
    // div.id = `${pieza.nombre}-${islaPirata}`
    const img = document.createElement('img')
    img.src = `../tablero/img/x${pieza.largo}.png`
    img.id = `${pieza.nombre}-${islaPirata}-img`
    img.className = 'colocado'
    if(pieza.girado){img.classList.add('colocado-girado')}
    const heightImg = pieza.largo * 5
    img.style.height = `${heightImg}dvw`
    img.style.width = '5dvw'
    // div.appendChild(img)
    tablero[pieza.posicion].appendChild(img)
    tablero[pieza.posicion].id = `${pieza.nombre}-${islaPirata}`
}
function redibujar (divId){
    const div = document.getElementById(divId)
    tableroDiv[pieza.posicion].appendChild(div)
}

// dibujar tablero isla
piezasIslaAcomodadas.forEach(element => {
    generaImagen(tableroIslaFondoDivs, element, 'isla')
});

// PARA PIRATA será cada vez que le hundan un barco
const imgOKIzq = document.getElementById('img-OK-izq')

// ataque a piratas!
let tirosNuestros = [];
let tirosEnemigos = [];

Array.from(tableroPirataDivs).forEach((div, index) => {
    div.addEventListener('click', () => {
        if (tirosNuestros.includes(index)) {
            return;
        }
        // Agregar el disparo a nuestros tiros
        tirosNuestros.push(index);

        // Colocar la naranja
        const img = document.createElement('img');
        // Exploto la naranja y decide si pega o no pega
        if (tableroPirataArray[index] === 'X') {
            img.src = './img/king orange.png';
            div.style.backgroundColor = '#0080004d'
        } else {
            img.src = './img/sad-orange.png';
            img.style.opacity = '0.5'
            div.style.backgroundColor = '#ff00004d'
        }
        img.style.height = '5dvw';
        img.style.width = '5dvw';
        div.appendChild(img);

        // Ataque de los piratas
        let posicion;
        do {
            posicion = Math.floor(Math.random() * 64);
            console.log('posicion:', posicion)
            console.log('tirosEnemigos:', tirosEnemigos)
            
        } while (tirosEnemigos.includes(posicion));
        
        // Agregar el disparo a los tiros enemigos
        // tirosEnemigos.push(...tirosEnemigos, posicion);
        tirosEnemigos.push(posicion);
        console.log('tirosEnemigos:', tirosEnemigos)

        const img2 = document.createElement('img');
        // Exploto la naranja y decide si pega o no pega
        if (tableroIslaArray[posicion] === 'X') {
            img2.src = './img/king orange.png';
            tableroIslaDivs[posicion].style.backgroundColor = '#0080004d'
        } else {
            img2.src = './img/sad-orange.png';
            tableroIslaDivs[posicion].style.backgroundColor = '#ff00004d'
            img2.style.opacity = '0.5'

        }
        img2.style.height = '5dvw';
        img2.style.width = '5dvw';
        tableroIslaDivs[posicion].appendChild(img2);
    });
});

