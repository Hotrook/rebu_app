import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewTaskScreen from '../screens/NewTaskScreen'
import MyTasksScreen from '../screens/MyTasksScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Task Browser',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

const NewTaskStack = createStackNavigator({
    NewTask: NewTaskScreen,
});

NewTaskStack.navigationOptions = {
    tabBarLabel: 'Create Task',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        />
    ),
};

const MyTasksStack = createStackNavigator({
    MyTasks: MyTasksScreen,
});

MyTasksStack.navigationOptions = {
    tabBarLabel: 'My Tasks',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    NewTaskStack,
    MyTasksStack,
});
