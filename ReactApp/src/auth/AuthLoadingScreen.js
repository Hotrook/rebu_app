import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View,} from 'react-native';
import fetchUser from "../actions/auth/fetchUser";
import connect from "react-redux/es/connect/connect";
import {Constants, Location, Permissions} from "expo";

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
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.error('PERMISSSIONS not granted. App will not work properly.');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            console.log("test2")
        }
        const userToken = await AsyncStorage.getItem('id_token');
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