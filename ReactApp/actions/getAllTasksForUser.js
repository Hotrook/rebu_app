import axios from "axios";
import {FETCH_USER_TASKS_SUCCESS} from "../constants/actionTypes";
import {HOST_IP} from "../constants/WebConfig";

function fetchTasksSuccess(data) {
    return {
        type: FETCH_USER_TASKS_SUCCESS,
        tasks: data,
        allTasks: data,
    }
}

export default function getAllTasksForUser(user) {
    console.log('get tasks for user', user);
    return (dispatch) => {
        axios.get(`${HOST_IP}/tasks`, {params: {owner: user}})
            .then(response => response.data)
            .then(data => dispatch(fetchTasksSuccess(data)))
            .catch(reason => console.log('getALlTasks action failed: ', reason))
    }
};