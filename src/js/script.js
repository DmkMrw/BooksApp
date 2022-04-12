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
        id: dataSource.books[book].id,
        ratingWidth: dataSource.books[book].rating * 10,
        ratingBgc: barColor

      };

      const generatedHTML = templates.templateBook(HTMLData);
      book = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(book);

      function barColor() {
        if (dataSource.books[book].rating < 6) {
          return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)'
        } else if (dataSource.books[book].rating > 6 && dataSource.books[book].rating <=8) {
            return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)'
        } else if (dataSource.books[book].rating > 8 && dataSource.books[book].rating <= 9) {
          return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)'
        } else if (dataSource.books[book].rating > 9) {
          return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'
        }
      }
    }
  }

  render();

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

    });

    document.querySelector(select.containerOf.filters).addEventListener('click', function (e) {
      if (e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter') {
        if (e.target.checked) {
          filters.push(e.target.value);
          console.log(filters);
        }
        else if (!e.target.checked) {
          const index = filters.indexOf(e.target.value);
          filters.splice(index, 1);
        }
      }
      hiddenBooks();
    });
  }

  function hiddenBooks() {
    for (let book of dataSource.books) {
      if (book.details.adults == true && filters.includes('adults')) {
        if (document.querySelector(select.containerOf.bookImg).getAttribute('data-id') == book.id) {
          document.querySelector(`[data-id="${book.id}"]`).classList.add('hidden');
        }

      } else if (book.details.adults == true && !filters.includes('adults')) {
        document.querySelector(`[data-id="${book.id}"]`).classList.remove('hidden');
      }

      let arr = [];

      if (book.details.nonFiction == true && filters.includes('nonFiction')) {
        arr.push(book.id);

        for (let one of arr) {
          document.querySelector(`[data-id="${one}"]`).classList.add('hidden');
        }
      } else if (book.details.nonFiction == true && !filters.includes('nonFiction')) {
        arr.push(book.id);
        for (let one of arr) {
          document.querySelector(`[data-id="${one}"]`).classList.remove('hidden');
        }
      }
    }

  }
  initActions();

}

