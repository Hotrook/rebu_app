import {StyleSheet} from "react-native";
import {Constants} from 'expo';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1'
    },
    markerContainer: {
        flex: 1,
        backgroundColor: '#550bbc',
        minWidth: 100,
        maxWidth: 300,
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
    },
    markerTextTitle: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    markerTextOwner: {
        color: '#FFF',
    }
});