import axios from "axios";
import {FETCH_TASKS_SUCCESS} from "../constants/actionTypes";
import {BACK_IP, HOST_IP} from "../constants/WebConfig";

function fetchTasksSuccess(data) {
    return {
        type: FETCH_TASKS_SUCCESS,
        tasks: data,
        allTasks: data,
    }
}

export default function getAllTasks(jwt) {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json'
        }
    }
    return (dispatch) => {
        axios.get(`${BACK_IP}/api/tasks`, headers)
            .then(response => response.data)
            .then(data => dispatch(fetchTasksSuccess(data)))
            .catch(reason => console.log('getALlTasks action failed: ', reason))
    }
};