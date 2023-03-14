
const mapWidth = map.offsetWidth;
const mapHeight = map.offsetHeight;


function createLines(allConnections, canvasType){
    allConnections.forEach((connection) => {
        createCoords(connection[0], connection[1], canvasType)
    })
}

function createCanvasObjectStorage(){
    const canvasObjectStorage = document.createElement('canvas')
    canvasObjectStorage.setAttribute('width',  mapWidth)
    canvasObjectStorage.setAttribute('height', mapHeight)
    canvasObjectStorage.classList.add('canvas-field')

    map.append(canvasObjectStorage)
    return canvasObjectStorage
}
const canvasObjectStorage = createCanvasObjectStorage()

function createCanvasByteCloud(){
    const canvasObjectStorage = document.createElement('canvas')
    canvasObjectStorage.setAttribute('width',  mapWidth)
    canvasObjectStorage.setAttribute('height', mapHeight)
    canvasObjectStorage.classList.add('canvas-field')

    map.append(canvasObjectStorage)
    return canvasObjectStorage
}
const canvasByteCloud = createCanvasByteCloud();


function createCoords(fromServer, toGadget, canvasType) {
    const coords = {}

    const fromYCoord = parseInt(window.getComputedStyle(fromServer).left) + (fromServer.clientWidth / 2);
    const fromXCoord = parseInt(window.getComputedStyle(fromServer).top) + (fromServer.clientHeight / 2);

    const area = toGadget.parentNode.parentNode
    const toYCoord = (parseInt(window.getComputedStyle(area).left)) + (parseInt(window.getComputedStyle(toGadget).left) + toGadget.clientWidth / 2);
    const toXCoord = (parseInt(window.getComputedStyle(area).top)) + (parseInt(window.getComputedStyle(toGadget).top) + toGadget.clientHeight / 2);

    coords.fromY = fromYCoord;
    coords.fromX = fromXCoord;
    coords.toY = toYCoord;
    coords.toX = toXCoord;
    coords.bendingCoordY = (fromYCoord + toYCoord) / 2;
    coords.bendingCoordX = (fromXCoord + toXCoord) / 2 - 100;

    drawConnectLine(coords, canvasType)
}

function drawConnectLine({fromY, fromX, bendingCoordY, bendingCoordX, toY, toX}, canvas) {
    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0, 45, 80)";
    ctx.beginPath();
    ctx.bezierCurveTo(fromY, fromX, bendingCoordY, bendingCoordX, toY, toX); 
    ctx.stroke();
}

