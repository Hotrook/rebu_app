import React, {Component} from 'react';
import {AsyncStorage, Button, ScrollView,} from 'react-native';
import t from "tcomb-form-native";
import {Divider} from "react-native-elements";
import styles from './SignInScreen.component.style'
import fetchUser from "../actions/auth/fetchUser";
import {connect} from "react-redux";
import deviceStorage from '../services/deviceStorage';
import axios from 'axios';
import {BACK_IP} from "../constants/WebConfig";


export class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            error: '',
            loading: false
        };

        this.loginUser = this.loginUser.bind(this);

    }


    loginUser() {
        const login = this.state.value.user
        const password = this.state.value.password
        console.log(login)
        console.log(password)

        this.setState({error: '', loading: true});

        // NOTE Post to HTTPS only in production
        axios.post(`${BACK_IP}/api/authenticate`, {
            username: login,
            password: password
        },)
            .then((response) => {
                this._signInAsync(response)
            })
            .catch((error) => {
                console.log(error);
                this.onLoginFail();
            });
    }

    onLoginFail() {
        this.setState({
            error: 'Login Failed',
            loading: false
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Form type={Login}
                      options={options}
                      ref={c => this._form = c}
                      value={this.state.value}
                      onChange={this.onFormChange}
                />
                <Button title="Sign in!" onPress={this.loginUser}/>
                <Divider style={styles.divider}/>
                <Button title='Create account' onPress={this.handleRegisterAction}/>
            </ScrollView>
        );
    }

    _signInAsync = async (response) => {
        console.debug(`Saving token: ${response.data.id_token}`)
        deviceStorage.saveKey("id_token", response.data.id_token)
        this.fetchUserInfo()
        if (response) {
            // this.props.fetchUser(value.user); TODO
            this.props.navigation.navigate('Main');
        }
    };

    handleRegisterAction = () => {
        this.props.navigation.navigate('Register');
    };

    onFormChange = value => {
        this.setState({value})
    };

    async fetchUserInfo() {
        const jwt = await AsyncStorage.getItem('id_token');
        const headers = {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json'
        };
        axios({
            method: 'GET',
            url: `${BACK_IP}/api/account`,
            headers: headers,
        })
            .then(async response => {
                console.log(`Received response: ${response.data.login}`)
                await AsyncStorage.setItem("user_info", response.data.login);
            })
            .catch((error) => {
                console.error(error)
            });
    }
}

const mapDispatchToProps = {
    fetchUser,
};

export default connect(null, mapDispatchToProps)(SignInScreen)

const Form = t.form.Form;

const Login = t.struct({
    user: t.String,
    password: t.String,
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: 'blue',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
};

const options = {
    auto: 'placeholders',
    fields: {
        user: {
            label: 'Username',
            error: 'Invalid value.'
        },
        password: {
            label: 'Password',
            error: 'Invalid value.',
            password: true,
            secureTextEntry: true
        },
    },
    stylesheet: formStyles,
};