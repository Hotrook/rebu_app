import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import tasks from './src/reducers/tasks/taskReducer';
import userTasks from './src/reducers/tasks/userTasksReducer';
import user from './src/reducers/auth/userReducer';
import taskDetailed from './src/reducers/tasks/taskDetailedReducer';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {crashReporter, loggingMiddleware} from "./src/middlewares/loggingMiddleware";
import deviceStorage from './src/services/deviceStorage';

const reducers = combineReducers({tasks, userTasks, user, taskDetailed});

const store = createStore(reducers, applyMiddleware(thunk, crashReporter, loggingMiddleware));

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            jwt: '',
            loading: false
        }
        this.newJWT = this.newJWT.bind(this);
        this.deleteJWT = deviceStorage.deleteJWT.bind(this);
        this.loadJWT = deviceStorage.loadJWT.bind(this);
        this.loadJWT();
    }

    newJWT(jwt){
        this.setState({
            jwt: jwt
        });
    }

    render() {
        if (this.state.loading && !this.props.skipLoadingScreen) {

            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else if (!this.state.jwt) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />            );
        } else {
            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <AppNavigator/>
                    </View>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({loading: false});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
