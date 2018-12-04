export const loggingMiddleware = store => next => action => {
    console.log('dispatching action', action);
    let result = next(action);
    console.log('nextState', store.getState());
    return result;
};

export const crashReporter = store => next => action => {
    try{
        return next(action);
    } catch (err) {
        console.error('Caught an exception', err);
        throw err;
    }
};