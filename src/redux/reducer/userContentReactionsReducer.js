import { ADD_USER_CON_REACTION, DELETE_USER_CON_REACTION, FETCH_USER_CON_REACTION_BEGIN, FETCH_USER_CON_REACTION_FAILURE, FETCH_USER_CON_REACTION_SUCCESS } from "../constants";

const initialState = {
    items: [],
    loading: false,
    error: null
};

const userContentReactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_CON_REACTION_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_USER_CON_REACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data
            };

        case FETCH_USER_CON_REACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        case ADD_USER_CON_REACTION:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload.newUserContentReaction
                ]
            };

        case DELETE_USER_CON_REACTION:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.userContentReactionId)
            };


        default:
            return state;
    }
}

export default userContentReactionsReducer;