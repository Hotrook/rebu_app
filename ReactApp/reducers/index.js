import {combineReducers} from 'redux';
import tasks from './tasks/taskReducer';
import userTasks from './tasks/userTasksReducer';

export default combineReducers({
    tasks, userTasks,
})