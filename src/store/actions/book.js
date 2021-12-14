import axios from "axios";
import {FIRST_SELECT_CHANGE,
        SECOND_SELECT_CHANGE,
        INPUT_CHANGE_HANDLER,
        SUBMIT_HANDLER,
        DATA_FETCH,
        TOTAL_ITEMS_FETCH,
        PAGINATE,
        SHOW_INFO}
 from "./actionTypes";

 export function firstSelectChange(val) {
    return {
        type: FIRST_SELECT_CHANGE,
        select1: val
    }
}

export function secondSelectChange(val) {
    return {
        type: SECOND_SELECT_CHANGE,
        select2: val
    }
}

export function inputChangeHandler(val) {
    return {
        type: INPUT_CHANGE_HANDLER,
        input: val
    }
}

export function submitHandler() {
    return {
        type: SUBMIT_HANDLER
    }
}

export function searchResult() {
    return async (dispatch, getState) => {
        dispatch(submitHandler())

        let url = '';

        if (getState().defaultValue === 'all') {
            url = `https://www.googleapis.com/books/v1/volumes?q=${getState().book}&maxResults=30&orderBy=${getState().defaultSortType}&key=${getState().apiKey}`
        } else {
            url = `https://www.googleapis.com/books/v1/volumes?q=${getState().book}+subject:${getState().defaultValue}&maxResults=30&orderBy=${getState().defaultSortType}&key=${getState().apiKey}`
        }

        console.log(url)
        console.log(getState().defaultSortType)
        try {
            const response = await axios.get(url)
            const book = response.data.items
            const totalItems = response.data.totalItems

            dispatch(dataFetch(book, totalItems))
            dispatch(totalItemsFetch(totalItems))
            
        } catch (error) {
            console.log(error)
        }
    }
}

export function resultLoadMore() {
    return async (dispatch, getState) => {
        dispatch(submitHandler())

        let url = ''
        
        if (getState().defaultValue === 'all') {
            url = `https://www.googleapis.com/books/v1/volumes?q=${getState().book}&maxResults=30&startIndex=${getState().startIndex}&orderBy=${getState().defaultSortType}&key=${getState().apiKey}`
        } else {
            url = `https://www.googleapis.com/books/v1/volumes?q=${getState().book}+subject:${getState().defaultValue}&maxResults=30&startIndex=${getState().startIndex}&orderBy=${getState().defaultSortType}&key=${getState().apiKey}`
        }
        
        console.log(url);
        console.log(getState().result.rightSort);
        try {
            const response = await axios.get(url)
            const book = response.data.items

            dispatch(dataFetch(book))
            
        } catch (error) {
            console.log(error)
        }
    }
}

export function showInfo(img, category, description, authors) {
    return {
        type: SHOW_INFO,
        cardImage: img,
        cardCategory: category,
        cardDescription: description,
        cardAuthors: authors
    }
}

export function dataFetch(val) {
    return {
        type: DATA_FETCH,
        payData: val
    }
}

export function totalItemsFetch(val) {
    return {
        type: TOTAL_ITEMS_FETCH,
        totalData: val
    }
}

export function fetchBooks() {
    return resultLoadMore()
}

export function paginate(val) {
    return {
        type: PAGINATE,
        startIndex: val
    }
}