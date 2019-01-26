import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Constants, Location, MapView} from 'expo';
import {ActivityIndicator, Dimensions, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";

export class MapTasksScreen extends React.Component {


    constructor() {
        super();
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
        console.log("[MAPS UPDATE]", this.state);
        return (
            <View style={styles.container}>
                {this.state.locationResult === null ?  <Text>Waiting for your localization...</Text>:
                    this.state.mapRegion === null ? <ActivityIndicator/> :
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
        return <MapView.Marker
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
