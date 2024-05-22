const girar = document.getElementById('girar')
const proximoImg = document.getElementById('proximo-img')

const proximoImgUrl = ["./img/x3.png","./img/x3.png","./img/x3.png","./img/x2.png","./img/x2.png","./img/x2.png","./img/x2.png","./img/x1.png", "./img/x1.png","./img/x1.png","./img/x1.png","./img/x1.png"]
girar.addEventListener('click', ()=>{
    proximoImg.classList.toggle('img-girada')
    
})