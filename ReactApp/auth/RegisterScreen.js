import React, {Component} from 'react';
import {Button, ScrollView,} from 'react-native';
import t from "tcomb-form-native";
import styles from './RegisterScreen.component.style'

export default class RegisterScreen extends Component {
    static navigationOptions = {
        title: 'Create new account',
    };

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
            this.props.navigation.navigate('Auth');
        }
    };

    onFormChange = value => {
        this.setState({value})
    };
}

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