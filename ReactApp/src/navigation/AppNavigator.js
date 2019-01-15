import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from "../auth/AuthLoadingScreen";
import AuthStackNavigator from '../auth/AuthStackNavigator';

export default createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        Main: MainTabNavigator,
        Auth: AuthStackNavigator,
        AuthLoading: AuthLoadingScreen,
    },
    {
        initialRouteName: 'AuthLoading'
    }
);