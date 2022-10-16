import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import Book from './Book';
import { Link, Route } from "react-router-dom";
import SearchComponent from './SearchComponent';


class BooksApp extends React.Component {
  state = {
    shelfs: [],
    books: [],
    queryBooks: []
  }

  componentDidMount(){
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {

      // get all bookshelfs
      var bookShelfs = new Set();

      books.forEach(book => {
        var shelf = book.shelf;

        if(!bookShelfs.has(shelf)){
          bookShelfs.add(shelf);
        }
      });

      this.setState(() => ({books, shelfs: Array.from(bookShelfs)}));
    });
  }


  changeBookShelf = (shelf, book) => {
    // update API
    BooksAPI.update(book, shelf);

    // update local state
    const tmpBook = this.state.books;

    const bookIdx = tmpBook.findIndex(b => b.id === book.id);
    if(bookIdx>=0){
      tmpBook[bookIdx].shelf = shelf;  
      this.setState({books: tmpBook})
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({history}) => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/' onClick={() => {history.push('/search'); this.getAllBooks();}}>Close</Link>
              <SearchComponent onInputChange={(searchTerm) => {
                if(searchTerm != null && searchTerm.length > 0){
                  BooksAPI.search(searchTerm).then((books) => {

                    if(books.error){
                      this.setState(() => ({queryBooks: []}));
                      return;
                    }

                    const tmpBookState = this.state.books;
                    var searchedBooks = books.map((qb) => {
                      const tmpBook = qb;
                      
                      const tmp = tmpBookState.find(bs => bs.id === qb.id);

                      tmpBook.shelf = tmp ? tmp.shelf : 'none';

                      return tmpBook;
                    })
            
                    this.setState(() => ({queryBooks: searchedBooks.filter(b => b.imageLinks)}));
            
                  });
                }
                else {
                  this.setState(() => ({queryBooks: []}));
                }
              }}/>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.state.queryBooks && this.state.queryBooks.length > 0 ?
                  this.state.queryBooks.map((book) => {
                      return(
                        
                        
                      <li key={book.id}>
                          <Book book={book} onChangeBookshelf={this.changeBookShelf}/>
                      </li>
                      )
                  })
                  :
                  <p style={{color: '#CCC'}}>No Results</p>
                }
              </ol>
            </div>
          </div>
        )} />

        <Route exact path='/' render={({history}) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  this.state.shelfs.map((shelf)=> {
                    var booksInShelf = this.state.books.filter(b => b.shelf === shelf);

                    return (<Bookshelf key={shelf} title={shelf} books={booksInShelf} onChangeBookshelf={this.changeBookShelf} />)
                  })
                }
                
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button onClick={() =>{ history.push('/');}}>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
