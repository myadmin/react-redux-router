import axios from 'axios';

const GET_BOOK_LIST = 'GET_BOOK_LIST';
const ERROR_MSG = 'ERROR_MSG';
const BOOK_CATEGORT_LIST = 'BOOK_CATEGORT_LIST';
const BOOK_READ_INFO = 'BOOK_READ_INFO';
const BOOK_CONTENT = 'BOOK_CONTENT';
const BOOK_TYPE_LIST = 'BOOK_TYPE_LIST';
const FETCH_START = 'FETCH_START';

const initStata = {
    bookList: null,
    categoryList: [],
    readerContent: null,
    bookContent: null,
    bookCatalog: [],
    iNow: -1
};

export function reader (state = initStata, action) {
    const {type} = action;

    switch (type) {
        case FETCH_START:
            return {...state, bookContent: null};
        case GET_BOOK_LIST:
            return {...state, bookList: {...action.payload}};
        case ERROR_MSG:
            return {...state, msg: action.msg};
        case BOOK_CATEGORT_LIST:
            return {...state, categoryList: [...action.list]};
        case BOOK_READ_INFO:
            return {...state, readerContent: {...action.content}};
        case BOOK_CONTENT:
            return {...state, bookContent: {...action.content}, iNow: action.num};
        case BOOK_TYPE_LIST:
            return {...state, bookCatalog: [...action.payload]};
        default:
            return state;
    }
}

function bookList (data) {
    return {
        type: GET_BOOK_LIST,
        payload: data
    }
}

function bookCategoryList (list) {
    return {
        type: BOOK_CATEGORT_LIST,
        list
    }
}

function bookReadInfo (content) {
    return {
        type: BOOK_READ_INFO,
        content
    }
}

function bookContent (content, num) {
    return {
        type: BOOK_CONTENT,
        content,
        num
    }
}

function errorMsg (msg) {
    return {
        type: ERROR_MSG,
        msg
    }
}

function typeList (data) {
    return {
        type: BOOK_TYPE_LIST,
        payload: data
    }
}

function fetchStart () {
    return {
        type: FETCH_START
    }
}

export function getBookList () {
    return (dispatch, getState) => {
        let list = getState().reader.bookList;

        if (list) {
            dispatch(bookList(list))
        } else {
            axios.get('http://novel.juhe.im/categories')
                .then(res => {
                    if (res.status === 200 && res.data.ok) {
                        dispatch(bookList(res.data))
                    } else {
                        dispatch(errorMsg(res.data.msg))
                    }
                });
        }
    }
}

export function getCategoryList (type) {
    return (dispatch, getState) => {
        let url = `http://novel.juhe.im/category-info?type=hot&major=${type}&start=0&limit=20`;

        axios.get(url)
            .then(res => {
                if (res.status === 200 && res.data.ok) {
                    dispatch(bookCategoryList(res.data.books));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            });
    }
}

export function getBookInfo (id) {
    return dispatch => {
        let url = `http://novel.juhe.im/book-info/${id}`;

        axios.get(url)
            .then(res => {
                if (res.status === 200 && res.statusText === 'OK') {
                    dispatch(bookReadInfo(res.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export function getBook (id, type = true) {
    return (dispatch, getState) => {
        dispatch(fetchStart());

        let bookCatalog = getState().reader.bookCatalog;
        let num = getState().reader.iNow;
        if (type) {
            num++;
        } else {
            num--;
        }
        if (bookCatalog.length) {
            let url3 = `http://novel.juhe.im/chapters/${encodeURIComponent(bookCatalog[num].link)}`;
            axios.get(url3)
                .then(result => {
                    // console.log(result);
                    if (result.status === 200 && result.statusText === 'OK') {
                        dispatch(bookContent(result.data, num));
                    }
                });
        } else {
            getContent(id, (data) => {
                let url3 = `http://novel.juhe.im/chapters/${encodeURIComponent(data.chapters[num].link)}`;
                axios.get(url3)
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200 && result.statusText === 'OK') {
                            dispatch(bookContent(result.data, num));
                        }
                    });

                dispatch(typeList(data.chapters));
            })
        }
    }
}

export function getBookTypeList (id) {
    return dispatch => getContent(id, (data) => {
        dispatch(typeList(data.chapters));
    });
}

function getContent (id, callback) {
    let url = `http://novel.juhe.im/book-sources?view=summary&book=${id}`;
    axios.get(url)
        .then(res => {
            if (res.status === 200 && res.statusText === 'OK') {
                const links = res.data.filter(v => v.host.indexOf('vip') > -1);
                let url2 = `http://novel.juhe.im/book-chapters/${links[0]._id}`;
                axios.get(url2)
                    .then(response => {
                        if (response.status === 200 && response.statusText === 'OK') {
                            callback(response.data);
                        }
                    });
            }
        });
}
