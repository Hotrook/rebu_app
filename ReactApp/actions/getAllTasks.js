import axios from "axios";
import {FETCH_TASKS_SUCCESS} from "../constants/actionTypes";

function fetchTasksSuccess(data) {
    console.log("success", data);
    return {
        type: FETCH_TASKS_SUCCESS,
        tasks: data,
        allTasks: data,
    }
}

export default function getAllTasks() {
    return (dispatch) => {
        axios.get(`http://192.168.2.103:3000/tasks`)
            .then(response => response.data)
            .then(data => dispatch(fetchTasksSuccess(data)))
            .catch(reason => console.log('getALlTasks action failed: ', reason))
    }
};