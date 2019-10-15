bookUL.addEventListener("click", evt => {
    let bookLI = document.getElementById("book-title")
    if (evt.target.tagName === "LI") {
        
        fetch(`http://localhost:3000/books/${evt.target.dataset.id}`)
        .then(res => res.json())
        .then(book => {
            showPanel.innerHTML += `<p>${book.title}</p>
            <img src= ${book.img_url} >
            <p>${book.description}</p>
            <p>${book.users.map(user => user.username)}
            <button id="like-button" data-id=${evt.target.dataset.id}> Like </button>`
        })

    }        showPanel.addEventListener("click", evt => {
        if (evt.target.tagName === "like-button") {
            fetch("http://localhost:3000/books/:id", {
                method: 'PATCH', 
                headers: {"Content-Type": "application/json",
                "Accept": "application/json"},
                body: JSON.stringify({})





        }




    
    
    
    
    }
            



                            


          



})