import {combineReducers} from 'redux';
import tasks from './tasks/taskReducer';

export default combineReducers({
    tasks,
})