// Draggable element
const instrumentos = document.querySelectorAll('.instrumento');
instrumentos.forEach(instrumento => {
    instrumento.addEventListener('dragstart', dragStart);
    instrumento.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    if (e.target.hasAttribute("id") && !e.target.hasAttribute("original")) {
        console.log("ID: '" + e.target.id + "'");
        e.dataTransfer.setData('text/plain', e.target.id);
    } else {
        console.log("REFERENCIA: '" + e.target.getAttribute("original") + "'");
        e.dataTransfer.setData('text/plain', e.target.getAttribute("original"));
    }
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}


// Drop targets
const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', drop);
});

// Funciones de drop targets
function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');
    e.target.removeEventListener('dragenter', dragEnter)
    e.target.removeEventListener('dragover', dragOver);
    e.target.removeEventListener('dragleave', dragLeave);
    e.target.removeEventListener('drop', drop);

    // Guardar el elemento original
    const id = e.dataTransfer.getData('text/plain');
    const element = document.getElementById(id);

    // Crear la copia del elemento
    const copy = document.createElement("div");
    copy.classList = element.classList;
    // copy.draggable = element.draggable;
    copy.setAttribute("original", element.id);
    copy.setAttribute("tipo", element.getAttribute("tipo"));
    copy.style.backgroundImage = getComputedStyle(element).backgroundImage;
    copy.style.margin = "0 0 15% 0";
    copy.classList.remove("dragging");
    copy.classList.remove("draggable");

    copy.addEventListener('dragstart', dragStart);

    // Append al nodo que ha llamado al metodo
    e.target.appendChild(copy);
    copy.parentNode.setAttribute("isEmpty", "false");

    // Añadir css a la celda
    const celda = copy.parentNode;

    // Añadir el texto de la nota
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("DO"))
    p.setAttribute("nota", "C");
    celda.insertBefore(p, copy);

    // Display:none si es rítmico
    if (copy.getAttribute("tipo") == "ritmico") {
        celda.querySelector("p").style.display = "none";
        celda.querySelector("p").innerHTML = "#";
        p.setAttribute("nota", "#");
    }
}





/*

    SUMMARY

    Add the draggable property with the value of true to an element to make it draggable.
    The dragstart, drag, and dragend events fire on the draggable element.
    The dragenter, dragover, dragleave or drop events fire on the drop target.
    Call the event.preventDefault() on the dragenter and dragover event handlers to make an element a valid drop target.
    Use the event.dataTransfer object with the setData() and getData() methods to transfer data in the drag-and-drop operation.

    */