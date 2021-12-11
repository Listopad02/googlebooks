import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BooksList from './components/BooksList/BooksList';

class App extends React.Component {
  	render() {
    	return (
			<Layout>
				<BooksList />
			</Layout>
    	)
  	}
}

export default App;