
function screenLoading(animateScreenTime){
    for(let area in animateScreenTime){
        const screens = [...animateScreenTime[area].area.querySelectorAll('.screen')]
        const latency = animateScreenTime[area].time;
        const transition = latency * animationDurationFactor;
        screens.forEach((screen) => screen.style.transition = `${transition}ms`)
        animateScreenTime[area].area.querySelector('.laptop-screen').style.width = '27px'
        animateScreenTime[area].area.querySelector('.smartphone-screen').style.width = '17px'
        animateScreenTime[area].area.querySelector('.telephone-screen').style.width = '12px'

        showLatencyAndTime(animateScreenTime[area].area, transition, latency)
    }
}

function showLatencyAndTime(container, duration, latency){
    const latencyOrTimeElem = container.querySelector('.result-block')
    latencyOrTimeElem.classList.add('show')
    
    latencyOrTimeElem.innerText = `Latency: ${latency}`

    setTimeout(()=>{
        latencyOrTimeElem.innerText = `Time: ${calculateTime(latency)} sec`
    },  duration);
}

function startAnimation() {

    let animationDuration = makeCanvasByteCloudConnection();
    setTimeout(()=>{
        canvasByteCloud.classList.remove('gradual-show')
        screens.forEach((screen) => {
            screen.style.transition = '0ms'
            screen.style.width = '0'
        })

        animationDuration = makeObjectStorageConnection()
        setTimeout(() => {
            makeFinalTable(tableData)
        }, animationDuration + 500)

    }, animationDuration + 500);

}

function sayHi(){
    console.log('hi')
}