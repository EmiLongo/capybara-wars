const proximoImgUrl = [
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

const setGirar = document.getElementById('girar')
let girar = false
const proximoImg = document.getElementById('proximo-img')

  
setGirar.addEventListener('click', ()=>{
    proximoImg.classList.toggle('img-girada')
    girar = !girar
})

// hover sobre el tablero
const tableroDiv = document.getElementsByClassName('tablero-div')
const fichasFijas = document.getElementById('fichas-fijas')
let isFijado = false
Array.from(tableroDiv).forEach(element => {
    element.addEventListener('mouseover', function (e) {
            isFijado = false
            // si necesito crear el div
            // const rect = e.target.getBoundingClientRect();
            // const div = document.createElement('div')
            // div.classList.add = 'ficha-div'
            // div.id = proximoImgUrl[0].nombre
            // const img = document.createElement('img')
            // img.src = proximoImgUrl[0].url
            // div.appendChild(img)
            // fichasFijas.appendChild(div)
            // div.style.width = `${rect.width}px`;
            // div.style.height = `${rect.height}px`;
            // div.style.top = `${rect.top}px`;
            // div.style.left = `${rect.left}px`;
            // div.style.display = 'block';

            element.style.backgroundImage = `url(${proximoImgUrl[0].url})`;
            this.addEventListener('click', ()=>{
                isFijado = true
                   const img = document.createElement('img')
                   img.src = proximoImgUrl[0].url
                   this.appendChild(img)
                   const heightImg = proximoImgUrl[0].largo * 5
                   img.style.height = `${heightImg}dvw`
                   img.style.width = '5dvw'
            })
        })
    
    element.addEventListener('mouseout', function (e) {
        if (!isFijado) {
            element.style.backgroundImage = '';
        }
    });
    
});