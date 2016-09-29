export const SET_CURRENT_RESPONSE = 'SET_CURRENT_RESPONSE';
export const SET_CURRENT_SUBJECT = 'SET_CURRENT_SUBJECT';
export const SET_CURRENT_GROUP = 'SET_CURRENT_GROUP';
export const SET_CURRENT_ENTRY = 'SET_CURRENT_ENTRY';
export const CLEAR_CURRENT_ENTRY = 'CLEAR_CURRENT_RESPONSE';
export const SAVE_CURRENT_ENTRY = 'SAVE_CURRENT_RESPONSE';


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

export function setCurrentEntry(entry) {
    return {
        type: SAVE_CURRENT_ENTRY,
        entry,
    };
}
