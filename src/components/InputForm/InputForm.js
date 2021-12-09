import './InputForm.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm() {
    const [book, setBook] = useState('');
    const [result, setResult] = useState([]);
    const [apiKey, setApiKey] = useState('AIzaSyBeXETly2VZZIBjImMz-7kSNsAUdu2EUhk'); 

    const changeHandler = e => {
        const book = e.target.value;
        setBook(book);
    }

    const submitHandler = e => {
        e.preventDefault();

        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + book + "&key=" + apiKey + '&maxResults=30')
        .then(data => {
            setResult(data.data.items);
        })
    }

    return (
        <div className="InputForm">
            <form onSubmit={submitHandler}>
                <input type="text" 
                       placeholder="Example: JavaScript" 
                       onChange={changeHandler}
                />
                <button type="submit" onClick={submitHandler}>Search</button>
            </form>
            { result.map(book => (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
            )) }
        </div>
    )
}