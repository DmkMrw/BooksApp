{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      bookImg: '.book__image',
      filters: '.filters'
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const filters = [];

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
    document.querySelector(select.containerOf.booksList).addEventListener('dblclick', function(e) {
      e.preventDefault();
      console.log(e.target.offsetParent);

      if (!(favoriteBooks.includes(e.target.offsetParent.getAttribute('data-id'))) && e.target.offsetParent.classList.contains('book__image')) {
        favoriteBooks.push(e.target.offsetParent.getAttribute('data-id'));
        e.target.offsetParent.classList.add('favorite');
      }
      else if ((favoriteBooks.includes(e.target.offsetParent.getAttribute('data-id'))) && e.target.offsetParent.classList.contains('book__image')) {
        e.target.offsetParent.classList.remove('favorite');
        const bookIndex = favoriteBooks.indexOf(e.target.offsetParent.getAttribute('data-id'));
        favoriteBooks.splice(bookIndex, 1);
      }
      console.log(favoriteBooks);

    });

    document.querySelector(select.containerOf.filters).addEventListener('click', function (e) {
      if (e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter') {
        console.log('target val', e.target.value);
        if (e.target.checked) {
          filters.push(e.target.value);
        }
        else if (!e.target.checked) {
          const index = filters.indexOf(e.target.value);
          console.log(index);
          filters.splice(index, 1);
        }
      }

    });
  }

  render();
  initActions();

}

