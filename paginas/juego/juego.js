const piezasIslaAcomodadas = JSON.parse(localStorage.getItem("piezasIslaAcomodadas"));
const tableroIslaArray = JSON.parse(localStorage.getItem("tableroIslaArray"));
const piezasPirataAcomodadas = JSON.parse(localStorage.getItem("piezasPirataAcomodadas"));
const tableroPirataArray = JSON.parse(localStorage.getItem("tableroPirataArray"));

console.log('piezasIslaAcomodadas:',piezasIslaAcomodadas)

const tableroIslaFondo = document.getElementById('tablero-isla-fondo')
tableroIslaFondoDivs = tableroIslaFondo.getElementsByTagName('div')