function getAllBooks() {
    fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then(data => {
            createBookList(data);
        })
}
function createBookList(data) {
    const bookList = select('ul#list')
    for (let i of data) {
        const bookLi = create("li")
        bookLi.innerText = i.title
        bookLi.addEventListener('click', () => showBookDetails(b))
        bookList.append(bookLi)
    }
}
function showBookDetails(book) {
    const bookDisplay = select("#show-panel")
    const selectedBook = create('card')
    const title = create("h1")
    title.innerText = book.title
    const subtitle = create('h3')
    subtitle.innerText = book.subtitle
    const thumbnail = create('img')
    thumbnail.src = book.img_url
    const description = create('p')
    description.innerText = book.description
    const likeBtn = create('button')
    likeBtn.innerText = "Like this book!"
    const likesList = create('ul')
    likeBtn.addEventListener("click", () => handleLikedBook(book, likesList))
    book.users.forEach(user => {
        const username = create('li')
        username.textContent = `${user.username} liked this!`
        likesList.append(username)
    })
    selectedBook.append(title, subtitle, thumbnail, description, likesList, likeBtn)
    bookDisplay.innerHTML = ""
    bookDisplay.append(selectedBook)
}

function handleLikedBook(book, likesList) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "users": [...book.users, { "id": 11, "username": "mark" }]
        })
    })
        .then(res => res.json())
        .then(data => updateLikedUsers(data, likesList))
}

function updateLikedUsers(data, likesList){
    console.log(data)
    likesList.innerHTML = '';
    data.users.forEach(user => {
        const username = create('li')
        username.textContent = `${user.username} liked this!`
        likesList.append(username)
    })
}
function create(element) { return document.createElement(element) }
function select(element) { return document.querySelector(element) }

document.addEventListener("DOMContentLoaded", function () {

    getAllBooks();
})
