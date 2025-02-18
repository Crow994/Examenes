let ficha = "10";
let credito = ficha * 3; // Crédito inicial del jugador
let jugada = ficha;


function realizarApostar() {
	
    const xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const xmlDoc = this.responseXML;
            const credito = xmlDoc.getElementsByTagName('credito')[0].textContent;
            const resultado = xmlDoc.getElementsByTagName('resultado')[0].textContent;
            actualizarInterfaz(credito, resultado);
        }
    };
    
    xhttp.open("GET", "resultado.xml", true);
    xhttp.send();
}



function apostar(){
    // Obtener el contenedor de la ruleta
    let ruleta = document.getElementById("ruleta");
    ruleta.classList.add("rotando");

    setTimeout(function() {
        ruleta.classList.remove("rotando");
    }, 10000);

    // Obtener el valor de la apuesta   
    let apuesta = parseInt(document.getElementById("apuesta").value);
    
        if (isNaN(apuesta) || apuesta <= 0) {
            alert("Ingrese una apuesta válida");
            return;
        }

        if (apuesta > credito) {
            alert("No puedes apostar el dinero que no tienes");
            return;
        }

    let numeroApostado = parseInt(prompt("Ingrese un número del 1 al 36"));

        if (isNaN(numeroApostado) || numeroApostado <= 0 || numeroApostado > 36) {
            alert("Ingrese un número válido del 1 al 36");
            return;
        }
        
    //generamos un numero aleatorio entre 1 y 36
    let numeroGanador = Math.floor(Math.random() * 36) + 1;
    
    // Calcular el resultado de la apuesta
    let resultado = calcularResultado(numeroApostado, numeroGanador, apuesta);

        // Actualizar el crédito y mostrar el resultado
        actualizarCredito(resultado);
    }

function calcularResultado(numeroApostado, numeroGanador, apuesta) {
        let resultado = {
            numeroGanador: numeroGanador,

            color: numeroGanador <= 10 ||(numeroGanador >= 20 && numeroGanador <= 28) ?
            (numeroGanador % 2 === 0 ? "rojo" : "negro") :
            (numeroGanador % 2 === 0 ? "negro" : "rojo"),
            paridad: numeroGanador % 2 === 0 ? "par" : "impar",
            mensaje: ""
        };

        if (numeroApostado === numeroGanador) {
            credito += apuesta * 35;
            resultado.mensaje = "¡Has ganado!";
        } else {
            credito -= apuesta;
            resultado.mensaje = "Lo siento, has perdido";
        }
        
        return resultado;
    }


function actualizarCredito(resultado) {
    
    //Actualiza el credito del jugador
    document.getElementById("creditoJugador").innerHTML ="credito: " + credito + "€";

    //Mostrar resultado
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML =    `Numero ganador: ${resultado.numeroGanador} 
                                (${resultado.color}, ${resultado.paridad}). 
                                ${resultado.mensaje}. 
                                Ahora tienes ${credito} fichas.`;

    resultadoDiv.style.display = "block";
    
    //verificacion de credito
    if (credito <= 0) {
        alert("Te has quedado sin creidito. ¡Hasta otro día!");
        volverJugar();
        return;
    }

}

function actualizarInterfaz(credito, resultado) {
	
    // Actualizar el crédito del jugador
    document.getElementById("creditoJugador").innerHTML = "Crédito: " + credito + "€";
    
    // Actualizar el resultado mostrado
    document.getElementById("resultado").innerText = "Resultado: " + resultado;
}


// function actualizarCredito() {
//     document.getElementById("creditoJugador").innerText = "Crédito: " + credito + "€";
//         if (credito <= 0) {
//             alert("Te has quedado sin crédito. ¡Hasta la próxima!");
//             volverJugar();
//             return;
//         }
// }


function volverJugar() {
    //Reiniciar el credito
    credito = 30;
    
    //Ocultar resultado
    document.getElementById("resultado").style.display = "none";
}

function reloadPage() {
    //Reiniciar el juego
    credito = 30;
    location.reload();

}

