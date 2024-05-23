const piezas = [
    { "nombre": "ficha1", "url": "./img/x3.png" ,"largo": 3},
    { "nombre": "ficha2", "url": "./img/x3.png" ,"largo": 3},
    { "nombre": "ficha3", "url": "./img/x3.png" ,"largo": 3},
    { "nombre": "ficha4", "url": "./img/x2.png" ,"largo": 2},
    { "nombre": "ficha5", "url": "./img/x2.png" ,"largo": 2},
    { "nombre": "ficha6", "url": "./img/x2.png" ,"largo": 2},
    { "nombre": "ficha7", "url": "./img/x2.png" ,"largo": 2},
    { "nombre": "ficha8", "url": "./img/x1.png" ,"largo": 1},
    { "nombre": "ficha9", "url": "./img/x1.png" ,"largo": 1},
    { "nombre": "ficha10", "url": "./img/x1.png" ,"largo": 1 },
    { "nombre": "ficha11", "url": "./img/x1.png" ,"largo": 1 },
    { "nombre": "ficha12", "url": "./img/x1.png" ,"largo": 1 }
]
const piezasAcomodadas = []
const tableroDiv = document.getElementsByClassName('tablero-div')
let tableroIslaArray = Array(64).fill('')
let posicionSinFijar = {"nombre":'' , "largo":'' , "girado":'' , "posicion":''}
const ficha = document.getElementsByClassName("ficha")

// detecta el primer disponible para la proxima pieza
function primerDisponible(tableroArray, indicePiezas) { //devuelve la posición disponible, igualar a variable
    //reset a girar
    girar = false
    proximoImg.classList.remove('img-girada')

    //efecto seleccionado en fichas disponibles
    // ficha[indicePiezas].classList.add('activo')

    posicionSinFijar.nombre = piezas[indicePiezas].nombre
    posicionSinFijar.largo = piezas[indicePiezas].largo
    posicionSinFijar.girado = girar
    proximoImg.src = piezas[indicePiezas].url
    
    for (let i = 0; i < tableroArray.length; i++) {
        if (tableroArray[i] == '') {
            if (piezas[indicePiezas].largo == 1) {
                posicionSinFijar.posicion = i
                return i;
            } else if (piezas[indicePiezas].largo == 2 && tableroArray[i+8] == '') {
                posicionSinFijar.posicion = i
                return i;
            } else if (piezas[indicePiezas].largo == 3 && tableroArray[i+8] == '' && tableroArray[i+16] == '') {
                posicionSinFijar.posicion = i
                console.log('posicionSinFijar:',posicionSinFijar)
                return i;
            }
        }
    }
    console.log('posicionSinFijar:',posicionSinFijar)
    return -1; // Si no se encuentra una posición válida, muy raro
}

const colocandoOK = document.getElementById('colocandoOK')
// generar la imagen
function generaImagen (tableroClass, indicePiezas) {
    let tablero = document.getElementsByClassName(tableroClass)
    const div = document.createElement('div')
    div.id = piezas[indicePiezas].nombre
    const img = document.createElement('img')
    img.src = piezas[indicePiezas].url
    img.id = `${piezas[indicePiezas].nombre}-img`
    img.className = 'colocando' //animacion y poca opacidad
    const heightImg = piezas[indicePiezas].largo * 5
    img.style.height = `${heightImg}dvw`
    img.style.width = '5dvw'
    // const imgOk = document.createElement('img')
    // imgOk.src = './img/ok.png'
    // imgOk.id = 'colocandoOK'
    colocandoOK.className = 'activo'
    div.appendChild(img)
    div.appendChild(colocandoOK)
    tablero[posicionSinFijar.posicion].appendChild(div)
}
function redibujar (divId){
    const div = document.getElementById(divId)
    tableroDiv[posicionSinFijar.posicion].appendChild(div)
}

//===================== FUNCIONES MOVER ===================================
function moverIzq (posicionSinFijar, tableroArray) {
    const posicion = posicionSinFijar.posicion
    let resto = posicion % 8
    console.log('resto:', resto)
            
    if(resto != 0){
        if(posicionSinFijar.girado || posicionSinFijar.largo == 1){
            if(tableroArray[posicion-1] == ''){
                posicionSinFijar.posicion-- 
                redibujar (posicionSinFijar.nombre)
            }
        }
        if (!posicionSinFijar.girado && posicionSinFijar.largo == 2 && tableroArray[(posicionSinFijar.posicion - 1)] == '' && tableroArray[(posicionSinFijar.posicion + 7)] == '') {
            posicionSinFijar.posicion--
            redibujar (posicionSinFijar.nombre)
        }
        if (!posicionSinFijar.girado && posicionSinFijar.largo == 3 && tableroArray[(posicionSinFijar.posicion - 1)] == '' && tableroArray[(posicionSinFijar.posicion + 7)] == '' && tableroArray[(posicionSinFijar.posicion + 15)] == '') {
            posicionSinFijar.posicion--
            redibujar (posicionSinFijar.nombre)
        }
        
    }
}
function moverDer (posicionSinFijar, tableroArray) {
    const posicion = posicionSinFijar.posicion
    let resto = posicion % 8
    if(!posicionSinFijar.girado || posicionSinFijar.largo == 1){ tope = 7}
    if(posicionSinFijar.girado && posicionSinFijar.largo == 2){ tope = 6}
    if(posicionSinFijar.girado && posicionSinFijar.largo == 3){ tope = 5}
    
    if(resto < tope){
        if(posicionSinFijar.girado || posicionSinFijar.largo == 1){
            if(tableroArray[posicion+1] == ''){
                posicionSinFijar.posicion++ 
                redibujar (posicionSinFijar.nombre)
            }
        }
        if (!posicionSinFijar.girado && posicionSinFijar.largo == 2 && tableroArray[(posicionSinFijar.posicion + 1)] == '' && tableroArray[(posicionSinFijar.posicion + 9)] == '') {
            posicionSinFijar.posicion++
            redibujar (posicionSinFijar.nombre)
        } 
        if (!posicionSinFijar.girado && posicionSinFijar.largo == 3 && tableroArray[(posicionSinFijar.posicion + 1)] == '' && tableroArray[(posicionSinFijar.posicion + 9)] == '' && tableroArray[(posicionSinFijar.posicion + 17)] == '') {
            posicionSinFijar.posicion++
            redibujar (posicionSinFijar.nombre)
        } 
    }
}
function moverArr (posicionSinFijar, tableroArray) {
    const posicion = posicionSinFijar.posicion
        
    if(posicion > 7){
        if(!posicionSinFijar.girado || posicionSinFijar.largo == 1){
            if(tableroArray[posicion-8] == ''){
                posicionSinFijar.posicion -= 8
                redibujar (posicionSinFijar.nombre)
            }
        }
        if (posicionSinFijar.girado && posicionSinFijar.largo == 2 && tableroArray[(posicionSinFijar.posicion - 8)] == '' && tableroArray[(posicionSinFijar.posicion - 7)] == '') {
            posicionSinFijar.posicion -= 8
            redibujar (posicionSinFijar.nombre)
        } 
        if (posicionSinFijar.girado && posicionSinFijar.largo == 3 && tableroArray[(posicionSinFijar.posicion - 8)] == '' && tableroArray[(posicionSinFijar.posicion - 7)] == '' && tableroArray[(posicionSinFijar.posicion - 6)] == '') {
            posicionSinFijar.posicion -= 8
            redibujar (posicionSinFijar.nombre)
        }
    }
}
function moverAba (posicionSinFijar, tableroArray) {
    const posicion = posicionSinFijar.posicion
    console.log('posicion: ',posicion)
    let tope = 0
    if(posicionSinFijar.largo == 3) { tope = 40}
    if(posicionSinFijar.largo == 2) { tope = 48}
    if(posicionSinFijar.largo == 1 || posicionSinFijar.girado) { tope = 57}
    if(posicion < tope){
        if(!posicionSinFijar.girado || posicionSinFijar.largo == 1){
            if(tableroArray[posicion+8] == ''){
                posicionSinFijar.posicion = posicionSinFijar.posicion + 8 
                redibujar (posicionSinFijar.nombre)
                console.log('1er if ',posicion)  
            }
        }
        if (posicionSinFijar.girado && posicionSinFijar.largo == 2 && tableroArray[(posicionSinFijar.posicion + 8)] == ''&& tableroArray[(posicionSinFijar.posicion + 9)] == '') {
            posicionSinFijar.posicion = posicionSinFijar.posicion + 8 
            redibujar (posicionSinFijar.nombre)
            console.log('2do if: ',posicion)  
        } 
        if (posicionSinFijar.girado && posicionSinFijar.largo == 3 && tableroArray[(posicionSinFijar.posicion + 8)] == '' && tableroArray[(posicionSinFijar.posicion + 9)] == '' && tableroArray[(posicionSinFijar.posicion + 10)] == '') {
            posicionSinFijar.posicion = posicionSinFijar.posicion + 8 
            redibujar (posicionSinFijar.nombre)
            console.log('3er if: ',posicion)  
        }
        
    }
}


const setGirar = document.getElementById('girar')
let girar = false
const proximoImg = document.getElementById('proximo-img')

    
setGirar.addEventListener('click', girarPieza)
function girarPieza () {
    let isGirable = false
    if(posicionSinFijar.largo > 1){
        if(posicionSinFijar.largo == 2){
            if(posicionSinFijar.posicion < 56 && girar && tableroIslaArray[(posicionSinFijar.posicion + 8)] === ''){
                isGirable = true
            }
            if(!girar && tableroIslaArray[(posicionSinFijar.posicion + 1)] === '' && (posicionSinFijar.posicion % 8) != 7){
                isGirable = true
            }
        }
        if(posicionSinFijar.largo == 3){
            if(posicionSinFijar.posicion < 48 && girar && tableroIslaArray[(posicionSinFijar.posicion + 8)] === '' && tableroIslaArray[(posicionSinFijar.posicion + 16)] === ''){
                isGirable = true
            }
            if(!girar && tableroIslaArray[(posicionSinFijar.posicion + 1)] === '' && tableroIslaArray[(posicionSinFijar.posicion + 2)] === '' && (posicionSinFijar.posicion % 8) < 6){
                isGirable = true
            }
        }
        if(isGirable){
            proximoImg.classList.toggle('img-girada')
            girar = !girar
            posicionSinFijar.girado = girar
            const imgGirar = document.getElementById(`${posicionSinFijar.nombre}-img`)
            console.log(imgGirar)
            imgGirar.classList.toggle('colocando-girado')
        }
    }
}


// atajos con teclado y mouse
const moverDerBtn = document.getElementById('mover-der')
moverDerBtn.addEventListener('click', ()=> moverDer(posicionSinFijar, tableroIslaArray))
const moverIzqBtn = document.getElementById('mover-izq')
moverIzqBtn.addEventListener('click', ()=> moverIzq(posicionSinFijar, tableroIslaArray))
const moverArrBtn = document.getElementById('mover-arriba')
moverArrBtn.addEventListener('click', ()=> moverArr(posicionSinFijar, tableroIslaArray))
const moverAbaBtn = document.getElementById('mover-abajo')
moverAbaBtn.addEventListener('click', ()=> moverAba(posicionSinFijar, tableroIslaArray))
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            moverDer(posicionSinFijar, tableroIslaArray);
            break;
        case 'ArrowLeft':
            moverIzq(posicionSinFijar, tableroIslaArray);
            break;
        case 'ArrowUp':
            moverArr(posicionSinFijar, tableroIslaArray);
            break;
        case 'ArrowDown':
            moverAba(posicionSinFijar, tableroIslaArray);
            break;
        case 'Enter':
            fijar();
            break;
        case ' ':
            girarPieza();
            break;
    }
});
//click izquierdo
const tableroDivArray = Array.from(tableroDiv);

tableroDivArray.forEach((element, indice) => {
    element.addEventListener('click', () => {
        if(posicionSinFijar.largo == 1 && tableroIslaArray[indice] == ''){
            posicionSinFijar.posicion = indice 
            redibujar (posicionSinFijar.nombre)
        }
        if(posicionSinFijar.largo == 2){
            if(indice %8 < 7 && posicionSinFijar.girado && tableroIslaArray[indice] == '' && tableroIslaArray[indice + 1] == ''){
                posicionSinFijar.posicion = indice 
                redibujar (posicionSinFijar.nombre)
            } else if(indice < 56 && !posicionSinFijar.girado && tableroIslaArray[indice] == '' && tableroIslaArray[indice + 8] == ''){
                posicionSinFijar.posicion = indice 
                redibujar (posicionSinFijar.nombre)
            }
        }
        if(posicionSinFijar.largo == 3){
            if(indice %8 < 6 && posicionSinFijar.girado && tableroIslaArray[indice] == '' && tableroIslaArray[indice + 1] == '' && tableroIslaArray[indice + 2] == ''){
                posicionSinFijar.posicion = indice 
                redibujar (posicionSinFijar.nombre)
            } else if(indice < 48 && !posicionSinFijar.girado && tableroIslaArray[indice] == '' && tableroIslaArray[indice + 8] == '' && tableroIslaArray[indice + 16] == ''){
                posicionSinFijar.posicion = indice 
                redibujar (posicionSinFijar.nombre)
            }
        }
    })
})

// click derecho
document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); 
    girarPieza();
});


colocandoOK.addEventListener('click', fijar)
// fijarla y guardar su ubicacion
function fijar() {
    // actualizar
    tableroIslaArray[posicionSinFijar.posicion] = 'X'
    if(posicionSinFijar.largo == 2){
        if(posicionSinFijar.girado){
            tableroIslaArray[posicionSinFijar.posicion + 1] = 'X'
        } else {
            tableroIslaArray[posicionSinFijar.posicion + 8] = 'X'
 
        }
    }
    if(posicionSinFijar.largo == 3){
        if(posicionSinFijar.girado){
            tableroIslaArray[posicionSinFijar.posicion + 1] = 'X'
            tableroIslaArray[posicionSinFijar.posicion + 2] = 'X'
        } else {
            tableroIslaArray[posicionSinFijar.posicion + 8] = 'X'
            tableroIslaArray[posicionSinFijar.posicion + 16] = 'X'
         }
    }
    piezasAcomodadas.push({ ...posicionSinFijar });
    console.log('piezasAcomodadas:' , piezasAcomodadas)
    console.log('tableroIslaArray: ',tableroIslaArray)
    //reset
    colocandoOK.classList.remove('activo')
    const fichasFijas = document.getElementById('fichas-fijas')
    fichasFijas.appendChild(colocandoOK)
    const imgFijar = document.getElementById(`${posicionSinFijar.nombre}-img`)
    let numero = posicionSinFijar.length
    // ficha[posicionSinFijar.length].classList.remove('activo')
    if(posicionSinFijar.girado){
        imgFijar.className = 'colocado-girado'
    } else {
        imgFijar.className = 'colocado'
    }

    if(piezasAcomodadas.length != piezas.length){
        comienzaCiclo()
    } else {
        // guardar el tablero en localstorage, en futuro en la bbdd
        localStorage.setItem("tableroIslaArray", JSON.stringify(tableroIslaArray));
        localStorage.setItem("piezasAcomodadas", JSON.stringify(piezasAcomodadas));
        // ejecutar el juego
    }
}

function comienzaCiclo(){

    primerDisponible(tableroIslaArray, piezasAcomodadas.length)
    generaImagen('tablero-div', piezasAcomodadas.length)
} 







//  borrar colocandoOK
// cambiar class colocando por colocado
// cambiar el src #proximo-img
// pasar a la siguiente

 //=================  Ejecucion ================================================== 
 comienzaCiclo()