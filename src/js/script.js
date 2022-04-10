const select = {
     templateOf: {
          templateBook: '#template-book',
     },
          booksList: '.books-list'
}

const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    };


function render() {
     for (let book in dataSource.books) {

          const HTMLData = {
               name: dataSource.books[book].name,
               price: dataSource.books[book].price,
               rating: dataSource.books[book].rating,
               image: dataSource.books[book].image
          }

          const generatedHTML = templates.templateBook(HTMLData);
          book = utils.createDOMFromHTML(generatedHTML)
          const bookContainer = document.querySelector(select.booksList);
          bookContainer.appendChild(book);

     }
}

render()