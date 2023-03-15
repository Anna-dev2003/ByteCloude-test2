


function makeFinalTable(tableData){

    const tableContainer = document.getElementById('table')
    const tableBackground = document.getElementById('table-background')
    const {byteCloudResults, objectStorageResults} = tableData

    const byteCloudColumnElem = document.createElement('tbody')

    const objectStorageColumnElem = document.createElement('tbody')
    
    collectColumn(byteCloudResults, 'ByteCloud', byteCloudColumnElem)
    collectColumn(objectStorageResults,'Object Storage' , objectStorageColumnElem)
    
    tableBackground.classList.add('show')
    tableContainer.append(byteCloudColumnElem, objectStorageColumnElem)

}

function collectColumn(data, title, container){
    const columnTitle = document.createElement('caption')
    columnTitle.classList.add('column-title')
    columnTitle.innerText = title

    const sortedData = sortData(data);
    const ratedData = calculateRating(data);

    sortedData.forEach((item) => {
        for(let area in item){
            const areaRow = document.createElement('tbody')
            areaRow.classList.add('table-row')

            const areaTitle = area.split('-').map((name) => name[0].toUpperCase() + name.slice(1)).join(' ')

            areaRow.innerHTML = `
                <tbody>
                    <tr class="table-row-title">
                        <td class="row-title" colspan="2">${areaTitle}</td>
                        <td class="stars">${ratedData[area]}</td>
                    </tr>
                    <tr>
                        <td><p>Latency</p><p>${item[area].latency}</p></td>
                        <td><p>Download time</p><p>${item[area].time} sec</p></td>
                        <td><p>Video streaming</p><p>${videoStreaming[area]}</p></td>
                    </tr>
                    <tr class='break-table'><td class='break-table'>.</td></tr>
                </tbody>
            `
            container.append(areaRow)
        }
    })

    container.prepend(columnTitle)
}

function sortData(data){
    return data.sort((a, b) => numberOfUsers[Object.keys(b).join('')] - numberOfUsers[Object.keys(a).join('')])
}

function calculateRating(data){
    const rating = {}
    
    data.forEach((obj) => {
        const area = Object.keys(obj).join('')
        const time = obj[area].time
        let starsImg;

        if(time <= 30){
            starsImg = makeStars(0)
            videoStreaming[area] = '4K/2160p Ultra HD'
            
        }else if(time <= 60 && time > 30){
            starsImg = makeStars(1)
            videoStreaming[area] = '4K/2160p Ultra HD'
        }else if(time <= 90 && time > 60){
            starsImg = makeStars(2)
            videoStreaming[area] = '1080p Full HD'
        }else if(time <= 120 && time > 90){
            starsImg = makeStars(3)
            videoStreaming[area] = '720p HD'
        }else if(time > 120){
            starsImg = makeStars(4)
           videoStreaming[area] = '480p'
        }
        
        rating[area] = starsImg.join('')
    })
    return rating
}

function makeStars(count){
    let stars = []
    for(let i = 0; i < 5; i++){
        if(i < count){
            stars.push('<img src="./img/star.svg" alt="star">')
        }else{
            stars.push('<img src="./img/star_filled.svg" alt="star">')
        }
    }
    return stars
}