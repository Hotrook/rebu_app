import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View,} from 'react-native';
import fetchUser from "../actions/auth/fetchUser";
import connect from "react-redux/es/connect/connect";
import {SignInScreen} from "./SignInScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('[LOADING SCREEN]', userToken);
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if(userToken){
            this.props.fetchUser(userToken);
            this.props.navigation.navigate('Main');
        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const mapDispatchToProps = {
    fetchUser,
};

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)