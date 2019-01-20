import React from 'react';
import {ActivityIndicator, AsyncStorage, Button, Dimensions, FlatList, View} from "react-native";
import connect from "react-redux/es/connect/connect";
import {List, ListItem, SearchBar, Text} from "react-native-elements";
import PropTypes from "prop-types";
import getAllTasksForUser from "../actions/getAllTasksForUser";
import updateTasksListForUser from "../actions/updateTasksListForUser";
import styles from './MyTasksScreen.component.style';

export class MyTasksScreen extends React.Component {

    static propTypes = {
        tasks: PropTypes.array,
        allTasks: PropTypes.array,
        loading: PropTypes.bool,
        getAllTasksForUser: PropTypes.func,
        updateTasksList: PropTypes.func,
    };

    static navigationOptions = ({navigation}) => ({
        headerRight: <Button title='Sign Out' onPress={() => navigation.state.params._signOutAsync()}/>,
        headerTitle: 'My Tasks',
    });

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.navigation.setParams({_signOutAsync: this._signOutAsync});
        this.props.getAllTasksForUser(this.props.user.user);
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <View>
                <Text style={styles.balanceLabel}>Balance: {this.props.user.balance}</Text>
                <List
                    automaticallyAdjustContentInsets={false}>
                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        data={this.props.tasks}
                        contentContainerStyle={{paddingTop: 0, paddingBottom: 20, border: 1}}
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
                        ListEmptyComponent={<ListItem
                            roundAvatar
                            title={'No tasks to display'}
                            containerStyle={{borderBottomWidth: 0}}
                            hideChevron={true}
                        />}
                    />
                </List>
            </View>
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
        this.props.getAllTasksForUser(this.props.user.user);
    }

}

const mapProps = (state) => {
    return ({
        tasks: state.userTasks.tasks,
        allTasks: state.userTasks.allTasks,
        loading: false,
        user: {
            user: state.user.user,
            balance: state.user.balance,
        }
    })
};

const mapDispatchToProps = {
    getAllTasksForUser, updateTasksListForUser
};

export default connect(mapProps, mapDispatchToProps)(MyTasksScreen);