import React from 'react';
import {Button, Text} from "react-native-elements";
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import styles from './TaskDetailsScreen.component.style';
import {connect} from "react-redux";
import completeTask from "../actions/completeTask";
import assignTask from "../actions/assignTask";
import requestCompletion from "../actions/requestTaskCompletion";
import rejectCompletion from "../actions/rejectCompletion";
import {MapView} from "expo";

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

    async componentDidMount() {

        const jwt = await AsyncStorage.getItem('id_token');
        const user = await AsyncStorage.getItem('user_info');

        console.log(jwt)
        console.log(user)

        this.setState({
            user: user,
            jwt: jwt
        })
    }

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
                        <Text style={styles.infoBox}>Status: {this.props.task.status}</Text>
                        {this.addAssigneeIfExists()}
                        <MapView
                            liteMode
                            initialRegion={{
                                latitude: this.props.task.latitude,
                                longitude: this.props.task.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={styles.map}
                            loadingEnabled
                            loadingIndicatorColor="#666666"
                            loadingBackgroundColor="#eeeeee">
                            <MapView.Marker
                                coordinate={{
                                    latitude: this.props.task.latitude ? this.props.task.latitude : 0.0,
                                    longitude:  this.props.task.longitude ? this.props.task.longitude : 0.0,
                                }}
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
        if (this.props.task.status !== 'free') {
            return <Text style={styles.infoBox}>Assignee: {this.props.task.assignee}</Text>
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
        let disabled = this.props.task.status !== 'REVIEW';

        return (
            <View style={styles.actionsBar}>
                <Button disabled={disabled} title={'Reject'} onPress={this.rejectCompletion}/>
                <Button disabled={disabled} title={'Mark Complete'} onPress={this.completeTask}/>
            </View>
        )
    };

    renderStandardTaskActions = () => {
        if (this.props.task.status === 'FREE' ||
            this.props.task.assignee === this.state.user) {
            let assignDisabled = this.props.task.status !== 'FREE';
            return (
                <View style={styles.actionsBar}>
                    <Button disabled={assignDisabled} title={'Assign to me'} onPress={this.assignTask}/>
                    {this.addRequestCompletionButtonIfNeeded()}
                </View>
            )
        }
    };

    addRequestCompletionButtonIfNeeded = () => {
        if (this.props.task.status === 'STARTED' &&
            this.props.task.assignee === this.state.user) {
            return <Button title={'Request Completion'} onPress={this.requestCompletion}/>
        }
    };

    completeTask = () => {
        console.log('Task complete: ', this.props.task.title);
        this.props.completeTask(this.props.task, this.state.jwt);
    };

    assignTask = () => {
        console.log('Assign task to me: ', this.state.user, this.props.task.title);
        this.props.assignTask(this.props.task, this.state.user, this.state.jwt);
    };

    requestCompletion = () => {
        console.log('Request task completion: ', this.state.user, this.props.task.title);
        this.props.requestCompletion(this.props.task, this.state.jwt);
    };

    rejectCompletion = () => {
        console.log('Rejected task completion: ', this.state.user, this.props.task.title);
        this.props.rejectCompletion(this.props.task, this.state.jwt);
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