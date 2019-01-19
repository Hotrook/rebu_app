import React from 'react';
import {ActivityIndicator, AsyncStorage, Button, Dimensions, FlatList, View} from "react-native";
import connect from "react-redux/es/connect/connect";
import {List, ListItem, SearchBar} from "react-native-elements";
import PropTypes from "prop-types";
import getAllTasksForUser from "../actions/getAllTasksForUser";
import updateTasksListForUser from "../actions/updateTasksListForUser";

export class MyTasksScreen extends React.Component {

    static propTypes = {
        tasks: PropTypes.array,
        allTasks: PropTypes.array,
        loading: PropTypes.bool,
        getAllTasksForUser: PropTypes.func,
        updateTasksList: PropTypes.func,
    };

    static navigationOptions = ({navigation, defaultHandler}) => ({
        headerRight: <Button title='Sign Out' onPress={() => navigation.state.params._signOutAsync()}/>,
        headerTitle: 'My Tasks',
    });

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.navigation.setParams({_signOutAsync: this._signOutAsync});
        this.retrieveUserInfo();
    }

    retrieveUserInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken');
            if (value !== null) {
                this.props.getAllTasksForUser(value);
                this.setState({user: value})
            }
        } catch (error) {
            console.log('Error on retrieving user token', error)
        }
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
            <List>
                <FlatList
                    data={this.props.tasks}
                    renderItem={({item}) => (
                        <ListItem
                            roundAvatar
                            title={item.title}
                            subtitle={item.owner}
                            containerStyle={{borderBottomWidth: 0}}
                            //onPress={() => this.handleDetails(item)}
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

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
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

    searchFilterFunction = text => {
        const newData = this.props.allTasks.filter(item => {
            const itemData = `${item.title.toUpperCase()} ${item.owner.toUpperCase()}}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.props.updateTasksListForUser(newData, this.props.allTasks);
    };

    handlePullRefresh = () => {
        this.props.getAllTasksForUser(this.state.user);
    }

}

const mapProps = (state) => {
    return ({
        tasks: state.userTasks.tasks,
        allTasks: state.userTasks.allTasks,
        loading: false
    })
};

const mapDispatchToProps = {
    getAllTasksForUser, updateTasksListForUser
};

export default connect(mapProps, mapDispatchToProps)(MyTasksScreen);