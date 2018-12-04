import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewTaskScreen from '../screens/NewTaskScreen'
import MyTasksScreen from '../screens/MyTasksScreen'
import MapTasksScreen from '../screens/MapTasksScreen'
import TaskDetailsScreen from "../screens/TaskDetailsScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: TaskDetailsScreen,
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

const MapTasksStack = createStackNavigator({
   MapTasks: MapTasksScreen,
});

MapTasksStack.navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    MapTasksStack,
    NewTaskStack,
    MyTasksStack,
});
