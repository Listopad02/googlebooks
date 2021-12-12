import React from "react";
import Select from "../Select/Select";
import Formsy from "formsy-react";
import axios from "axios";
import "./Header.css";
import { connect } from "react-redux"
import { FIRST_SELECT_CHANGE,
	SECOND_SELECT_CHANGE,
	INPUT_CHANGE_HANDLER,
	DATA_FETCH,
	SUBMIT_HANDLER } from "../../store/actions/actionTypes";

class Header extends React.Component {

    submitHandler = e => {

		if (this.props.defaultValue !== 'all') {
			axios.get("https://www.googleapis.com/books/v1/volumes?q="
						 + this.props.book + "+subject:"
						  + this.props.defaultValue + "&orderBy="
						   + this.props.defaultSortType + "&key="
						    + this.props.apiKey + "&maxResults=40")
			.then(data => this.props.dataFetch(data.data.items))
			.catch(error => {
				console.log(error);
			})
		} else {
			axios.get("https://www.googleapis.com/books/v1/volumes?q="
						 + this.props.book + "&orderBy="
						  + this.props.defaultSortType + "&key=" 
						   + this.props.apiKey + "&maxResults=40")
			.then(data => this.props.dataFetch(data.data.items))
			.catch(error => {
				console.log(error);
			})
		}
		
  	}

    render() {
        return (
            <div className="Header">
          			<h1>Online Google Library</h1>
          			<div className="Header-inputForm">
            			<Formsy onSubmit={this.submitHandler}>
                			<input type="text" 
                       		   	   placeholder="Example: JavaScript" 
                       		       onChange={e => this.props.inputChangeHandler(e.target.value)}
                			/>
                			<button type="submit" onClick={e => this.props.submitHandler(e.target.value)}>Search</button>
            			</Formsy>
          			</div>

          			<div className="Header-selects">
            			<Select label="Category:"
                    			value={this.props.defaultValue}
                    			onChange={e => this.props.selectChangeHandler(e.target.value)}
                    			options={[
                      				{text: 'all', value: 'all'},
                      				{text: 'art', value: 'art'},
                      				{text: 'biography', value: 'biography'},
                      				{text: 'computers', value: 'computers'},
                      				{text: 'history', value: 'history'},
                      				{text: 'medical', value: 'medical'},
                      				{text: 'poetry', value: 'poetry'},
              			]} />
            			<Select label="Sort by:"
                    			value={this.props.defaultSortType}
                    			onChange={e => this.props.secondSelectChangeHandler(e.target.value)}
                    			options={[
                      				{text: 'relevance', value: 'relevance'},
                      				{text: 'newest', value: 'newest'}
            			]} />
          			</div>
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
        selectChangeHandler: val => dispatch({type: FIRST_SELECT_CHANGE, select1: val}),
		secondSelectChangeHandler: val => dispatch({type: SECOND_SELECT_CHANGE, select2: val}),
		inputChangeHandler: val => dispatch({type: INPUT_CHANGE_HANDLER, input: val}),
		submitHandler: val => dispatch({type: SUBMIT_HANDLER, payload: val}),
		dataFetch: val => dispatch({type: DATA_FETCH, payData: val})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);