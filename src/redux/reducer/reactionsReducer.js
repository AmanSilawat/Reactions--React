import { FETCH_REACTIONS_BEGIN, FETCH_REACTIONS_FAILURE, FETCH_REACTIONS_SUCCESS } from "../constants";

const initialState = {
    items: [],
    loading: false,
    error: null
};

const reactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REACTIONS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_REACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data
            };

        case FETCH_REACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        default:
            return state;
    }
}

export default reactionsReducer;