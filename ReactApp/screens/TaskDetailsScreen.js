import React from 'react';
import {Button, Text} from "react-native-elements";
import {ActivityIndicator, ScrollView, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import styles from './TaskDetailsScreen.component.style';
import {connect} from "react-redux";
import completeTask from "../actions/completeTask";
import assignTask from "../actions/assignTask";
import requestCompletion from "../actions/requestTaskCompletion";
import rejectCompletion from "../actions/rejectCompletion";

export class TaskDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.getParam('user', null),
        };
    }

    static navigationOptions = {
        title: 'Task Details',
    };

    render() {
        if (this.props.task !== null) {
            return (
                <ScrollView style={styles.container}
                            contentContainerStyle={{
                                alignItems: 'stretch',
                                justifyContent: 'center'
                            }}>
                    {this.createActionButtonsBasedOnStateAndOwner()}
                    <View>
                        <Text style={styles.infoBox}>Title: {this.props.task.title}</Text>
                        <Text style={styles.infoBox}>Owner: {this.props.task.owner}</Text>
                        <Text style={styles.infoBox}>Description: {this.props.task.description}</Text>
                        <Text style={styles.infoBox}>Reward: {this.props.task.reward}</Text>
                        <Text style={styles.infoBox}>Status: {this.props.task.progression.status}</Text>
                        {this.addAssigneeIfExists()}
                        <MapView
                            liteMode
                            initialRegion={{
                                latitude: this.props.task.latlng.latitude,
                                longitude: this.props.task.latlng.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={styles.map}
                            loadingEnabled
                            loadingIndicatorColor="#666666"
                            loadingBackgroundColor="#eeeeee">
                            <Marker
                                coordinate={this.props.task.latlng}
                            />
                        </MapView>
                    </View>
                </ScrollView>
            )
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }

    addAssigneeIfExists = () => {
        if (this.props.task.progression.status !== 'free') {
            return <Text style={styles.infoBox}>Assignee: {this.props.task.progression.assignee}</Text>
        }
    };

    createActionButtonsBasedOnStateAndOwner = () => {
        if (this.state.user === this.props.task.owner) {
            return this.renderTaskOwnerActions();
        } else {
            return this.renderStandardTaskActions();
        }
    };

    renderTaskOwnerActions = () => {
        let disabled = this.props.task.progression.status !== 'review';

        return (
            <View style={styles.actionsBar}>
                <Button disabled={disabled} title={'Reject'} onPress={this.rejectCompletion}/>
                <Button disabled={disabled} title={'Mark Complete'} onPress={this.completeTask}/>
            </View>
        )
    };

    renderStandardTaskActions = () => {
        if (this.props.task.progression.status === 'free' ||
            this.props.task.progression.assignee === this.state.user) {
            let assignDisabled = this.props.task.progression.status !== 'free';
            return (
                <View style={styles.actionsBar}>
                    <Button disabled={assignDisabled} title={'Assign to me'} onPress={this.assignTask}/>
                    {this.addRequestCompletionButtonIfNeeded()}
                </View>
            )
        }
    };

    addRequestCompletionButtonIfNeeded = () => {
        if (this.props.task.progression.status === 'started' &&
            this.props.task.progression.assignee === this.state.user) {
            return <Button title={'Request Completion'} onPress={this.requestCompletion}/>
        }
    };

    completeTask = () => {
        console.log('Task complete: ', this.props.task.title);
        this.props.completeTask(this.props.task);
    };

    assignTask = () => {
        console.log('Assign task to me: ', this.state.user, this.props.task.title);
        this.props.assignTask(this.props.task, this.state.user);
    };

    requestCompletion = () => {
        console.log('Request task completion: ', this.state.user, this.props.task.title);
        this.props.requestCompletion(this.props.task);
    };

    rejectCompletion = () => {
        console.log('Rejected task completion: ', this.state.user, this.props.task.title);
        this.props.rejectCompletion(this.props.task);
    }
}

const mapProps = state => {
    return ({
        task: state.taskDetailed.task,
    })
};

const mapDispatchToProps = {
    completeTask, assignTask, requestCompletion, rejectCompletion,
};

export default connect(mapProps, mapDispatchToProps)(TaskDetailsScreen)