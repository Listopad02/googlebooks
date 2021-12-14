import React from "react";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { showInfo } from "../../store/actions/book";
import "./BookItem.css";

class BookItem extends React.Component {

    componentDidMount() {
        console.log(this.props)
        this.props.showInfo(this.props.match.params.id)
    }
    render() {
        console.log(this.props)
        return (
            <div>
                {
                    !this.props.result || this.props.result.length === 0 || this.props.result.volumeInfo === undefined
                        ? <Loader />
                        : <div className="Wrapper">
                            <div className="Item">
                                <img src={this.props.result.volumeInfo.imageLinks === undefined ? "" : `${this.props.result.volumeInfo.imageLinks.thumbnail}`} alt={this.props.result.volumeInfo.title} />
                            </div>
                            <div className="Item">
                                <p style={{color: "rgb(184, 182, 182)"}}>{this.props.result.volumeInfo.categories}</p>
                                <h2>{this.props.result.volumeInfo.title}</h2>
                                <p><u>{this.props.result.volumeInfo.authors.join(', ')}</u></p>
                                <div className="Description">
                                    <p>{this.props.result.volumeInfo.description}</p>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        result: state.result
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showInfo: val => dispatch(showInfo(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);