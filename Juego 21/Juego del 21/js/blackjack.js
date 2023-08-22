// para alta resolución
var canvas = document.getElementById("canvas")
canvas.width = 1220 * 2 //multiplique x 2 la resolución porque salia muy baja la imagen
canvas.height = 400 * 2 //esta igual
canvas.style.width = 1220 + "px"  //este fue el tamaño de la imagen
canvas.style.height = 400 + "px" //este igual 
var ctx = canvas.getContext("2d") //2d porque es una app con cartas animadas 2d

// Classe carta
class carta {
	// las variables static pertenece a la clase carta
	static x = 50 //una clase para repartir entre todas las clases,no la puse afuera.
	static y = 50//esta igual.

	constructor(valor, palo) {
		this.img = new Image() //nuevo objeto de imagen
		this.valor = valor//valor de las cartas
		this.palo = palo//donde pertenecen las cartas,picas,trebol,brillo, ect
	}
}

// Variables que vamos a usar
var cartas = []
var cartasJugador = []
var cartasCrupier = []
var indiceCarta = 0
var palos = ["S", "H", "D", "C"] //un recorrido de las cartas que inicaos con 0
//  las cartas. Con atributos valor y palo
for (i = 0; i < 4; i++) { //se requite 4 veces por de ariiba, recorre 4 veces
	for (j = 1; j <= 13; j++) {
		cartas.push(new carta(j, palos[i]))
	} // es un juego de recorrido, j recoore 4 veces luego va a new carta j, palo toma el valor de unos de los 4
}

// Para barajear las cartas
for (i = 0; i < 100; i++) {
	cartas.splice(Math.random() * 52, 0, cartas[0])
	cartas.shift()
}// tomamos una carta de modo aleatorio entre las 52 cartar que hay quitando la primera porque ya fue tomada
//100 es la cantidad de veces que se barajea antes de tirar una carta, puede ser más pero creo que 100 esta bien

function dibujarCarta(CJ) {
	// Tenemos que primero cargar la carta y luego añadir el src
	// Si no las cartas no cargan en la pagina
	CJ.img.onload = () => {
		ctx.drawImage(CJ.img, carta.x, carta.y, 239, 335)
		carta.x += 300
	};
	// Para cargar la imagen correcta concatenamos el numero y el palo, que coincida con el nombre del fichero
	CJ.img.src = "imagenes/cartas/" + CJ.valor.toString() + CJ.palo + ".svg"
}

function pedirCarta() {
	// Ponemos un maximo de cartas que pueda sacar para que el crupier(la máquina) tambíen pueda sacar las suyas
	if (indiceCarta < 8) {
		let CJ = cartas[indiceCarta] //Carta Jugada
		cartasJugador.push(CJ)
		dibujarCarta(CJ)
		indiceCarta++
	}
}

function parar() {
	document.getElementById("pedir").disabled = true
	document.getElementById("parar").disabled = true
	document.getElementById("reset").style.visibility = "visible"
	let pointsUser = 0
	let pointsCrupier = 0
	let info = document.getElementById("info")
	// Contamos e imprimimos los puntos del jugador
	for (i in cartasJugador) {
		pointsUser += cartasJugador[i].valor
	}
	// Sacamos cartas al crupier y contamos sus puntos
	while (pointsCrupier < 17) {
		cartasCrupier.push(cartas[indiceCarta])
		pointsCrupier += cartas[indiceCarta].valor
		indiceCarta++;
	}
	// Putos de la partida se ponen en info
	info.innerHTML = "Puntuación jugador: " + pointsUser + "<br>Puntuación crupier: " + pointsCrupier
	// Dibujamos las cartas del crupier
	carta.x = 50
	carta.y = 400
	for (i in cartasCrupier) {
		dibujarCarta(cartasCrupier[i])
	}
	// Comprobamos ganador
	if (pointsUser == 21) {
		info.innerHTML +="<br><b>Blackjack!!! Has ganado!</b>"
	} else if (pointsUser > 21) {
		info.innerHTML +="<br><b>Has perdido... Te has pasado de puntos</b>"
	} else if (pointsCrupier > 21) {
		info.innerHTML +="<br><b>Has ganado!!! La máquina se ha pasado de puntos</b>"
	} else if (pointsCrupier >= pointsUser) {
		info.innerHTML += "<br><b>Ha ganado la máquina...</b>"
	} else {
		info.innerHTML += "<br><b>Has ganado!!!</b>"
	}
}

//Recarga la pagina cuando se presiona el botton
function playagain() {
	location.reload(true)
}
