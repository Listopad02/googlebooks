import { FIRST_SELECT_CHANGE,
		 SECOND_SELECT_CHANGE,
		 INPUT_CHANGE_HANDLER,
		 SUBMIT_HANDLER,
		 DATA_FETCH,
		 PAGINATE } from "../actions/actionTypes";

const initialState = {
    defaultValue: 'all',
	defaultSortType: 'relevance',
	book: '',
	result: [],
	apiKey: 'AIzaSyBeXETly2VZZIBjImMz-7kSNsAUdu2EUhk',
	maxResults: 10,
	loading: false
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
		case FIRST_SELECT_CHANGE:
			return {
				defaultValue: action.val
			}
		case SECOND_SELECT_CHANGE:
			return {
				defaultSortType: action.val
			}
		case INPUT_CHANGE_HANDLER:
			return {
				book: action.val
			}
		case SUBMIT_HANDLER:
			return {
				loading: true,
				maxResults: 8
			}
		case DATA_FETCH:
			return {
				result: action.val,
				loading: false
			} 
		case PAGINATE:
			return {
				maxResults: state.maxResults + action.val
			}
		default:
			return state;
	}
}