const URL = 'http://localhost:3000/books';
const list_Panel_Div = document.querySelector('#list-panel')
const list_UL = document.querySelector('#list-panel #list')
const show_Panel_Div = document.querySelector('#show-panel')
const checkout_Button = document.createElement('button')


// Get a list of books & render them http://localhost:3000/books
fetch(URL)
  .then(resp => resp.json())
  .then(books => {
    console.log(books)
    books.forEach(book => {
      list_UL.innerHTML +=
        `
        <li data-id = ${book.id}>${book.title}</li>
      `
    });
  })
  .catch(err => console.log(err.message))

// Be able to click on a book, you should see the book's title, thumbnail img,description and a list of users who have liked the book.

list_UL.addEventListener('click', event => {
  if(event.target.tagName === "LI"){

    let id  = event.target.dataset.id


    fetch('http://localhost:3000/books')
    .then(r => r.json())
    .then(books => {
      // console.log(books);
      // debugger
      books.forEach(book => {
        // console.log(book);
        // debugger
        if(book.id == id){
          // debugger
          users_list = []
          book.users.forEach(user => {
            console.log(user);
            // debugger
            users_list.push(user.username)
          })
          show_Panel_Div.innerHTML = ""
          show_Panel_Div.innerHTML += `
           <h3>${book.title}</h3>
          <img src = "${book.img_url}" alt= "${book.img_url}">
          <p>${book.description}</p>
          <h5>Users: ${users_list.join(", ")}</h5>
        
          `

          checkout_Button.textContent = "let pouros borrow book"
          document.body.append(checkout_Button)

          checkout_Button.addEventListener('click', event => {
            event.preventDefault()

            fetch(`http://localhost:3000/books/${id}`, {
              method: "PATCH",
              header: {
                "content-type":"application/json",
                "accept":"application/json"

              },
              body: JSON.stringify({ 
                "users":book.users.concat([{ "id": 1, "username": "pouros"}])

              })

            })
            .then(r => r.json())
            .then(data => {
              // debugger
              users_list.push("pouros")
              show_Panel_Div.innerHTML = ""
              show_Panel_Div.innerHTML += 
              `
              <h3>${book.title}</h3>
              <img src="${book.img_url}" alt="${book.img_url}">
              <p>${book.description}</p>
              <h5>Users: ${users_list.join(", ")}</h5>
              
              `


            })

          })








        }
      })
    })



  }
                         



})