import React, {Component} from "react";
import Book from './Book';

class Bookshelf extends Component {
    
    getBookshelfName(title){
        switch(title){
            case 'currentlyReading':
                return 'Currently Reading';
            case 'wantToRead':
                return 'Want to Read';
            case 'read':
                return 'Read';
            default: 
                return title;
        }
    }
    
    render() {
        const { title, books, onChangeBookshelf } =  this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.getBookshelfName(title)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book) => {
                                return(
                                <li key={book.id}>
                                    <Book book={book} onChangeBookshelf={onChangeBookshelf}/>
                                </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;