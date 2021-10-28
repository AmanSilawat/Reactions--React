import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import userContentReactionsReducer from './userContentReactionsReducer';
import reactionsReducer from './reactionsReducer';
import currentUserReducer from './currentUser';


const rootReducer = combineReducers({
    posts: postsReducer,
    userContentReactions: userContentReactionsReducer,
    reactions: reactionsReducer,
    currentUser: currentUserReducer
})

export default rootReducer;