
const turnPhoneAnimation = document.getElementById('turn-phone')
const screenWidth = document.documentElement.clientWidth

if(screenWidth >= 1440){
    scaleFactor = 1
}else if(screenWidth >= 1140 && screenWidth < 1440){
    scaleFactor = 1.12
}else if(screenWidth >= 1024 && screenWidth < 1140){
    scaleFactor = 1.25
}else if(screenWidth >= 880 && screenWidth < 1024){
    scaleFactor = 1.45
}
else if(screenWidth >= 768 && screenWidth < 880){
    scaleFactor = 1.66
}
else if(screenWidth >= 640 && screenWidth < 768){
    scaleFactor = 2
}

window.addEventListener('resize', () => {
    if(screenWidth < 534){
        turnPhoneAnimation.classList.add('show')
        turnPhoneAnimation.classList.remove('hide')
    }else{
        turnPhoneAnimation.classList.remove('show')
        turnPhoneAnimation.classList.hide('hide')
    }
})

