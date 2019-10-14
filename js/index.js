document.addEventListener("DOMContentLoaded", function() { addBooksListToListUl() })

const booksUl = document.querySelector('#list') 
const bookShowDiv = document.querySelector('#show-panel')
const userOne = { "id": 1, "username": "pouros" }


function getBooks() {
  return fetch('http://localhost:3000/books')
  .then(response => response.json())
}


function addBooksListToListUl() {
  getBooks()
  .then(booksList => {
    booksList.forEach(addBookLiToListUl)
  })
}


function addBookLiToListUl(book) {
  let bookLi = document.createElement('li')
  let bookTitleH3 = document.createElement('h3')

  bookTitleH3.innerText = book.title
  bookLi.append(bookTitleH3)
  bookLi.addEventListener('click', (event) => addBookViewToShowDiv(book))
  booksUl.append(bookLi)
}


function addBookViewToShowDiv(book){
  let bookImg = document.createElement('img')
  let bookDescriptionP = document.createElement('p')
  let likeButton = document.createElement('button')

  removeChildren(bookShowDiv)
  bookImg.src = book.img_url
  bookImg.alt = book.title
  bookDescriptionP.innerText = book.description
  book.users.includes(userOne) ? likeButton.innerText = 'Dislike 💔' : likeButton.innerText = 'Like ❤️'
  likeButton.addEventListener('click', (event) => {
    toggleBookLike(book)
  })
  bookShowDiv.append(bookImg, bookDescriptionP, likeButton)
  createUsersList(book)
}


function createUsersList(book) {
  let bookUsersUl = document.createElement('ul')
  
  book.users.forEach(user => {
    let bookUserLi = document.createElement('li')
    bookUserLi.innerText = user.username
    bookUsersUl.append(bookUserLi)
  }) 
  bookShowDiv.append(bookUsersUl)
}


function toggleBookLike(book) {

  if (book.users.includes(userOne)) {
    book.users = book.users.filter(user => user.id !== 1) 
  } else {
    book.users.push(userOne)
  }
  
    fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      users: book.users
    }),
  })
  .then(response => response.json())
  .then(updateBookShowDiv => {
    addBookViewToShowDiv(book)
  })
}


function removeChildren(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild)
  }
}


  

