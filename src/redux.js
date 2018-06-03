const INCREASEMENT = 'INCREASEMENT'
const DECREASEMENT = 'DECREASEMENT'
const ODD_INCREASEMENT = 'ODD_INCREASEMENT'

const initStata = {
    num: 0
}

export function todoApp (state = initStata, action) {
    const {type} = action

    switch (type) {
        case INCREASEMENT:
            return {...state, num: state.num + 1}
        case DECREASEMENT:
            return {...state, num: state.num - 1}
        case ODD_INCREASEMENT:
            return {...state, num: state.num % 2 ? state.num + 1 : state.num}
        default:
            return state

    }
}

export function increasement () {
    return {
        type: INCREASEMENT
    }
}

export function decreasement () {
    return {
        type: DECREASEMENT
    }
}

export function odd_increasement () {
    return {
        type: ODD_INCREASEMENT
    }
}

export function async_add () {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increasement())
        }, 2000);
    }
}
