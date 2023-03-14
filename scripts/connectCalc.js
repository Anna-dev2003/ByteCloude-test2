

function calculateDistance(connections, resultsType) {
    const animateScreenTime = {};
    let animationTime = 0;

    connections.forEach((connection) => {
        
        const latencyResult = storageLatency[connection[0].id][connection[1].id];
        const timeResult = calculateTime(latencyResult)

        if(latencyResult > animationTime){
            animationTime = latencyResult;
        }

        animateScreenTime[connection[1].id] = {area: connection[1], time: latencyResult};
        tableData[resultsType].push({[connection[1].id]: {latency: latencyResult, time: timeResult}});
    })

    screenLoading(animateScreenTime);
    return animationTime * animationDurationFactor;
}

function calculateTime(latency){
    return Math.round(latency * 10 / 25.5);
}

function makeCanvasByteCloudConnection(){
    const allConnections = [] // [[fromServer, toGadget], [fromServer, toGadget]...]
    const distanceConnections = []
    const activeServer = servers.filter((server) => server.hasAttribute('active'))
    const activeAreas = areas.filter((area) => area.hasAttribute('active'))

    for(let area of activeAreas){
       
        const {storage, spareStorage} = storageDependency[area.id]
        const server = activeServer.find((server) => server.id === storage)

        const gadgets = [...area.querySelectorAll('.gadget')].filter((gadget) => gadget.hasAttribute('active'))

        gadgets.forEach((gadget) => {
            if(server){
                allConnections.push([server, gadget])
            }else{
                const spareServer = activeServer.find((server) => server.id === spareStorage)
                allConnections.push([spareServer, gadget])
            }
        })

        if(server){
            distanceConnections.push([server, area])
        }else{
            const spareServer = activeServer.find((server) => server.id === spareStorage)
            distanceConnections.push([spareServer, area])
        }


    }


    createLines(allConnections, canvasByteCloud)
    canvasByteCloud.classList.add('gradual-show')

    const duration = calculateDistance(distanceConnections, 'byteCloudResults')
    return duration

}

function makeObjectStorageConnection(){
    const allConnections = []
    const distanceConnections = []
    const server = servers.find((server) => server.hasAttribute('centralized-storage'))
    const activeAreas = areas.filter((area) => area.hasAttribute('active'))

    for(let area of activeAreas){
        const gadgets = [...area.querySelectorAll('.gadget')].filter((gadget) => gadget.hasAttribute('active'))

        gadgets.forEach((gadget) => {
            allConnections.push([server, gadget])
        })

        distanceConnections.push([server, area])
          
    }

    createLines(allConnections, canvasObjectStorage)
    canvasObjectStorage.classList.add('gradual-show')

    console.log()
    const duration = calculateDistance(distanceConnections, 'objectStorageResults')
    return duration
}


//An old function that calculates the delay depending on the coordinates of the connected elements in the layout

// function calculateDistance(connections, resultsType) {
//     const animateScreenTime = {}
//     let animationTime = 0

//     connections.forEach((connection) => {
//         const fromY = parseInt(window.getComputedStyle(connection[0]).left) + (connection[0].clientWidth / 2);
//         const fromX = parseInt(window.getComputedStyle(connection[0]).top) + (connection[0].clientHeight / 2);
//         const toY = parseInt(window.getComputedStyle(connection[1]).left) + (connection[1].clientWidth / 2);
//         const toX = parseInt(window.getComputedStyle(connection[1]).top) + (connection[1].clientHeight / 2);

//         const distanceResult =  Math.round(Math.sqrt((fromY - toY)**2 + (fromX - toX)**2) * scaleFactor)

//         const latencyResult = Math.round(distanceResult / 4);
//         const timeResult =  Math.round(distanceResult / 10);

//         let newAnimationTime = latencyResult * 50;
//         if(newAnimationTime > animationTime){
//             animationTime = newAnimationTime
//         }
        
//         animateScreenTime[connection[1].id] = {area: connection[1], time: newAnimationTime}
//         tableData[resultsType][connection[1].id] = {latency: latencyResult, time: timeResult}
//     })

//     screenLoading(animateScreenTime)
//     return animationTime
// }






