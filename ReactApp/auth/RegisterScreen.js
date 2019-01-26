import React, {Component} from 'react';
import {Button, ScrollView,} from 'react-native';
import t from "tcomb-form-native";
import styles from './RegisterScreen.component.style'
import {connect} from "react-redux";
import registerUser from "../actions/auth/registerUser";

export class RegisterScreen extends Component {
    static navigationOptions = {
        title: 'Create new account',
    };

    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Form type={Register}
                      options={options}
                      ref={c => this._form = c}
                      value={this.state.value}
                      onChange={this.onFormChange}
                />
                <Button title="Sign in!" onPress={this.registerNewUser}/>
            </ScrollView>
        );
    }

    registerNewUser = async (event) => {
        event.preventDefault();
        let value = this._form.getValue();
        if(value){
            this.props.registerUser({
                id: Math.floor(Math.random() * 10000000),
                user: value.user,
                password: value.password,
                email: value.email,
                balance: 200,//this should be added by backend,
            }, this.props.navigation);
        }
    };

    onFormChange = value => {
        this.setState({value})
    };
}

const mapDispatchToProps = {
    registerUser,
};

export default connect(null, mapDispatchToProps)(RegisterScreen)

const Form = t.form.Form;

const Register = t.struct({
    user: t.String,
    password: t.String,
    email: t.maybe(t.String),
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
        email: {
            label: 'E-mail',
            error: 'Invalid format.',
        }
    },
    stylesheet: formStyles,
};