import {TASK_ACTION_SUCCESS} from "../constants/actionTypes";

function showTaskSuccess(task) {
    return {
        type: TASK_ACTION_SUCCESS,
        task: task,
    }
}

export default function showTask(task) {
    return (dispatch) => {
        dispatch(showTaskSuccess(task))
    }
};