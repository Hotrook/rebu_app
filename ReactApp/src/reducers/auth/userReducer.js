import {FETCH_USER_SUCCESS} from "../../constants/actionTypes";
import {AsyncStorage} from 'react-native';

export const initialState = {
    user: null,
    balance: 0,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {
            if (action.user.sessionId) {
                AsyncStorage.getItem('user_info', action.user.sessionId);
            }
            if (action.user.id) {
                AsyncStorage.setItem('userId', action.user.id);
            }
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