import axios from "axios";
import { ADD_USER_CON_REACTION, DELETE_USER_CON_REACTION, FETCH_REACTIONS_BEGIN, FETCH_REACTIONS_FAILURE, FETCH_REACTIONS_SUCCESS, FETCH_USER_CON_REACTION_BEGIN, FETCH_USER_CON_REACTION_SUCCESS } from "../constants";

export const fetchUserContentReactions = () => dispatch => {
    // start fetching
    dispatch({ type: FETCH_USER_CON_REACTION_BEGIN });

    return axios.get("https://artful-iudex.herokuapp.com/user_content_reactions")
        .then(({ data }) => {
            dispatch(fetchReactions(data))

        })
        .catch(error => {
            dispatch({ type: FETCH_USER_CON_REACTION_SUCCESS, payload: { error } });
        });
}

export const fetchReactions = (userContentReactions) => dispatch => {
    // start fetching
    dispatch({ type: FETCH_REACTIONS_BEGIN });

    return axios.get("https://artful-iudex.herokuapp.com/reactions")
        .then(({ data }) => {

            // Reactions data
            dispatch({ type: FETCH_REACTIONS_SUCCESS, payload: { data } });

            // userContentReactions data
            dispatch({ type: FETCH_USER_CON_REACTION_SUCCESS, payload: { data: userContentReactions } });

        })
        .catch(error => {
            dispatch({ type: FETCH_REACTIONS_FAILURE, payload: { error } });
        });
}

// for Add reactions
export const addUserContentReactions = ({
    user_id,
    reaction_id,
    content_id
}) => dispatch => {
    return axios.post("https://artful-iudex.herokuapp.com/user_content_reactions", {
        user_id,
        reaction_id,
        content_id
    }).then(({ data }) => {
        dispatch({ type: ADD_USER_CON_REACTION, payload: { newUserContentReaction: data } });

    }).catch(error => {
        console.error('Error newUserContentReaction: ', error)
    });
}

// for delete reactions
export const deleteUserContentReactions = ({
    userContentReactionId,
}) => dispatch => {
    return axios.delete(`https://artful-iudex.herokuapp.com/user_content_reactions/${userContentReactionId}`)
        .then(() => {
            dispatch({
                type: DELETE_USER_CON_REACTION,
                payload: { userContentReactionId }
            });

        }).catch(error => {
            console.error('Error deleteUserContentReactions: ', error)
        });
}

export const immediateRemoveUserContentReactions = ({ userContentReactionId }) => dispatch => {
    dispatch({
        type: DELETE_USER_CON_REACTION,
        payload: { userContentReactionId }
    });
}