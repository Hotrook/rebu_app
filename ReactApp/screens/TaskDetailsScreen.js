import React from 'react';
import {Button, Text} from "react-native-elements";
import {ActivityIndicator, ScrollView, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import styles from './TaskDetailsScreen.component.style';

export default class MyTasksScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: this.props.navigation.getParam('task', null),
            user: this.props.navigation.getParam('user', null),
        };
    }

    static navigationOptions = {
        title: 'Task Details',
    };

    render() {
        if (this.state.task !== null) {
            return (
                <ScrollView style={styles.container}
                contentContainerStyle={{alignItems: 'stretch',
                    justifyContent: 'center'}}>
                    {this.createActionButtonsBasedOnStateAndOwner()}
                    <View>
                        <Text style={styles.infoBox}>Title: {this.state.task.title}</Text>
                        <Text style={styles.infoBox}>Owner: {this.state.task.owner}</Text>
                        <Text style={styles.infoBox}>Description: {this.state.task.description}</Text>
                        <Text style={styles.infoBox}>Reward: {this.state.task.reward}</Text>
                        <Text style={styles.infoBox}>Status: {this.state.task.progression.status}</Text>
                        {this.addAssigneeIfExists()}
                        <MapView
                            liteMode
                            initialRegion={{
                                latitude: this.state.task.latlng.latitude,
                                longitude: this.state.task.latlng.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={styles.map}
                            loadingEnabled
                            loadingIndicatorColor="#666666"
                            loadingBackgroundColor="#eeeeee">
                            <Marker
                                coordinate={this.state.task.latlng}
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
        if (this.state.task.progression.status !== 'free') {
            return <Text style={styles.infoBox}>Assignee: {this.state.task.progression.assignee}</Text>
        }
    };

    createActionButtonsBasedOnStateAndOwner = () => {
        if (this.state.user === this.state.task.owner) {
            return this.renderTaskOwnerActions();
        } else {
            return this.renderStandardTaskActions();
        }
    };

    renderTaskOwnerActions = () => {
        return (
            <View style={styles.actionsBar}>
                <Button title={'Mark Complete'} onPress={this.completeTask}/>
            </View>
        )
    };

    renderStandardTaskActions = () => {
        return (
            <View style={styles.actionsBar}>
                <Button title={'Assign to me'} onPress={this.assignTask}/>
                <Button title={'Request Completion'} onPress={this.requestCompletion}/>
            </View>
        )
    };

    completeTask = () => {
        console.log('Task complete: ', this.state.task.title);
    };

    assignTask = () => {
        console.log('Assign task to me: ', this.state.user, this.state.task.title);
    };

    requestCompletion = () => {
        console.log('Request task completion: ', this.state.user, this.state.task.title);
    }
}