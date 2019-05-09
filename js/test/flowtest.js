// @flow test

import * as actionTypes from './actionTypes';

const initialState = {
    tracks: [],
    activeTrack: null
};
//修改后
type Track = {

}
type initialState = {
    tracks:Array<any>,
    activeTrack:?Track
};


export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TRACKS_SET:
            return setTracks(state, action);
        case actionTypes.TRACK_PLAY:
            return setPlay(state, action);
    }
    return state;
}
// 修改后
export default function(state:any = initialState, action:any) {
    switch (action.type) {
        case actionTypes.TRACKS_SET:
            return setTracks(state, action);
        case actionTypes.TRACK_PLAY:
            return setPlay(state, action);
    }
    return state;
}



function setTracks(state, action) {
    const { tracks } = action;
    return { ...state, tracks };
}

function setPlay(state, action) {
    const { track } = action;
    return { ...state, activeTrack: track };
}

