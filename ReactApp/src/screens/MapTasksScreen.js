import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Location, MapView} from 'expo';
import {ActivityIndicator, Dimensions, View} from "react-native";
import {Icon, Text} from "react-native-elements";
import styles from './MapTasksScreen.component.style'
import showTask from "../actions/showTask";

export class MapTasksScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            locationResult: null,
        }
    }

    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        tasks: PropTypes.array,
    };

    componentDidMount() {
        this.getLocationAsync();
    }

    getLocationAsync = async () => {
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            locationResult: JSON.stringify(location),
            mapRegion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        })
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.locationResult === null ? <Text>Waiting for your localization...</Text> :
                    this.state.mapRegion === null ? <ActivityIndicator/> :
                        <MapView
                            style={{alignSelf: 'stretch', height: Dimensions.get('window').height}}
                            region={this.state.mapRegion}
                            onRegionChange={this.handleMapRegionChange}>
                            {this.props.tasks.filter(this.latitudeDefined).map(this.renderMarkers)}
                        </MapView>
                }
            </View>
        )
    }

    latitudeDefined = (task) => {
        if (task.latitude) {
            return true
        } else {
            return false
        }
    }

    renderMarkers = (task) => {
        return <MapView.Marker
            key={task.id}
            coordinate={{latitude: task.latitude, longitude: task.longitude}}>
            <Icon name={'help'}/>
            <MapView.Callout tooltip={true} onPress={() => this.onMarkerClicked(task)}>
                <View style={styles.markerContainer}>
                    <Text style={styles.markerTextTitle}>{task.title}</Text>
                    <Text style={styles.markerTextOwner}>{task.owner}</Text>
                </View>
            </MapView.Callout>
        </MapView.Marker>
    };

    handleMapRegionChange = mapRegion => {
        //this.setState({mapRegion}) this is laggy
    };

    onMarkerClicked = task => {
        this.props.showTask(task);
        this.props.navigation.navigate('Details', {user: this.props.user.user})
    }
}

const mapProps = (state) => {
    return ({
        tasks: state.tasks.tasks,
        user: state.user,
    })
};

const mapDispatchToProps = {
    showTask
};


export default connect(mapProps, mapDispatchToProps)(MapTasksScreen);
