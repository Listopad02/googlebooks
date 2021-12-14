import "./BooksList.css";
import React from "react";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom';
import { fetchBooks, paginate, showInfo } from "../../store/actions/book"

class BooksList extends React.Component {

    paginateResult = () => {
        if (this.props.startIndex < this.props.totalItems) {
            this.renderBooks();
            return (
                (this.props.result && this.props.result.length !== 0 && this.props.result.length === 30)  && !this.props.loading
                ? <button className="Paginate-button" onClick={e => this.clickHandler(e)}>Show more</button>
                : null
            )
        }
    }

    clickHandler = e => {
        e.preventDefault();

        this.props.paginate(this.props.startIndex + 29);
        this.props.fetchBooks()
    }

    resultNumber = () => {
        if (this.props.result && this.props.result.length !== 0) {
            return (
                <div className='Books-counter'><p>Books found: {this.props.totalItems}</p></div>
            )
        }
    }



    renderBooks = () => {
        if (this.props.result && this.props.result.length !== 0) {
            return this.props.result.map((book, i) => (
                <NavLink to={'/book/' + book.id} className="BooksList-container">
                    <div key={i} 
                        onClick={e => this.props.showInfo(
                        e.currentTarget.children[0].getAttribute('src'),
                        e.currentTarget.children[1].children[0].children[0].innerHTML, 
                        e.currentTarget.children[1].children[1].innerHTML,
                        e.currentTarget.children[1].children[3].innerHTML)} >
                        <img src={book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
                        <div className="Container-body">
                            <p style={{color: 'gray'}}><u>{book.volumeInfo.categories || "None"}</u></p>
                            <p style={{display: 'none'}}>{book.volumeInfo.description || "Nothing"}</p>
                            <p><b>{book.volumeInfo.title || "Not found"}</b></p>
                            <p style={{color: 'gray'}}>{book.volumeInfo.authors === undefined || null ? "Not found" : `${book.volumeInfo.authors + ' '}` || "Not found"}</p>
                        </div>
                    </div>
                </NavLink>
                
            ))
        } else {
            return (
                <p>Oops! Seems like we found nothing... Please, try different query.</p>
            )
        }
    }

    render() {
        return (
                this.props.loading || this.props.books === []
                ? <Loader />
                : <div>
                    {this.resultNumber()}
                    <div className="BooksList">	
                        {this.renderBooks()}
                    </div>
                    {this.paginateResult()}  
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        book: state.book,
        defaultValue: state.defaultValue,
		defaultSortType: state.defaultSortType,
		loading: state.loading,
		apiKey: state.apiKey,
		result: state.result,
        totalItems: state.totalItems,
        startIndex: state.startIndex,
        cardImage: state.cardImage,
        cardCategory: state.cardCategory,
        cardDescription: state.cardDescription,
        cardAuthors: state.cardAuthors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        paginate: val => dispatch(paginate(val)),
        fetchBooks: () => dispatch(fetchBooks()),
        showInfo: (img, category, description, authors) => dispatch(showInfo(img, category, description, authors))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);