let listEl = document.querySelector("#list")
let showEl = document.querySelector("#show-panel")

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books")
    .then(r => r.json())
    .then(books => {
        books.forEach(book => addBooktoDOM(book))
        frontPage()
    })
});

function frontPage(){
    fetch("http://localhost:3000/books/1")
    .then(r => r.json())
    .then(book => getBook(book))
}

function addBooktoDOM(book){
    let title = book.title
    let description = book.description
    let img = book.img_url
    let users = book.users

    let liEl = document.createElement("li")
    liEl.textContent = title
    listEl.append(liEl)

    liEl.addEventListener("click", evt => {
        getBook(book)
    })
}

function getBook(book){
    fetch(`http://localhost:3000/books/${book.id}`)
    .then(r => r.json())
    .then(book => {
        displayBook(book)
    })
}

function displayBook(book){
    showEl.innerHTML = ""
    let title = book.title
    let description = book.description
    let img = book.img_url
    let users = book.users

    let h1 = document.createElement("h1")
        h1.textContent = title
    let imgEl = document.createElement("img")
        imgEl.src = img
    let p = document.createElement("p")
        p.textContent = description
    let ul = document.createElement("ul")
        if (users.length !== undefined) {
            users.forEach(user => {
                let li = document.createElement("li")
                li.textContent = user.username
                ul.append(li)
            })
        }
    let likeBtn = document.createElement("button")
            likeBtn.id = "like-btn"
            likeBtn.textContent = "Like <3"
            likeBtn.addEventListener("click", evt => {
                evt.preventDefault()
                like(book)
            })
    showEl.append(h1, imgEl, p, ul, likeBtn)
}

function like(book){
    fetch("http://localhost:3000/users/1")
    .then(r => r.json())
    .then(user => {
        let newLikes
        if (book.users.length !== undefined){
            newLikes = [...book.users, user]
        } else {
            newLikes = [user]
        }
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                users: newLikes
            })
        })
        .then(r => r.json())
        .then(book => {
            getBook(book)
        })
    })
}