import axios from "axios";
import {FETCH_USER_TASKS_SUCCESS} from "../constants/actionTypes";
import {BACK_IP, HOST_IP} from "../constants/WebConfig";

function fetchTasksSuccess(data) {
    return {
        type: FETCH_USER_TASKS_SUCCESS,
        tasks: data,
        allTasks: data,
    }
}

export default function getAllTasksForUser(user, jwt) {
    console.log('get tasks for user', user);
    const headers = {
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
    };
    return (dispatch) => {
        // axios.get(`${HOST_IP}/tasks`, {params: {owner: user}})
        //     .then(response => response.data)
        //     .then(data => dispatch(fetchTasksSuccess(data)))
        //     .catch(reason => console.log('getAllTasksForUser action failed: ', reason))

        axios({
            method: 'GET',
            url: `${BACK_IP}/api/tasks?owner.equals=${user}`,
            headers: headers,
        })
            .then(response => response.data)
            .then(data => dispatch(fetchTasksSuccess(data)))
            .catch(reason => console.log('getAllTasksForUser action failed: ', reason))
    }
};