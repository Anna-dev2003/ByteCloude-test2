

const users = [...map.querySelectorAll('.areas-block__men')];

for(let elem of users){
    elem.addEventListener('click', handleUsersClick)
    elem.addEventListener('mouseover', handleHoverUsers)
    elem.addEventListener('mouseout', handleMouseoutUsers)
}

function handleMouseoutUsers(event){
    let userType = [...event.target.parentNode.querySelectorAll('.man')].forEach((man) => man.src = './img/man_empty.png')
}
function handleHoverUsers(event){
    let userType = event.target.className
    switch(userType){
        case 'small-man man':
            event.target.src = './img/man_filled.png'
            break;
        case 'medium-man man':
            event.target.parentNode.querySelector('.small-man').src = './img/man_filled.png'
            event.target.src = './img/man_filled.png'
            break;
        case 'big-man man':
            event.target.parentNode.querySelector('.small-man').src = './img/man_filled.png'
            event.target.parentNode.querySelector('.medium-man').src = './img/man_filled.png'
            event.target.src = './img/man_filled.png'
        break;
    }

}

function handleUsersClick(event) {
 
        let userType = event.target.className
        let usersArea = event.target.parentNode.parentNode
        let gadgets = [...usersArea.querySelectorAll('.gadget')]

        switch(userType){
            case 'small-man man':
                
                gadgets.filter((gadget) => gadget.classList.contains('laptop'))
                    .forEach((gadget) => {
                        gadget.classList.add('gradual-show')
                        gadget.setAttribute('active', '')
                        numberOfUsers[usersArea.id] = 1
                    })
                
                break;
            case 'medium-man man':
                gadgets.filter((gadget) => gadget.classList.contains('laptop') || gadget.classList.contains('smartphone'))
                    .forEach((gadget) => {
                        gadget.classList.add('gradual-show')
                        gadget.setAttribute('active', '')
                        numberOfUsers[usersArea.id] = 2
                    })
                break;
            case 'big-man man':
                gadgets.filter((gadget) => gadget.classList.contains('laptop') || gadget.classList.contains('smartphone') || gadget.classList.contains('telephone'))
                    .forEach((gadget) => {
                        gadget.classList.add('gradual-show')
                        gadget.setAttribute('active', '')
                        numberOfUsers[usersArea.id] = 3
                    })

                break;
            default:
                return;
        }

    
        let users = event.target.parentNode
        users.classList.add('gradual-hide')

        users.removeEventListener('click', handleUsersClick)
        users.removeEventListener('mouseover', handleHoverUsers)
        users.removeEventListener('mouseout', handleMouseoutUsers)

        if(!submitNextBtn.classList.contains('show')){
            submitNextBtn.classList.add('show')
        }

    usersArea.setAttribute('active', '')
    const checkAreasResult = checkActiveAreas()
    if(checkAreasResult){
        handleBtnNext()
    }
}

function checkActiveAreas(){
    return areas.every((area) => area.hasAttribute('active'))
}

function hideUsers(){
    areas.filter((area) => !area.hasAttribute('active'))
        .forEach((area) => area.querySelector('.areas-block__men').classList.add('gradual-hide'))
}

function handleBtnNext(){
    submitNextBtn.classList.remove('show')
    showServers()
    hideUsers()
}

submitNextBtn.addEventListener('click', handleBtnNext)