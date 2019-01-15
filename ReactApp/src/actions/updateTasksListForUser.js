import {FETCH_USER_TASKS_SUCCESS} from "../constants/actionTypes";

function fetchTasksSuccess(newData, allData) {
    return {
        type: FETCH_USER_TASKS_SUCCESS,
        tasks: newData,
        allTasks: allData,
    }
}

export default function updateTasksListForUser(newList, allTasks) {
    return (dispatch) => {
        dispatch(fetchTasksSuccess(newList, allTasks))
    }
};