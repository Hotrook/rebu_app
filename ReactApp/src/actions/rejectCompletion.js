import axios from "axios";
import {TASK_ACTION_SUCCESS} from "../constants/actionTypes";
import {HOST_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";

function assignRejection(task) {
    return {
        type: TASK_ACTION_SUCCESS,
        task: task,
    }
}

export default function rejectCompletion(task) {
    return (dispatch) => {
        task.progression.status = 'started';

        axios.put(`${HOST_IP}/tasks/${task.id}`, task)
            .then(response => response.data)
            .then((data) => dispatch(assignRejection(data)))
            .then(() => dispatch(getAllTasks()))
            .catch(reason => console.log('rejectCompletion action failed: ', reason))
    }
};