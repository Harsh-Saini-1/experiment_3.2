import React, { useState } from 'react';
import './App.css';

const initialBooks = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddBook = () => {
    if (newBookTitle && newBookAuthor) {
      const newBook = {
        id: Date.now(), // Unique ID for the new book
        title: newBookTitle,
        author: newBookAuthor,
      };
      setBooks([...books, newBook]);
      setNewBookTitle('');
      setNewBookAuthor('');
    }
  };

  const handleRemoveBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Library Management</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="add-book-form">
        <input
          type="text"
          placeholder="New book title"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New book author"
          value={newBookAuthor}
          onChange={(e) => setNewBookAuthor(e.target.value)}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <div className="book-list">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-item">
            <span className="book-info">
              <span className="book-title">{book.title}</span> by {book.author}
            </span>
            <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
          </div>
        ))}
        {filteredBooks.length === 0 && (
          <p className="no-results">No books found.</p>
        )}
      </div>
    </div>
  );
}

export default App;