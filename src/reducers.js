import { combineReducers } from 'redux';
import { SET_CURRENT_RESPONSE, CLEAR_CURRENT_ENTRY, SET_CURRENT_ENTRY,
         SET_CURRENT_SUBJECT, SET_CURRENT_GROUP, SAVE_CURRENT_ENTRY }
       from './actions.js';

const initResponseState = {
    group: 'X',
    subject: '',
    responseSet: [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
};

const savedResponses = JSON.parse(localStorage.getItem('responses'));
const initResults = {
    responseEntries: savedResponses || [],
}

export function response(state = initResponseState, action) {
    switch (action.type) {
        case SET_CURRENT_RESPONSE:
            return Object.assign({}, state, {
                responseSet: action.responseSet,
            });
        case SET_CURRENT_GROUP:
            return Object.assign({}, state, {
                group: action.group.target.value,
            });
        case SET_CURRENT_SUBJECT:
            return Object.assign({}, state, {
                subject: action.subject.target.value,
            })
        default:
            return state;
    }
}

export function results(state = initResults, action) {
    switch (action.type) {
        case SET_CURRENT_RESPONSE:
            return Object.assign({}, state, {
                responseSet: action.responseSet,
            });
        default:
            return state;
    }
}

export const mainReducer = combineReducers({
    response,
    results,
});
