import axios from "axios";
import {CREATION_TASK_SUCCESS} from "../constants/actionTypes";
import {BACK_IP} from "../constants/WebConfig";
import getAllTasks from "./getAllTasks";
import fetchUser from "./auth/fetchUser";

function creationSuccess() {
    return {
        type: CREATION_TASK_SUCCESS,
    }
}

export default function createTask(task, navigator, user, jwt) {
    console.log('create task for user', user);
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json'
        }
    }

    return (dispatch) => {
        axios.post(`${BACK_IP}/api/tasks`, task, headers)
            .then(() => dispatch(creationSuccess()))
            .then(() => dispatch(getAllTasks()))
            .then(() => dispatch(fetchUser(user)))
            .then(() => navigator.navigate('Home'))
            .catch(reason => console.log('createTask action failed: ', reason))
    }
};