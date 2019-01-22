import {TASK_ACTION_SUCCESS} from "../../constants/actionTypes";

export const initialState = {
    task: null,
};

export default function taskDetailReducer(state = initialState, action) {
    switch (action.type) {
        case TASK_ACTION_SUCCESS: {
            return Object.assign({}, state, {
                ...state,
                task: action.task,
            });
        }
        default:
            return state;
    }
}