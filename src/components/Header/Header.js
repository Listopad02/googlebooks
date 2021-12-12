// import axios from "axios";
import React from "react";
import Select from "../Select/Select";
import Formsy from "formsy-react";
import "./Header.css";
import { connect } from "react-redux"
import { firstSelectChange,
		 secondSelectChange,
		 inputChangeHandler,
		 searchResult,
		 dataFetch,
		 totalItemsFetch } from "../../store/actions/book";

class Header extends React.Component {

    render() {
        return (
            <div className="Header">
          			<h1>Online Google Library</h1>
          			<div className="Header-inputForm">
            			<Formsy onSubmit={e => this.props.searchResult()}>
                			<input type="text" 
                       		   	   placeholder="Example: JavaScript" 
                       		       onChange={e => this.props.inputChangeHandler(e.target.value)}
                			/>
                			<button type="submit" onClick={e => this.props.searchResult()}>Search</button>
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
		apiKey: state.apiKey,
		result: state.result,
		startIndex: state.startIndex
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectChangeHandler: val => dispatch(firstSelectChange(val)),
		secondSelectChangeHandler: val => dispatch(secondSelectChange(val)),
		inputChangeHandler: val => dispatch(inputChangeHandler(val)),
		searchResult: () => dispatch(searchResult()),
		dataFetch: val => dispatch(dataFetch(val)),
		totalItemsFetch: val => dispatch(totalItemsFetch(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);