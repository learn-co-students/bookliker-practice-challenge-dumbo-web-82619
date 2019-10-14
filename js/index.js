let currentUser 

fetch('http://localhost:3000/users/1')
    .then(resp => resp.json())
    .then(obj => {return currentUser = obj})
    const listPanel = document.querySelector('#list-panel')
    
    document.addEventListener("DOMContentLoaded", function() {
        fetch('http://localhost:3000/books')
        .then(resp => resp.json())
        .then(obj => obj.forEach(loadBooks))
    });
    

function loadBooks(obj){
    const unOrderedList = document.querySelector('#list')
    let book = document.createElement('li')
    book.innerText = obj.title
    book.addEventListener('click', evt => {
        let showPanel = document.querySelector('#show-panel')
        showPanel.innerHTML = ''

        fetch(`http://localhost:3000/books/${obj.id}`)
            .then(resp => resp.json())
            .then(respJSON => {

                let title = document.createElement('h2')
                title.innerText = respJSON.title
                
                let image = document.createElement('img')
                image.src = respJSON.img_url
                
                let desc = document.createElement('p')
                desc.innerText = respJSON.description
                
                let users = document.createElement('p')
                let strong = document.createElement('strong')
                users.append(strong)
                
                let userList = document.createElement('ul')
                userList.id = 'user-list'
                strong.append(userList)
                
                let usersArray = respJSON.users
                usersArray.forEach(user => {
                    let userItem = document.createElement('li') 
                    userItem.innerText = user.username; 
                    userList.append(userItem)
                })
                
                let likeBtn = document.createElement('button')
                likeBtn.dataset.id = respJSON.id
                respJSON.users.find(user => user.id === currentUser.id) ? likeBtn.innerText = 'Unlike Book' : likeBtn.innerText = 'Like Book'
                likeBtn.addEventListener('click', evt => {
                    fetch(`http://localhost:3000/books/${obj.id}`)
                        .then(resp => resp.json())
                        .then(updateUsers)
                })
                
                showPanel.append(title, image, desc, users, likeBtn)
            })
        })
        
    unOrderedList.append(book)
}

function updateUsers(obj){
    let objUsers = obj.users
    console.log(obj)
    // debugger
    if (obj.users.find(user => user.id === currentUser.id)){
       let filteredUsers = objUsers.filter(user => {
            return user.id !== currentUser.id
        })
        fetch(`http://localhost:3000/books/${obj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                users: filteredUsers
            })
        })
        .then(resp => resp.json())
        .then(respJSON => {
            console.log(respJSON)
            let likeBtn = document.querySelector(`[data-id="${respJSON.id}"]`)
            likeBtn.innerText = 'Like Book'

            let userList = document.querySelector('#user-list')
            userList.innerHTML = ""

            let usersArray = filteredUsers
            usersArray.forEach(user => {
                let userItem = document.createElement('li') 
                userItem.innerText = user.username; 
                userList.append(userItem)
            })
        })
    }
    else {
        objUsers.push(currentUser)
        fetch(`http://localhost:3000/books/${obj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                users: objUsers
            })
        })
        .then(resp => resp.json())
        .then(respJSON => {
            console.log(respJSON)
            
            let likeBtn = document.querySelector(`[data-id="${respJSON.id}"]`)
            likeBtn.innerText = 'Unlike Book'

            let userList = document.querySelector('#user-list')
            let newItem = document.createElement('li')
            newItem.innerText = currentUser.username
            userList.append(newItem)
            
        })
    }

}