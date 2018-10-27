import React from "react";
import { Link } from "react-router-dom";
import "./AddAuthorForm.css";

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      books: [],
      bookTemp: ""
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  handleAddBook(event) {
    this.setState({
      books: this.state.books.concat([this.state.bookTemp]),
      bookTemp: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="AddAuthor__input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onFieldChange}
          />
        </div>
        <div className="AddAuthor__input">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.onFieldChange}
          />
        </div>
        <div className="AddAuthor__input">
          <label htmlFor="bookTemp">Books</label>
          <input
            type="text"
            name="bookTemp"
            value={this.state.bookTemp}
            onChange={this.onFieldChange}
          />
          <input
            className="btn-dark"
            type="submit"
            value="+"
            onClick={this.handleAddBook}
          />
          {this.state.books.map(book => (
            <p key={book}>{book}</p>
          ))}
        </div>
        <input
          className="btn-outline-dark "
          type="submit"
          value="Add Author to Quiz"
        />
      </form>
    );
  }
}

/**
 *
 *
 * @param {*} { match, onAddAuthor }
 * @returns a div wrapped component author form
 */
function AddAuthorForm({ match, onAddAuthor }) {
  return (
    <div className="AddAuthor">
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor} />
      <p>
        <Link to="/">Return to Author Quiz </Link>
      </p>
    </div>
  );
}

export default AddAuthorForm;
