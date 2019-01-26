import {REGISTER_SUCCESS} from "../../constants/actionTypes";
import axios from "axios";
import {HOST_IP} from "../../constants/WebConfig";

function fetchRegisterSuccess() {
    return {
        type: REGISTER_SUCCESS,
    }
}

export default function registerUser(user, navigation) {
    return (dispatch) => {
        axios.post(`${HOST_IP}/users`, user)
            .then(() => dispatch(fetchRegisterSuccess()))
            .then(() => navigation.navigate('Auth'))
            .catch(reason => console.log('register action failed: ', reason))
    }
};