import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
    locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
const routeReducer = (state = routeInitialState, action) => {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return state.merge({ locationBeforeTransitions: action.payload });

        default:
            return state;
    }
};

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
const createReducer = (asyncReducers) =>
    combineReducers({
        route: routeReducer,
        form: formReducer,
        ...asyncReducers,
    });

export default createReducer;