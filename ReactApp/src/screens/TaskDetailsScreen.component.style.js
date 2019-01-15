import {StyleSheet} from "react-native";
import {Constants} from "expo";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    map: {
        alignSelf: 'stretch',
        height: 250,
        marginTop: 10
    },
    infoBox: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 10,
    },
    actionsBar: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        borderRadius: 10,
    }
});