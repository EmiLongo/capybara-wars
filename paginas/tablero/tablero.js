const piezas = [
    { "nombre": "ficha1", "url": "./img/x3.png" ,"nombre": 3},
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

const setGirar = document.getElementById('girar')
let girar = false
const proximoImg = document.getElementById('proximo-img')

  
setGirar.addEventListener('click', ()=>{
    proximoImg.classList.toggle('img-girada')
    girar = !girar
    posicionSinFijar.girado = girar
})


// para colocar una pieza en el tablero necesito recorrel el array proximoImgUrl
// en cada recorrido se hará
// hover sobre el tablero
const tableroDiv = document.getElementsByClassName('tablero-div')
console.log(tableroDiv)
let tableroIslaArray = Array(64).fill('')
console.log(tableroIslaArray)

// proximoImgUrl.forEach(ficha, indice => {
    let posicionSinFijar = {"nombre":'' , "largo":'' , "girado":false , "posicion":''}
    // detecta el primer disponible para la proxima pieza
    function primerDisponible(tableroArray, indicePiezas) { //devuelve la posición disponible, igualar a variable
        posicionSinFijar.nombre = piezas[indicePiezas].nombre
        posicionSinFijar.largo = piezas[indicePiezas].largo

        for (let i = 0; i < tableroArray.length; i++) {
            if (tableroArray[i] == '') {
                if (piezas[indicePiezas].largo == 1) {
                    return i;
                } else if (piezas[indicePiezas].largo == 2 && tableroArray[i+8] == '') {
                    return i;
                } else if (piezas[indicePiezas].largo == 3 && tableroArray[i+8] == '' && tableroArray[i+16] == '') {
                    return i;
                }
            }
        }
        return -1; // Si no se encuentra una posición válida, retornar -1
    }

    // generar la imagen
    function generaImagen (tableroClass, indicePiezas, disponible) {
        let tablero = document.getElementsByClassName(tableroClass)
        const div = document.createElement('div')
        div.id = piezas[indicePiezas].nombre
        const img = document.createElement('img')
        img.src = piezas[indicePiezas].url
        img.className = 'colocando' //animacion y poca opacidad
        const heightImg = piezas[indicePiezas].largo * 5
        img.style.height = `${heightImg}dvw`
        img.style.width = '5dvw'
        const imgOk = document.createElement('img')
        imgOk.src = './img/ok.png'
        imgOk.className = 'colocandoOK'
        div.appendChild(img)
        div.appendChild(imgOk)
        tablero[disponible].appendChild(div)
    }
    function redibujar (divId){
        const div = document.getElementById(divId)
        tableroDiv[posicionSinFijar.posicion].appendChild(div)
    }
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
            if (posicionSinFijar.largo == 2 && tableroArray[(posicionSinFijar.posicion + 7)] == '') {
                posicionSinFijar.posicion--
                redibujar (posicionSinFijar.nombre)
            }
            if (posicionSinFijar.largo == 3 && tableroArray[(posicionSinFijar.posicion + 7)] == '' && tableroArray[(posicionSinFijar.posicion + 15)] == '') {
                posicionSinFijar.posicion--
                redibujar (posicionSinFijar.nombre)
            }
            
        }
    }
    function moverDer (posicionSinFijar, tableroArray) {

        const posicion = posicionSinFijar.posicion
        let resto = posicion + 2
        resto = resto % 8
          
        if(resto != 1){
            if(posicionSinFijar.girado || posicionSinFijar.largo == 1){
                if(tableroArray[posicion+1] == ''){
                    posicionSinFijar.posicion++ 
                    redibujar (posicionSinFijar.nombre)
                }
            }
            if (posicionSinFijar.largo == 2 && tableroArray[(posicionSinFijar.posicion + 9)] == '') {
                posicionSinFijar.posicion++
                redibujar (posicionSinFijar.nombre)
            } 
            if (posicionSinFijar.largo == 3 && tableroArray[(posicionSinFijar.posicion + 9)] == '' && tableroArray[(posicionSinFijar.posicion + 17)] == '') {
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
        if(posicionSinFijar.largo == 1) { tope = 48}
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
    let disponible1 = primerDisponible(tableroIslaArray, 1)
    posicionSinFijar.posicion = disponible1
    console.log(posicionSinFijar)
    generaImagen('tablero-div', 1, disponible1)


    const moverDerBtn = document.getElementById('mover-der')
    moverDerBtn.addEventListener('click', ()=> moverDer(posicionSinFijar, tableroIslaArray))
    const moverIzqBtn = document.getElementById('mover-izq')
    moverIzqBtn.addEventListener('click', ()=> moverIzq(posicionSinFijar, tableroIslaArray))
    const moverArrBtn = document.getElementById('mover-arriba')
    moverArrBtn.addEventListener('click', ()=> moverArr(posicionSinFijar, tableroIslaArray))
    const moverAbaBtn = document.getElementById('mover-abajo')
    moverAbaBtn.addEventListener('click', ()=> moverAba(posicionSinFijar, tableroIslaArray))

    // colocarla en el primer lugar disponible
    // tableroUbicacion.forEach((ubicacion, index) => {
    //     let isPosible = true
    //     if(!ubicacion){
    //         for (i=1;i<proximoImgUrl[0].largo;i++){
    //             const aux = index + i*8
    //             if(tableroUbicacion[aux]){
    //                 isPosible = false
    //             }
    //         }    
    //     }
    //     if(isPosible){
    //         tableroDiv[index].appendChild(img)
    //         return
    //     }
    // })
    // console.log(index)
    // moverla
    // fijarla y guardar su ubicacion
    // pasar a la siguiente

// cierre del forEach
// })




// // hover sobre el tablero
// const tableroDiv1 = document.getElementsByClassName('tablero-div')
// const fichasFijas = document.getElementById('fichas-fijas')
// let isFijado = false
// Array.from(tableroDiv).forEach(element => {
//     element.addEventListener('mouseover', function (e) {
//             isFijado = false
//             // si necesito crear el div
//             // const rect = e.target.getBoundingClientRect();
//             // const div = document.createElement('div')
//             // div.classList.add = 'ficha-div'
//             // div.id = proximoImgUrl[0].nombre
//             // const img = document.createElement('img')
//             // img.src = proximoImgUrl[0].url
//             // div.appendChild(img)
//             // fichasFijas.appendChild(div)
//             // div.style.width = `${rect.width}px`;
//             // div.style.height = `${rect.height}px`;
//             // div.style.top = `${rect.top}px`;
//             // div.style.left = `${rect.left}px`;
//             // div.style.display = 'block';

//             element.style.backgroundImage = `url(${proximoImgUrl[0].url})`;
//             this.addEventListener('click', ()=>{
//                 isFijado = true
//                    const img = document.createElement('img')
//                    img.src = proximoImgUrl[0].url
//                    img.id = proximoImgUrl[0].nombre
//                    this.appendChild(img)
//                    const heightImg = proximoImgUrl[0].largo * 5
//                    img.style.height = `${heightImg}dvw`
//                    img.style.width = '5dvw'
//             })
//         })
    
//     element.addEventListener('mouseout', function (e) {
//         if (!isFijado) {
//             element.style.backgroundImage = '';
//         }
//     });
    
// });