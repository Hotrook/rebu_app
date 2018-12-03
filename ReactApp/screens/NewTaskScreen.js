import React from 'react';
import {ScrollView, TouchableHighlight, Text} from 'react-native';
import t from 'tcomb-form-native';
import styles from './NewTaskScreen.component.style.js'

export default class NewTaskScreen extends React.Component {
    static navigationOptions = {
        title: 'Create New Tasks',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Form type={Task}
                      options={options}
                      ref="form"/>
                <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }

    handleSubmit = () => {
        let value = this.refs.form.getValue();
        console.log("value", this.refs.form.getValue());
        if (value) { // if validation fails, value will be null
            console.log(value);
            //TODO: post and update
            this.clearForm();
        }
    };

    clearForm = () => {

    }
}

const Form = t.form.Form;

const Task = t.struct({
    title: t.String,
    description: t.String,
    reward: t.Number
});

const options = {
    auto: 'placeholders',
    fields: {
        title: {
            label: 'Title',
            error: 'Please specify title of your task.'
        },
        description: {
            label: 'Description',
            error: 'Please specify details about your task.',
            multiline: true,
            numberOfLines: 5
        },
        reward: {
            label: 'Reward',
            error: 'Please set the reward for your task.'
        }
    }
};
