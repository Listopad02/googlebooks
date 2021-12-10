import React from "react";
import "./BookCard.css";

class BookCard extends React.Component {
    state = {
        modal: false,

    }

    toggle = () => {
        this.setState({
            modal: true
        })
    }

    render() {
        return (
            <div className="BookCard">
                <h1>Oops! We found nothing... please, try to find it in a different query</h1>
            </div>
        )
    }
}

export default BookCard;