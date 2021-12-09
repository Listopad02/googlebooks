import React from 'react';
import './App.css';
// import InputForm from './components/InputForm/InputForm';
import Select from './components/Select/Select';
import axios from 'axios';

class App extends React.Component {
  state = {
    defaultValue: 1,
    book: '',
    result: [],
    apiKey: 'AIzaSyBeXETly2VZZIBjImMz-7kSNsAUdu2EUhk' 
  }

  changeHandler = e => {
    this.setState({
      book: e.target.value
    })
    console.log(this.state.book)
  }

  submitHandler = e => {
    e.preventDefault();

    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.book + "&key=" + this.state.apiKey + "&maxResults=30")
    .then(data => {
      console.log(data.data.items)
      this.setState({
        result: data.data.items
      })
    })
  }

  selectChangeHandler = e => {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Online Google Library</h1>
          <div className="App-InputForm">
            <form onSubmit={this.submitHandler}>
                <input type="text" 
                       placeholder="Example: JavaScript" 
                       onChange={this.changeHandler}
                />
                <button type="submit" onClick={this.submitHandler}>Search</button>
            </form>
          </div>

          <div className="App-selects">
            <Select label="Category:"
                    value={this.state.defaultValue}
                    onChange={this.selectChangeHandler}
                    options={[
                      {text: 'all', value: 1},
                      {text: 'art', value: 2},
                      {text: 'biography', value: 3},
                      {text: 'computers', value: 4},
                      {text: 'history', value: 5},
                      {text: 'medical', value: 6},
                      {text: 'poetry', value: 7},
              ]} />
            <Select label="Sort by:"
                    value={this.state.defaultValue}
                    onChange={this.selectChangeHandler}
                    options={[
                      {text: 'relevance', value: 1},
                      {text: 'newest', value: 2}
            ]} />
          </div>
        </header>

        <main className="App-main">
          { this.state.result.map((book, i) => (
            <div className="App-main-container">
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
              <p>Category: {book.volumeInfo.categories}</p>
              <p>Title: {book.volumeInfo.title}</p>
              <p>Author: {book.volumeInfo.authors + ' '}</p>
            </div>
          )) }
        </main>
      </div>
    )
  }
}

export default App;
