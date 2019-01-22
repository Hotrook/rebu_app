import {combineReducers} from 'redux';
import tasks from './tasks/taskReducer';
import userTasks from './tasks/userTasksReducer';
import user from './auth/userReducer';
import taskDetailed from './tasks/taskDetailedReducer';

export default combineReducers({
    tasks, userTasks, user, taskDetailed,
})