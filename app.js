//H-S, multiplicacion dependiendo del kg
function hollidaySegar(peso) {
    let volumenDiarioCc = 0;
    let mantenimientoCcPorHora = 0;
    let mMasM2 = 0;

    if (peso <= 10) {
        volumenDiarioCc = peso * 100;
    } else if (peso <= 20) {
        volumenDiarioCc = 1000 + (peso - 10) * 50;
    } else {
        volumenDiarioCc = 1500 + (peso - 20) * 20;
    }

    mantenimientoCcPorHora = volumenDiarioCc / 24;
    mMasM2 = mantenimientoCcPorHora * 1.5;

    return [volumenDiarioCc, mantenimientoCcPorHora, mMasM2];
}

//SC, simplemente multiplicar por la constante
function superficieCorporal(peso, constante) {
    let volumenDiarioCc = 0;
    let mantenimientoCcPorHora = 0;
    let mMasM2 = 0;

    volumenDiarioCc = peso * constante;
    mantenimientoCcPorHora = volumenDiarioCc / 24;
    mMasM2 = mantenimientoCcPorHora * 1.5;

    return [volumenDiarioCc, mantenimientoCcPorHora, mMasM2];
}


//La funcion devuelve un arreglo con 3 valores
//Posicion 0 = metodo utilizado
//posicion 1 = Volumen diario
//posicion 2 = Mantenimiento por hora
//posicion 3 = m+m/2
function calcularResultados(peso, constante) {
    let metodo = "";
    let resultados = [];

    if (peso <= 30) {
        metodo = "Holliday-Segar";
        resultados = hollidaySegar(peso);
    } else {
        metodo = "Superficie Corporal";
        resultados = superficieCorporal(peso, constante);
    }

    return [metodo, resultados[0].toFixed(2), resultados[1].toFixed(2), resultados[2].toFixed(2)];
}


function botonHandler(peso, constante) {
    console.log(peso)
    const calculos = calcularResultados(peso, constante);

    const r0 = document.getElementById("metodoutilizado");
    const r1 = document.getElementById("mporhora");
    const r2 = document.getElementById("mmasmporhora");
    const r3 = document.getElementById("vdiario");

    r0.textContent = calculos[0];
    r1.textContent = calculos[2] + ' cc';
    r2.textContent = calculos[3] + ' cc/h';
    r3.textContent = calculos[1] + ' cc/h';
}


const botonCalcular = document.querySelector("#calcular");
const errorAviso = document.querySelector('#errorspan');

botonCalcular.addEventListener('click', () => {
    const peso = document.getElementById("peso").value;
    let constante = 1500;

    const opciones = document.querySelectorAll('input[name="constante"]');

    opciones.forEach(opcion => {
        if (opcion.checked) {
            constante = opcion.value;
        }
    });

    if (peso <= 0) {
        errorAviso.textContent = "El valor ingresado debe ser mayor a 0."
    } else if (peso > 300) {
        errorAviso.textContent = "El valor ingresado no es válido."
    } else {
        errorAviso.textContent = ""
        botonHandler(peso, constante);
    }
})

