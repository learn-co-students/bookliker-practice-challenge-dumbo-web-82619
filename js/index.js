document.addEventListener("DOMContentLoaded", function() {
const listPanel = document.querySelector('#list-panel')

fetch('http://localhost:3000/books')
.then(resp => resp.json())
.then(obj => obj.forEach(loadBooks))
});

function loadBooks(obj){
    const unOrderedList = document.querySelector('#list')
    let book = document.createElement('li')
    book.innerText = obj.title
    book.addEventListener('click', evt => {
        console.log(obj)
        let showPanel = document.querySelector('#show-panel')
        showPanel.innerHTML = ''

        let title = document.createElement('h2')
        title.innerText = obj.title

        let image = document.createElement('img')
        image.src = obj.img_url

        let desc = document.createElement('p')
        desc.innerText = obj.description
        
        let users = document.createElement('p')
        let strong = document.createElement('strong')
        users.append(strong)
        
        let userList = document.createElement('ul')
        strong.append(userList)

        let usersArray = obj.users
        usersArray.forEach(user => {let userItem = document.createElement('li'); userItem.innerText = user.username; userList.append(userItem)})
        
        let likeBtn = document.createElement('button')
        likeBtn.innerText = 'Like Book'

        showPanel.append(title, image, desc, users, likeBtn)
    })
    unOrderedList.append(book)
}