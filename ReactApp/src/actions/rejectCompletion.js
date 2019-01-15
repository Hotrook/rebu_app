import axios from "axios";
import {TASK_ACTION_SUCCESS} from "../constants/actionTypes";
import {BACK_IP, HOST_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";

function assignRejection(task) {
    return {
        type: TASK_ACTION_SUCCESS,
        task: task,
    }
}

export default function rejectCompletion(task, jwt) {
    return (dispatch) => {
        task.status = 'STARTED';


        const headers = {
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Accept': 'application/json'
            }
        }

        axios.put(`${BACK_IP}/api/tasks`, task, headers)
            .then(response => response.data)
            .then((data) => dispatch(assignRejection(data)))
            .then(() => dispatch(getAllTasks(jwt)))
            .catch(reason => console.log('rejectCompletion action failed: ', reason))
    }
};