import axios from "axios";
import {CREATION_TASK_SUCCESS} from "../constants/actionTypes";
import {HOST_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";

function creationSuccess() {
    return {
        type: CREATION_TASK_SUCCESS,
    }
}

export default function createTask(task, navigator) {
    return (dispatch) => {
        axios.post(`${HOST_IP}/tasks`, task)
            .then(() => dispatch(creationSuccess()))
            .then(() => dispatch(getAllTasks()))
            .then(() => navigator.navigate('Home'))
            .catch(reason => console.log('createTask action failed: ', reason))
    }
};