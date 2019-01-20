import React, {Component} from 'react';
import {AsyncStorage, Button, ScrollView, StyleSheet,} from 'react-native';
import t from "tcomb-form-native";
import {Divider} from "react-native-elements";
import styles from './SignInScreen.component.style'
import getAllTasks from "../actions/getAllTasks";
import updateTasksList from "../actions/updateTasksList";
import fetchUser from "../actions/auth/fetchUser";
import {connect} from "react-redux";

export class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    constructor(){
        super();
        this.state = {
        }
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
                <Button title="Sign in!" onPress={this._signInAsync}/>
                <Divider style={styles.divider}/>
                <Button title='Create account' onPress={this.handleRegisterAction}/>
            </ScrollView>
        );
    }

    _signInAsync = async (event) => {
        event.preventDefault();
        let value = this._form.getValue();
        if(value){
            await AsyncStorage.setItem('userToken', value.user);
            this.props.fetchUser(value.user);
            this.props.navigation.navigate('Main');
        }
    };

    handleRegisterAction = () => {
        this.props.navigation.navigate('Register');
    };

    onFormChange = value => {
        this.setState({value})
    };
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