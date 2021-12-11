import React from "react";
import "./BooksList.css";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { PAGINATE } from "../../store/actions/actionTypes";

class BooksList extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div className="BooksList">					
            {/* {
                this.props.result.length !== 0
                    ? <div className='Books-counter'><p>Books found: {this.state.result.length}</p></div>
                    : null
            }
            {
                this.props.loading 
                ? <Loader /> 
                : this.props.result.map((book, i) => {
                    if (i >= this.props.maxResults) {
                        return null
                    } return (
                        <div className="BooksList-container" key={i}>
                            <img src={book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
                            <p><b>Category:</b> {book.volumeInfo.categories || "None"}</p>
                            <p><b>Title:</b> {book.volumeInfo.title || "Not found"}</p>
                            <p><b>Author:</b> {book.volumeInfo.authors === undefined || null ? "Not found" : `${book.volumeInfo.authors + ' '}` || "Not found"}</p>
                        </div>
                    )})
            }
            {
                this.props.result.length === 0 || this.state.loading
                ? null
                : <button onClick={() => this.paginate(8)}>Show more</button>
            } */}
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
		maxResults: state.maxResults,
		apiKey: state.apiKey,
		result: state.result
    }
}

function mapDispatchToProps(dispatch) {
    return {
        paginate: () => dispatch({type: PAGINATE, val: 8})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);