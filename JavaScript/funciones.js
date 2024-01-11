alert("Prueba a arrastrar los instrumentos al pentagrama");



function hasPulsado(elemento) {
    alert("El botón '" + elemento.id + "' está en desarrollo");
}

function lienzoToString() {
    const partitura = [];
    const lienzo = document.querySelector('.lienzo');
    const filas = lienzo.querySelectorAll('.fila');
    filas.forEach(fila => {
        const notas = fila.querySelector('.notas');
        const celdas = notas.querySelectorAll('.celda');
        celdas.forEach(celda => {
            const item = celda.querySelector('.item');
            if (item.getAttribute("isEmpty") == "true") {
                // FORMATO: [emptyItem],
                partitura.push("emptyItem");
            } else {
                // FORMATO: [id,nota],
                const id = item.querySelector('.instrumento').getAttribute("original");
                const nota = item.querySelector('p').getAttribute("nota");
                partitura.push(id + "," + nota);
            }
        })
    });


    // let beat = new Audio('../assets/audio/fart.wav');
    

    // const bpm = document.getElementById("bpm").value;
    // const intervalo = (1/(bpm/60)) * 1000;
    // let counter = 0;
    // let size = partitura.length;
    // const intervalId = setInterval(function() {
    //     beat.pause();
    //     if (counter < size) {
    //         console.log(partitura[counter]);
    //         beat.play();
    //     } else {
    //         clearInterval(intervalId);
    //     }
    //     counter++;
    // }, intervalo, partitura);
}
