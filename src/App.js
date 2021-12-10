import React from 'react';
import './App.css';
import Select from './components/Select/Select';
import axios from 'axios';
import Loader from './components/Loader/Loader';

class App extends React.Component {
	state = {
		defaultValue: 'all',
		defaultSortType: 'relevance',
		book: '',
		result: [],
		apiKey: 'AIzaSyBeXETly2VZZIBjImMz-7kSNsAUdu2EUhk',
		maxResults: 8,
		loading: false,
	}

	changeHandler = e => {
		this.setState({
			book: e.target.value
		})
		console.log(this.state.book)
	}

	submitHandler = e => {
		e.preventDefault();
		this.setState({
			loading: true,
			maxResults: 8
		})

		axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.book + "&orderBy=" + this.state.defaultSortType + "&key=" + this.state.apiKey + "&maxResults=40")
		.then(data => {
			console.log(data.data.items)
    		this.setState({
        		result: data.data.items,
        		loading: false
      		})
    	})
		.catch(error => {
			console.log(error);
		})
  	}

	selectChangeHandler = e => {
    	this.setState({
			defaultValue: +e.target.value
		})
  	}

	secondSelectChangeHandler = e => {
		this.setState({
			defaultSortType: e.target.value
		})
	}

  	pagination = () => {
    	this.setState({
      		maxResults: this.state.maxResults + 8
    	})
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
                    			value={this.state.defaultSortType}
                    			onChange={this.secondSelectChangeHandler}
                    			options={[
                      				{text: 'relevance', value: 'relevance'},
                      				{text: 'newest', value: 'newest'}
            			]} />
          			</div>
        		</header>

        		<main className="App-main">
					{
						this.state.result.length === 0
						? null
						: <div className='Books-counter'><p>Books found: {this.state.result.length}</p></div>
					}
					{
						this.state.loading 
						? <Loader />
						: this.state.result.map((book, i) => {
							if (i >= this.state.maxResults) {
							return null
							} return (
							<div className="App-main-container" key={i}>
							<img src={book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
							<p><b>Category:</b> {book.volumeInfo.categories}</p>
							<p><b>Title:</b> {book.volumeInfo.title}</p>
							<p><b>Author:</b> {book.volumeInfo.authors + ' '}</p>
							</div>
						)}) 
					}
					{
						this.state.result.length === 0 || this.state.loading
						? null
						: <button onClick={this.pagination}>Show more</button>
					}
        		</main>
      		</div>
    	)
  	}
}

export default App;
