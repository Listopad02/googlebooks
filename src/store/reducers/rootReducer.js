import { FIRST_SELECT_CHANGE,
		 SECOND_SELECT_CHANGE,
		 INPUT_CHANGE_HANDLER,
		 SUBMIT_HANDLER,
		 DATA_FETCH,
		 PAGINATE,
		 TOTAL_ITEMS_FETCH } from "../actions/actionTypes";

const initialState = {
	result: [],  
	apiKey: 'AIzaSyBeXETly2VZZIBjImMz-7kSNsAUdu2EUhk', 
	defaultValue: 'all',  
	defaultSortType: 'relevance', 
	book: '', 
	loading: false,
	totalItems: 0,
	startIndex: 0
}

export default function rootReducer(state = initialState, action) {
	switch(action.type) {
	case FIRST_SELECT_CHANGE:  
		return {
			...state,
			defaultValue: action.select1
		}
	case SECOND_SELECT_CHANGE:  
		return {
			...state,
			defaultSortType: action.select2
		}
	case INPUT_CHANGE_HANDLER:  
		return {
			...state, book: action.input
		}
	case SUBMIT_HANDLER:
		return {
			...state,
			loading: true,
		}
	case DATA_FETCH:
		return {
			...state,
			result: action.payData,
			loading: false
		} 
	case TOTAL_ITEMS_FETCH:
		return {
			...state,
			totalItems: +action.totalData,
			loading: false
		} 
	case PAGINATE:
		return {
			...state,
			startIndex: + action.val
		}
	default:
		return state;
	}
}