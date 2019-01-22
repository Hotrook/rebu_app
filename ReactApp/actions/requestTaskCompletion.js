import axios from "axios";
import {TASK_ACTION_SUCCESS} from "../constants/actionTypes";
import {HOST_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";

function requestCompleted(task) {
    return {
        type: TASK_ACTION_SUCCESS,
        task: task,
    }
}

export default function requestCompletion(task) {
    return (dispatch) => {
        task.progression.status = 'review';

        axios.put(`${HOST_IP}/tasks/${task.id}`, task)
            .then(response => response.data)
            .then((data) => dispatch(requestCompleted(data)))
            .then(() => dispatch(getAllTasks()))
            .catch(reason => console.log('requestCompletion action failed: ', reason))
    }
};