/* Draggable element */
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

function dragStart(e) {

    if (e.target.hasAttribute("id") && !e.target.hasAttribute("original")) {
        console.log("ID: '" + e.target.id + "'");
        e.dataTransfer.setData('text/plain', e.target.id);
    } else {
        console.log("REFERENCIA: '" + e.target.getAttribute("original") + "'");
        e.dataTransfer.setData('text/plain', e.target.getAttribute("original"));
    }
    
}


/* Drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

/* Funciones de drop targets */
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

    // Get the item
    const id = e.dataTransfer.getData('text/plain');
    const element = document.getElementById(id);

    // Create the copy
    const copy = document.createElement("div");
    copy.classList = element.classList;
    copy.draggable = element.draggable;
    copy.setAttribute("original", element.id);
    console.log("Atributo original: " + copy.getAttribute("original"));
    copy.addEventListener('dragstart', dragStart);

    // Append al nodo que ha llamado al metodo
    e.target.appendChild(copy);
}





/*

    SUMMARY

    Add the draggable property with the value of true to an element to make it draggable.
    The dragstart, drag, and dragend events fire on the draggable element.
    The dragenter, dragover, dragleave or drop events fire on the drop target.
    Call the event.preventDefault() on the dragenter and dragover event handlers to make an element a valid drop target.
    Use the event.dataTransfer object with the setData() and getData() methods to transfer data in the drag-and-drop operation.

    */