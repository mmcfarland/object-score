export const SET_CURRENT_RESPONSE = 'SET_CURRENT_RESPONSE';
export const SET_CURRENT_SUBJECT = 'SET_CURRENT_SUBJECT';
export const SET_CURRENT_GROUP = 'SET_CURRENT_GROUP';
export const SET_CURRENT_ENTRY = 'SET_CURRENT_ENTRY';
export const CLEAR_CURRENT_ENTRY = 'CLEAR_CURRENT_RESPONSE';
export const SAVE_CURRENT_ENTRY = 'SAVE_CURRENT_RESPONSE';
export const CLEAR_ALL_RESPONSES = 'CLEAR_ALL_RESPONSES';
export const DELETE_RESPONSE = 'DELETE_RESPONSE';

export function setCurrentResponse(responseSet) {
    return {
        type: SET_CURRENT_RESPONSE,
        responseSet,
    };
}

export function setCurrentSubject(subject) {
    return {
        type: SET_CURRENT_SUBJECT,
        subject,
    };
}

export function setCurrentGroup(group) {
    return {
        type: SET_CURRENT_GROUP,
        group,
    };
}

export function saveCurrentEntry(entry) {
    return {
        type: SAVE_CURRENT_ENTRY,
        entry,
    };
}

export function clearCurrentEntry() {
    return {
        type: CLEAR_CURRENT_ENTRY,
    };
}

export function setCurrentEntry(idx) {
    return {
        type: SET_CURRENT_ENTRY,
        idx,
    };
}

export function clearAllResponses() {
    return {
        type: CLEAR_ALL_RESPONSES,
    };
}

export function deleteResponse(idx) {
    return {
        type: DELETE_RESPONSE,
        idx,
    };
}
