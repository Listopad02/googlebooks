import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BooksList from './components/BooksList/BooksList';
import BookItem from './components/BookItem/BookItem';
import {Route, Routes} from 'react-router-dom';

class App extends React.Component {
  	render() {
    	return (
			<Layout>
				<Routes>
					<Route exact path="/" element={<BooksList />} />
					<Route path="/book/:id" element={<BookItem />} />
				</Routes>
			</Layout>
    	)
  	}
}

export default App;