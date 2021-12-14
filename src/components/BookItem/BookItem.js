import React from "react";
import { connect } from "react-redux";
import "./BookItem.css";

class BookItem extends React.Component {
    render() {
        return (
            <div className="Wrapper">
                <div className="FirstLayer">
                    <img src={this.props.cardImage} alt="bookImg" />
                </div>
                <div className="SecondLayer">
                    <p>{this.props.cardCategory}</p>
                    <h2>{this.props.cardAuthors}</h2>
                    <p>{this.props.cardCategory}</p>
                    <div className="Description">
                        <p>{this.props.cardDescription}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cardImage: state.cardImage,
        cardCategory: state.cardCategory,
        cardDescription: state.cardDescription,
        cardAuthors: state.cardAuthors
    }
}

export default connect(mapStateToProps, null)(BookItem);