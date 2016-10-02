import { combineReducers } from 'redux';
import { cloneDeep } from 'lodash';
import { SET_CURRENT_RESPONSE, CLEAR_CURRENT_ENTRY, SET_CURRENT_ENTRY,
         SET_CURRENT_SUBJECT, SET_CURRENT_GROUP, SAVE_CURRENT_ENTRY }
       from './actions.js';

const savedResponses = JSON.parse(localStorage.getItem('responses'));
const initResponseState = {
    group: 'X',
    subject: '',
    responseSet: [
        [0,0,0,0,99],
        [0,0,0,0,99],
        [0,0,0,0,99],
        [0,0,0,0,99],
        [0,0,0,0,99],
        [0,0,0,0,99],
        [0,0,0,0,99]
    ],
    responseEntries: savedResponses || [],
    isEditing: false,
};

export function response(state = cloneDeep(initResponseState), action) {
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
        case SAVE_CURRENT_ENTRY:
            const existingEntries = cloneDeep(state.responseEntries);
            if (state.isEditing) {
                existingEntries[state.editingIdx] = action.entry;
            } else {
                existingEntries.push(action.entry);
            }

            return Object.assign({}, state, {
                responseEntries: existingEntries,
                isEditing: false,
            });
        case CLEAR_CURRENT_ENTRY:
            const empty = cloneDeep(initResponseState);
            return Object.assign({}, state, {
                group: empty.group,
                subject: empty.subject,
                responseSet: empty.responseSet,
                isEditing: false,
            });
        case SET_CURRENT_ENTRY:
            const editingEntry = cloneDeep(state.responseEntries[action.idx]);

            return Object.assign({}, state, {
                group: editingEntry.group,
                subject: editingEntry.subject,
                responseSet: editingEntry.responseSet,
                isEditing: true,
                editingIdx: action.idx,
            });
        default:
            return state;
    }
}

export const mainReducer = combineReducers({
    response,
});
