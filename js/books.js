document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const booksContainer = document.getElementById('books-container');
    const paginationContainer = document.getElementById('pagination');
    const switchInputs = document.querySelectorAll('.switch__input');
    const itemsPerPage = 8;
    let currentPage = 1;
    let booksData = [];
    let filteredBooksData = [];

    const filterBooks = () => {
        const filterValue = document.querySelector('.switch__input:checked').value;

        if (filterValue === 'title') {
            filteredBooksData = [...booksData];
        } else if (filterValue === 'author') {
            filteredBooksData = booksData.filter(book => book.id % 2 === 0);
        }
    };

    const renderBooks = (page = 1) => {
        booksContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const booksToRender = filteredBooksData.slice(start, end);

        if (booksToRender.length === 0) {
            booksContainer.innerHTML = `<p>⚠ Данных для отображения на этой странице нет.</p>`;
            return;
        }

        booksToRender.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <img src="${book.thumbnailUrl || 'https://via.placeholder.com/150'}" alt="${book.title}" class="book-item__image" loading="lazy">
                <h3>${book.title}</h3>
                <p>ID: ${book.id}</p>
            `;
            bookItem.dataset.id = book.id;
            fragment.appendChild(bookItem);
        });

        booksContainer.appendChild(fragment);
    };

    const renderPagination = () => {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredBooksData.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.className = `pagination__button ${i === currentPage ? 'active' : ''}`;
            button.addEventListener('click', () => {
                currentPage = i;
                renderBooks(currentPage);
                renderPagination();
            });
            paginationContainer.appendChild(button);
        }
    };

    switchInputs.forEach(input => {
        input.addEventListener('change', () => {
            currentPage = 1;
            filterBooks();
            renderBooks(currentPage);
            renderPagination();
        });
    });

    const loadBooks = async () => {
        preloader.style.display = 'block';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=100');
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            booksData = await response.json();
            filterBooks();
            renderBooks(currentPage);
            renderPagination();
        } catch (error) {
            booksContainer.innerHTML = `<p>⚠ Ошибка: ${error.message}</p>`;
        } finally {
            preloader.style.display = 'none';
        }
    };

    booksContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.book-item');
        if (!card) return;

        const bookId = card.dataset.id;
        const book = booksData.find(b => b.id == bookId);

        Swal.fire({
            title: book.title,
            text: `ID книги: ${book.id}\nОписание книги отсутствует`,
            imageUrl: book.thumbnailUrl,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: book.title,
            confirmButtonText: 'Закрыть',
            customClass: {
                popup: 'swal-popup',
                title: 'swal-title',
                htmlContainer: 'swal-text',
                confirmButton: 'swal-confirm-button',
            },
            background: '#ffffff',
            buttonsStyling: false,
        });
    });

    loadBooks();
});