import axios from "axios";
import {TASK_ACTION_SUCCESS} from "../constants/actionTypes";
import {BACK_IP, HOST_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";

function assignSuccess(task) {
    return {
        type: TASK_ACTION_SUCCESS,
        task: task,
    }
}

export default function assignTask(task, user, jwt) {
    return (dispatch) => {
        task.status = 'STARTED'
        task.assignee = user

        const headers = {
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Accept': 'application/json'
            }
        }

        axios.put(`${BACK_IP}/api/tasks`, task, headers)
            .then(response => response.data)
            .then((data) => dispatch(assignSuccess(data)))
            .then(() => dispatch(getAllTasks(jwt)))
            .catch(reason => console.log('assignTask action failed: ', reason))
    }
};