import {FETCH_TASKS_SUCCESS} from "../../constants/actionTypes";

export const initialState = {
    tasks: [], allTasks: [],
};

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS: {
            return Object.assign({}, state, {
                ...state,
                tasks: action.tasks,
                allTasks: action.allTasks,
            });
        }
        default:
            return state;
    }
}