/*
    El eveto dragover indica que están pasando un elemento por la zona de arrastre (drag)
*/
let container = document.getElementById("container")
let filesZone = document.getElementById("files-zone")
let textZone = document.getElementById("text-zone")
let renderFilesNode = document.getElementById("render-files")
let files = []
initFunctions()
container.addEventListener("dragover", handrerDragOver)
container.addEventListener("dragleave", handlerDragLeave)
container.addEventListener("drop", handlerDrop)

// Manejadores de eventos
function handrerDragOver (ev) {

    ev.preventDefault();
    customLog("handrerDragOver => ", ev)
    textZone.setAttribute("class","text-zone-drag-over")
    initTicTic()
    dragOverText()
}
function handlerDragLeave (ev) {
    ev.preventDefault();
    customLog("handlerDragLeave => ", ev)
}
function handlerDrop (ev) {
    ev.preventDefault();
    customLog("handlerDrop => ", ev)
    dropText()
    removeTicTic()
    getFilesOnEvent(ev)
}

// Funciones auxiliares
function getFilesOnEvent(ev){
    if (ev.dataTransfer.items) {
        // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // Si los elementos arrastrados no son ficheros, rechazarlos
            if (ev.dataTransfer.items[i].kind === 'file') {

                window.folder = ev.dataTransfer.items[i]
                var file = ev.dataTransfer.items[i].getAsFile();
                this.getAndSetBase64(file)
                // file && this.$emit("dropFile", file)
            }
        }
    } else {
    // Usar la interfaz DataTransfer para acceder a el/los archivos
        ev.dataTransfer.files.map((file, i) => {
            console.log('... file[' + i + '].name = ' + file.name);
        })
    }
}
function initTicTic(){
    container.setAttribute("class", "tic-tic")
}
function getAndSetBase64(file){
    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = async (img) => {
            let data = {
                base: img.target.result,
                file,
                hook:this.hook,
                id: this.id
            }
            files.push(data)
            renderFiles()
        }
    }
}
function initFunctions(){
    initText()
}

function removeTicTic(){
    container.removeAttribute("class")
}
function renderFiles() {
    let html = `<div class="container-files">`
    files.map((file) => {
        let pathRender = file.base
        let fileName = file.file.name
        if (file.file.type != 'image/png') {
            pathRender = defaultImagePath
            fileName = `${fileName} (Default image)`
        }
        html += `
                <div style="display:grid;"> 
                    <img src="${pathRender}" alt="${file.file.name}" width="100px" height="100px">
                    <small> ${fileName} </small>
                </div>
        
        ` 
    })
    html += `</div>`
    renderFilesNode.innerHTML = html
}
function initText() {
    textZone.innerText = "Arrastra aquí tus elementos..."
}
function dragOverText() {
    textZone.innerText = "Ya puedes soltar tus archivos."
}
function dropText() {
    textZone.innerText = ""
}