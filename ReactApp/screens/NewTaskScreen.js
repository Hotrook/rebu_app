import React from 'react';
import {ScrollView, Text, TouchableHighlight, ActivityIndicator, View} from 'react-native';
import t from 'tcomb-form-native';
import styles from './NewTaskScreen.component.style.js'
import createTask from "../actions/createTask";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import {Marker} from 'react-native-maps';
import {Location} from "expo";

export class NewTaskScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            hasLocationPermissions: false,
            mapRegion: null,
            markerCoords: null,
        }
    }

    static navigationOptions = {
        title: 'Create New Tasks',
    };

    static propTypes = {
        createTask: PropTypes.func,
    };

    componentDidMount() {
        this.getLocationAsync();
    }

    getLocationAsync = async () => {
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            mapRegion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            hasLocationPermissions: true
        })
    };

    render() {
        if (this.state.hasLocationPermissions) {
            return (
                <ScrollView style={styles.container}>
                    <Form type={Task}
                          options={options}
                          ref="form"/>
                    <MapView
                        style={styles.map}
                        initialRegion={this.state.mapRegion}
                        onPress={this.handleMapPressed}>
                        {this.createMarkerIfExists()}
                    </MapView>
                    <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableHighlight>
                </ScrollView>
            );
        } else {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        }
    }

    handleSubmit = () => {
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log("validation passed", value);
            //TODO: change id
            this.props.createTask({
                id: Math.floor(Math.random() * 10000000),
                title: value.title,
                owner: 'User',
                reward: value.reward,
                description: value.description,
                latlng: {
                    latitude: this.state.markerCoords.latitude,
                    longitude: this.state.markerCoords.longitude
                }
            });
        }
    };

    handleMapPressed = event => {
        this.setState({
            markerCoords: event.nativeEvent.coordinate
        })
    };

    createMarkerIfExists = () => {
        if (this.state.markerCoords !== null) {
            return <Marker
                coordinate={this.state.markerCoords}
            />
        }
    }
}

const mapDispatchToProps = {
    createTask,
};

export default connect(null, mapDispatchToProps)(NewTaskScreen)

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
