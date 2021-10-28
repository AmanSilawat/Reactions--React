import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'

import ReactionTrigger from '../ReactionTrigger';
import ReactionContent from '../ReactionContent';


import './style.css';
import { addUserContentReactions, deleteUserContentReactions } from '../../../redux/actions';

const Reactions = ({ contentId }) => {
    // const state = useSelector(state => state);
    const { error, loading, items: userContentReactions } = useSelector(state => state.userContentReactions);
    const { error: errorReactions, items: reactions } = useSelector(state => state.reactions);

    const { id: userId } = useSelector(state => state.currentUser);

    const dispatch = useDispatch();

    const handleDeleteReaction = useCallback((userContentReactionId) => {
        dispatch(deleteUserContentReactions({ userContentReactionId }));
    }, [dispatch]);

    const handleAddReaction = useCallback(({ user_id, reaction_id, content_id }) => {
        dispatch(addUserContentReactions({ user_id, reaction_id, content_id }))
    }, [dispatch]);

    const reactionsGrp = useMemo(() => {
        const filterDataGrp = userContentReactions.filter(item => item.content_id === contentId);

        return filterDataGrp.reduce((acc, item) => {
            if (item.reaction_id in acc) {
                acc[item.reaction_id].push(item);
            }
            else {
                acc[item.reaction_id] = [item];
            }
            return acc;
        }, {});

    }, [userContentReactions, contentId]);

    const reactionsFiltered = useMemo(() => {
        return reactions.filter(item => {
            if (typeof reactionsGrp[item.id] === 'undefined') {
                return true;
            }
            return !reactionsGrp[item.id].some(item => item.user_id === userId)
        })
    }, [reactions, userId, reactionsGrp]);

    if (error) {
        return <div>Error! {error.message}</div>;
    }

    if (errorReactions) {
        return <div>Error! {errorReactions.message}</div>
    }

    if (loading) {
        return <Skeleton height={25} />;
    }

    return (
        <div className="reactionWrapper">
            {
                reactionsGrp && Object.keys(reactionsGrp).map((key, i) => {
                    return <ReactionContent
                        key={key.concat(reactionsGrp[key].length)}
                        reactionGrp={reactionsGrp[key]}
                        contentId={contentId}
                        reactionId={key}
                        emoji={reactions[key - 1].emoji}
                        emojiName={reactions[key - 1].name}
                        emojiCount={reactionsGrp[key].length}
                        handleDeleteReaction={handleDeleteReaction}
                        handleAddReaction={handleAddReaction}
                        userId={userId}
                    />
                })
            }

            {
                reactionsFiltered.length !== 0 && <ReactionTrigger
                    contentId={contentId}
                    reactionsFiltered={reactionsFiltered}
                />
            }
        </div>
    )
}

export default Reactions
