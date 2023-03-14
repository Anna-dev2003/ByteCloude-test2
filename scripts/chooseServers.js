
function showServers(){
    servers.forEach((server) => {
        server.classList.add('gradual-show')
        server.addEventListener('click', handleClickServer)
        server.addEventListener('mouseover', handleHoverServer)
        server.addEventListener('mouseout', handleMouseoutServer)
    })
    appTitle.innerText = 'Where is your data? Choose one spot for Object Storage system'
}

function handleHoverServer(event){
    event.target.src = './img/circle_filled.png'
}

function handleMouseoutServer(event){
    event.target.src = './img/circle_empty.png'
}

function handleClickServer(event){

    const server = event.target.parentNode
    const activeServersCount = servers.filter((server) => server.hasAttribute('active')).length
    server.removeEventListener('click', handleClickServer)
    server.removeEventListener('mouseover', handleHoverServer)
    server.removeEventListener('mouseout', handleMouseoutServer)
    
    if(activeServersCount === 0){
        server.setAttribute('centralized-storage', '')
        server.innerHTML = '<img src="./img/server.png" alt="">'
        appTitle.innerText = 'Choose minimum two additional spots for ByteCloud and press'
        submitStartBtn.classList.add('show')
        submitStartBtn.setAttribute('disabled', '')
    }else{
        server.innerHTML = '<img src="./img/server_ByteCloud.png" alt="">'
    }

    if(activeServersCount >= 2){
        submitStartBtn.removeAttribute('disabled')
    }

    server.setAttribute('active', '')


    if(servers.every((server) => server.hasAttribute('active'))){
        handleBtnStart()
    }
}

function hideServers(){
    servers.filter((server) => !server.hasAttribute('active'))
        .forEach((server) => {
            server.classList.remove('gradual-show')
        })
}

function handleBtnStart() {
    hideServers()
    submitStartBtn.classList.remove('show')
    appTitle.innerText = '';

    startAnimation()
}

submitStartBtn.addEventListener('click', handleBtnStart)

