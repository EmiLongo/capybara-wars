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
    const heightImg = pieza.largo * 4
    img.style.height = `${heightImg}dvw`
    img.style.width = '4dvw'
    // div.appendChild(img)
    tablero[pieza.posicion].appendChild(img)
    tablero[pieza.posicion].id = `${pieza.nombre}-${islaPirata}`
    console.log('pieza:',pieza)
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

        // Exploto la naranja y decide si pega o no pega
        if (tableroPirataArray[index] === 'X') {
            //buscar y borrar espacio
            let indiceEncontrado = piezasPirataAcomodadas.findIndex(pieza => pieza.espacios.includes(index));

            if (indiceEncontrado !== -1) {
                // Encontrar el índice del número en el array espacios
                let posicionEnEspacios = piezasPirataAcomodadas[indiceEncontrado].espacios.indexOf(index);
                if (posicionEnEspacios !== -1) {
                    // Eliminar el número del array espacios
                    piezasPirataAcomodadas[indiceEncontrado].espacios.splice(posicionEnEspacios, 1);
                    piezasPirataAcomodadas[indiceEncontrado].golpeados.push(index);
                    console.log(`Se ha eliminado el número ${index} del array espacios en el objeto en el índice ${indiceEncontrado}.`);
                }
            } else {
                console.log(`El índice ${index} no se encuentra en ninguna pieza de piezasPirataAcomodadas.`);
            }
            
            // Imprimir el array para verificar el resultado
            console.log(piezasPirataAcomodadas);
            
            //verificar si hundio el barco
            // borrar las otras imagenes y colocar la de hundido
            if(piezasPirataAcomodadas[indiceEncontrado].espacios.length == 0){
                if(piezasPirataAcomodadas[indiceEncontrado].golpeados.length != 0){
                    piezasPirataAcomodadas[indiceEncontrado].golpeados.forEach(element => {
                        tableroPirataDivs[element].innerHTML = '';
                    })
                }
                generaImagen (tableroPirataDivs, piezasPirataAcomodadas[indiceEncontrado], 'pirata')

            } else {
                const img = document.createElement('img');
                img.src = './img/king orange.png';
                img.style.height = '4dvw';
                img.style.width = '4dvw';
                div.appendChild(img);
            }
            div.style.backgroundColor = '#0080004d'
        } else {
            const img = document.createElement('img');
            img.src = './img/sad-orange.png';
            img.style.opacity = '0.5'
            div.style.backgroundColor = '#ff00004d'
            img.style.height = '4dvw';
            img.style.width = '4dvw';
            div.appendChild(img);
        }

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
        console.log('tirosNuestros:', tirosNuestros)
        console.log('tirosEnemigos:', tirosEnemigos)

        const img2 = document.createElement('img');
        // Exploto la naranja y decide si pega o no pega
        if (tableroIslaArray[posicion] === 'X') {
            //buscar y borrar espacio
            
            //verificar si hundio el barco
            // si es que no
            img2.src = './img/king orange.png';
            tableroIslaDivs[posicion].style.backgroundColor = '#0080004d'
            
            // si es que si
            // borrar las otras imagenes y colocar la de hundido

            
        } else {
            img2.src = './img/sad-orange.png';
            tableroIslaDivs[posicion].style.backgroundColor = '#ff00004d'
            img2.style.opacity = '0.5'

        }
        img2.style.height = '4dvw';
        img2.style.width = '4dvw';
        tableroIslaDivs[posicion].appendChild(img2);
    });
});


const pausaBtn = document.getElementById('pausa-btn')
pausaBtn.addEventListener('click', ()=>{
    
})