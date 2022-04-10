{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      bookImg: '.book__image'
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const app = {
    init: render(),
    addFavorive: initActions(),
  };

  function render() {
    for (let book in dataSource.books) {

      const HTMLData = {
        name: dataSource.books[book].name,
        price: dataSource.books[book].price,
        rating: dataSource.books[book].rating,
        image: dataSource.books[book].image,
        id: dataSource.books[book].id
      };

      const generatedHTML = templates.templateBook(HTMLData);
      book = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(book);

    }
  }

  function initActions() {
    let favoriteBooks = [];
    const booksImage = document.querySelectorAll(select.containerOf.bookImg);

    for (let bookImage of booksImage) {
      bookImage.addEventListener('dblclick', function (e) {
        e.preventDefault();

        if (!(favoriteBooks.includes(bookImage.getAttribute('data-id')))) {
          favoriteBooks.push(bookImage.getAttribute('data-id'));
          bookImage.classList.add('favorite');
        } else {
          bookImage.classList.remove('favorite');
          const bookIndex = favoriteBooks.indexOf(bookImage.getAttribute('data-id'));
          favoriteBooks.splice(bookIndex, 1);
        }
        console.log(favoriteBooks);

      });
    }
  }

}

