document.addEventListener("DOMContentLoaded", function() {});
let bookUL = document.getElementById("list")
let showPanel = document.getElementById("show-panel")

fetch ('http://localhost:3000/books')
.then(res => res.json())
.then(books => {
    books.forEach(book => {
        bookUL.innerHTML += `<li id="book-title" data-id=${book.id}> ${book.title} </li>` 
    });
})

bookUL.addEventListener("click", evt => {
    let bookLI = document.getElementById("book-title")
    if (evt.target.tagName === "LI") {
        
        fetch(`http://localhost:3000/books/${evt.target.dataset.id}`)
        .then(res => res.json())
        .then(book => {
            showPanel.innerHTML = `<p>${book.title}</p>
            <img src= ${book.img_url} >
            <p>${book.description}</p>
            <p id="bookUsers">${book.users.map(user => user.username)}</p>
            <button id="like-button" data-id=${evt.target.dataset.id}> Like </button>`
        
            let likeButton = document.getElementById("like-button")
        showPanel.addEventListener("click", evt => {
            let me = {"id":1, "username":"pouros"}
                let currentUsers = book.users
                let updatedUsers = currentUsers.push(me)
                let bookUsers = document.getElementById("bookUsers")
            if (evt.target.id === "like-button") {
                fetch(`http://localhost:3000/books/${evt.target.dataset.id}`, {
                    method: 'PATCH', 
                    headers: {"Content-Type": "application/json",
                    "Accept": "application/json"},
                    body: JSON.stringify({
                        users: currentUsers
                    })
                })
                    .then(res => res.json())
                    .then(like => {      
                        bookUsers.append(me.username)
                    })
    
            
    
    
    
    
    
             }
    
    
    
    
        
        
        
        
        })
        
        
        
        
        
        })

        

    }       
         
            



                            


          


})