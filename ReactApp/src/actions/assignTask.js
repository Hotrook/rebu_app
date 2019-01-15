import axios from "axios";
import {TASK_ACTION_SUCCESS} from "../constants/actionTypes";
import {HOST_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";

function assignSuccess(task) {
    return {
        type: TASK_ACTION_SUCCESS,
        task: task,
    }
}

export default function assignTask(task, user) {
    return (dispatch) => {
        task.progression = {
            status: 'started',
            assignee: user,
        };

        axios.put(`${HOST_IP}/tasks/${task.id}`, task)
            .then(response => response.data)
            .then((data) => dispatch(assignSuccess(data)))
            .then(() => dispatch(getAllTasks()))
            .catch(reason => console.log('assignTask action failed: ', reason))
    }
};