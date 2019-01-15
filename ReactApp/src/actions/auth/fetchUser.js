import {FETCH_USER_SUCCESS} from "../../constants/actionTypes";
import axios from "axios";
import {HOST_IP} from "../../constants/WebConfig";

function fetchUserSuccess(data) {
    console.log(data);
    return {
        type: FETCH_USER_SUCCESS,
        user: data.user,
        balance: data.balance,
    }
}

export default function fetchUser(user) {
    return (dispatch) => {
        axios.get(`${HOST_IP}/users`, {params: {user: user}})
            .then(response => response.data[0])
            .then(data => dispatch(fetchUserSuccess(data)))
            .catch(reason => console.log('getALlTasks action failed: ', reason))
    }
};