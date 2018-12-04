import axios from "axios";
import {CREATION_TASK_SUCCESS} from "../constants/actionTypes";
import {HOST_IP} from "../constants/WebConfig";

function creationSuccess() {
    return {
        type: CREATION_TASK_SUCCESS,
    }
}

export default function createTask(task) {
    return (dispatch) => {
        axios.post(`${HOST_IP}/tasks`, task)
            .then(() => dispatch(creationSuccess()))
            //.then(() => dispatch(getAllTasks()))
            .catch(reason => console.log('createTask action failed: ', reason))
    }
};