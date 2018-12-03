import React, {Component} from 'react';
import {View, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import {List, ListItem, SearchBar} from 'react-native-elements';
import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";
import getAllTasks from "../actions/getAllTasks";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import updateTasksList from "../actions/updateTasksList";

export class HomeScreen extends Component {

    static propTypes = {
        tasks: PropTypes.array,
        allTasks: PropTypes.array,
        loading: PropTypes.bool,
        getAllTasks: PropTypes.func,
        updateTasksList: PropTypes.func,
    };

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        console.log("did mount");
        this.props.getAllTasks();
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
            />
        );
    };

    searchFilterFunction = text => {
        console.log("tasks", this.props.tasks);
        console.log("allTasks", this.props.allTasks);
        const newData = this.props.allTasks.filter(item => {
            const itemData = `${item.title.toUpperCase()} ${item.owner.toUpperCase()}}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.props.updateTasksList(newData, this.props.allTasks);
    };

    render() {
        if (this.props.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                <FlatList
                    data={this.props.tasks}
                    renderItem={({item}) => (
                        <ListItem
                            roundAvatar
                            title={item.title}
                            subtitle={item.owner}
                            containerStyle={{borderBottomWidth: 0}}
                            onPress={() => this.handleDetails(item)}
                            hideChevron={true}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    refreshing={this.props.loading}
                    onRefresh={() => this.handlePullRefresh()}
                    style={{minHeight: Dimensions.get('window').height}}
                />
            </List>
        );
    }

    handleDetails = (item) => {
        ToastAndroid.showWithGravity(item.title + ", " + item.owner + ", " + item.reward, ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    handlePullRefresh = () => {
        this.props.getAllTasks();
    }
}

HomeScreen.defaultProps = {loading: true, tasks: []};

const mapProps = (state) => {
    console.log("onReceive", state);
    return ({
        tasks: state.tasks.tasks,
        allTasks: state.tasks.allTasks,
        loading: false
    })
};

const mapDispatchToProps = {
    getAllTasks, updateTasksList
};

export default connect(mapProps, mapDispatchToProps)(HomeScreen);
