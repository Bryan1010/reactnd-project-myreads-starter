import React, { Component } from "react";

class SearchComponent extends Component {

  
  // const { book, onInputchange } = this.props;
  handleInputChange = (e) => {
    if (this.props.onInputChange) {
      e.preventDefault();
      this.props.onInputChange(e.target.value);
    }
  }

  render() {

    const { onInputChange } = this.props;

    return (
      <div className="search-books-input-wrapper">
        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

        <input type="text" placeholder="Search by title or author" onChange={(e) => { this.handleInputChange(e) }} />

      </div>
    );
  }
}

export default SearchComponent;