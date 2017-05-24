import * as actionTypes from '../constants/listinfo'

export function load(data) {
    return {
        type: actionTypes.LISTINFO_LOAD,
        data
    }
}