import React from 'react';
import {createStackNavigator} from 'react-navigation';
import SignInScreen from "./SignInScreen";
import RegisterScreen from "./RegisterScreen";

export default createStackNavigator({
    Auth: SignInScreen,
    Register: RegisterScreen,
});
