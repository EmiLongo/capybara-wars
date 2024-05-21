// cambia los selectores de registro o login
const selecIzq = document.querySelector('.selector-izq')
const selecDer = document.querySelector('.selector-der')
const tituloLogin = document.querySelector('.titulo-login')
const tituloRegistro = document.querySelector('.titulo-registro')
const h2 = document.getElementsByTagName('h2')
const login = document.getElementById('login')
const registro = document.getElementById('registro')

selecIzq.addEventListener('click', ()=>{
    selecIzq.classList.add('selector-activo')
    selecDer.classList.remove('selector-activo')
    tituloLogin.classList.add('cont-activo')
    tituloRegistro.classList.remove('cont-activo')
    h2[0].classList.add('texto-activo')
    h2[1].classList.remove('texto-activo')
    login.style.width = '70dvw'
    registro.style.width = '0'
})
selecDer.addEventListener('click', ()=>{
    selecIzq.classList.remove('selector-activo')
    selecDer.classList.add('selector-activo')
    tituloLogin.classList.remove('cont-activo')
    tituloRegistro.classList.add('cont-activo')
    h2[0].classList.remove('texto-activo')
    h2[1].classList.add('texto-activo')
    login.style.width = '0'
    registro.style.width = '70dvw'
})

// handle butons registro y login
const registroBtn = document.getElementById('registro-btn')
const loginBtn = document.getElementById('login-btn')
//este boton está desconectado del formulario
registroBtn.addEventListener('click', ()=>{
    window.location.href = '../tablero/tablero.html'
})
//este boton está desconectado del formulario
loginBtn.addEventListener('click', ()=>{
    window.location.href = '../tablero/tablero.html'
})