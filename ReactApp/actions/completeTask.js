import axios from "axios";
import {TASK_ACTION_SUCCESS} from "../constants/actionTypes";
import {HOST_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";

function taskCompleted(task) {
    return {
        type: TASK_ACTION_SUCCESS,
        task: task
    }
}

export default function completeTask(task) {
    return (dispatch) => {
        task.progression.status = 'done';

        axios.put(`${HOST_IP}/tasks/${task.id}`, task)
            .then(response => response.data)
            .then((data) => dispatch(taskCompleted(data)))
            .then(() => dispatch(getAllTasks()))
            .catch(reason => console.log('completeTask action failed: ', reason))
    }
};