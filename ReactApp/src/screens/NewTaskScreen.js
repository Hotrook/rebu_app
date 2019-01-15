import React from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import t from 'tcomb-form-native';
import styles from './NewTaskScreen.component.style.js'
import createTask from "../actions/createTask";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Location, MapView} from "expo";

const Form = t.form.Form;
let balance = 0;

export class NewTaskScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        })
    };

    render() {
        balance = this.props.user.balance;
        if (this.state.mapRegion !== null) {
            return (
                <ScrollView style={styles.container}>
                    <Form type={Task}
                          options={options}
                          ref={c => this._form = c}
                          value={this.state.value}
                          onChange={this.onFormChange}/>
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
                    <Text>Waiting for your localization...</Text>
                    <ActivityIndicator size={'large'}/>
                </View>
            )
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let value = this._form.getValue();
        if (value) { // if validation fails, value will be null
            this.postNewTask(this.props.user.user, value);
        }
    };

    postNewTask = (user, value) => {
        console.log("validation passed", user, value);
        //TODO: change id
        this.props.createTask({
            id: Math.floor(Math.random() * 10000000),
            title: value.title,
            owner: user,
            reward: value.reward,
            description: value.description,
            latlng: {
                latitude: this.state.markerCoords.latitude,
                longitude: this.state.markerCoords.longitude
            },
            progression: {
                status: 'free',
            }
        }, this.props.navigation, user);
        this.setState({
            value: null,
            markerCoords: null
        })
    };

    handleMapPressed = event => {
        this.setState({
            markerCoords: event.nativeEvent.coordinate
        })
    };

    onFormChange = value => {
        this.setState({value})
    };

    createMarkerIfExists = () => {
        if (this.state.markerCoords !== null) {
            return <MapView.Marker
                coordinate={this.state.markerCoords}
            />
        }
    };
}

const mapProps = state => {
    return ({
        user: {
            user: state.user.user,
            balance: state.user.balance
        }
    })
};

const mapDispatchToProps = {
    createTask,
};

export default connect(mapProps, mapDispatchToProps)(NewTaskScreen)

const Positive = t.refinement(t.Number, function (n) {
    return n >= 0 && n <= balance;
});

const Task = t.struct({
    title: t.String,
    description: t.String,
    reward: Positive,
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
            error: 'Please set correct reward for your task.'
        }
    },
    stylesheet: formStyles,
};

