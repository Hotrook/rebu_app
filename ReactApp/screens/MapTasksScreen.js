import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Constants, MapView, Location, Permissions} from 'expo';
import {ActivityIndicator, View, StyleSheet, Dimensions} from "react-native";
import {Text} from "react-native-elements";
import {Marker} from 'react-native-maps';

export class MapTasksScreen extends React.Component {


    constructor() {
        super();
        this.state = {
            mapRegion: null,
            hasLocationPermissions: false,
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
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({locationResult: 'Permission not granted'});
        } else {
            this.setState({hasLocationPermissions: true});
        }

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
        console.log("[MAPS UPDATE]", this.state);
        return (
            <View style={styles.container}>
                {this.state.locationResult === null ? <ActivityIndicator/> :
                    this.state.hasLocationPermissions === false ? <Text>Location not granted</Text> :
                        this.state.mapRegion === null ? <Text>Map region doesn't exists</Text> :
                            <MapView
                                style={{alignSelf: 'stretch', height: Dimensions.get('window').height}}
                                region={this.state.mapRegion}
                                onRegionChange={this.handleMapRegionChange}>
                                {this.props.tasks.map(this.renderMarkers)}
                            </MapView>
                }
            </View>
        )
    }

    renderMarkers = (task, index) => {
        return <Marker
            key={index}
            coordinate={task.latlng}
            title={task.title}
            description={task.owner}
        />
    };

    handleMapRegionChange = mapRegion => {
        //this.setState({mapRegion}) this is laggy
    }
}

const mapProps = (state) => {
    return ({
        tasks: state.tasks.tasks,
    })
};

export default connect(mapProps, null)(MapTasksScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1'
    }
});
