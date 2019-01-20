import {FETCH_USER_SUCCESS} from "../../constants/actionTypes";

export const initialState = {
    user: null,
    balance: 0,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {
            return Object.assign({}, state, {
                ...state,
                user: action.user,
                balance: action.balance,
            });
        }
        default:
            return state;
    }
}