import React from 'react';
import {Text} from "react-native-elements";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import {Marker} from "react-native-maps";
import {Constants} from "expo";

export default class MyTasksScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: this.props.navigation.getParam('task', null)
        };
    }

    static navigationOptions = {
        title: 'Task Details',
    };

    render() {
        if (this.state.task !== null) {
            return (
                <View style={styles.container}>
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
            )
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }

    addAssigneeIfExists = () => {
        if(this.state.task.progression.status !== 'free'){
            return <Text style={styles.infoBox}>Assignee: {this.state.task.progression.assignee}</Text>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1'
    },
    map: {
        alignSelf: 'stretch',
        height: 250,
        marginTop: 10
    },
    infoBox: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#DDDDDD'
    }
});