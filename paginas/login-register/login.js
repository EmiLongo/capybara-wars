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

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre-usuario').value;
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('password').value;
  try {
      const response = await fetch('http://localhost:3000/api/user/registro', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, email, contraseña }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById('message').textContent = data.message || 'Registro exitoso';
    window.location.href = '../tablero/tablero.html'
} catch (error) {
    console.error('Error:', error);
    document.getElementById('message').textContent = 'Error en el registro, validá los datos ingresados';
}
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const contraseña = document.getElementById('password-login').value;

  try {
      const response = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
          document.getElementById('message').textContent = 'Login exitoso';
          // Aquí guardardamos el token en localStorage y redirigir al usuario
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          // Redirigir a la página del juego o mostrar un mensaje de éxito
          window.location.href = '../tablero/tablero.html'
      } else {
          document.getElementById('message').textContent = data.error || 'Error en el login';
      }
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').textContent = 'Error en la conexión';
  }
});