import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'

import ReactionTrigger from '../ReactionTrigger';
import ReactionContent from '../ReactionContent';


import './style.css';
import { addUserContentReactions, deleteUserContentReactions, immediateRemoveUserContentReactions } from '../../../redux/actions';

const Reactions = ({ contentId }) => {
    const { error, loading, items: userContentReactions } = useSelector(state => state.userContentReactions);
    const { error: errorReactions, items: reactions } = useSelector(state => state.reactions);

    const { id: userId } = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    // add and remove reactions
    const handleAddRemoveReaction = useCallback(({ reactionId, userLikedObj }) => {

        if (typeof userLikedObj === 'undefined') {

            // add reaction
            dispatch(addUserContentReactions({
                user_id: userId,
                reaction_id: reactionId,
                content_id: contentId
            }));

        } else {

            // remove reaction
            dispatch(deleteUserContentReactions({ userContentReactionId: userLikedObj.id }));

        }

    }, [contentId, userId, dispatch])


    // immediately react on emoji reactions
    const handleReaction = useCallback(({ userLikedObj, timer, isLiked, reactionId, setIsLiked, emojiCount, setEmojiCount, contentId }) => {

        const originalState = userLikedObj ? true : false;

        // if current state equal is same then fetch
        if (originalState === isLiked) {

            timer.current = setTimeout(() => {
                handleAddRemoveReaction({ reactionId, userLikedObj });
            }, 800);

        } else {

            clearTimeout(timer.current);
            timer.current = null;

        }

        const nextEmojiCountValue = emojiCount + (isLiked ? -1 : 1);

        if (nextEmojiCountValue === 0) {
            dispatch(immediateRemoveUserContentReactions({ userContentReactionId: userLikedObj.id }))
        } else {
            setEmojiCount(nextEmojiCountValue);
            setIsLiked(!isLiked);
        }

    }, [handleAddRemoveReaction, dispatch]);


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
                        totEmoji={reactionsGrp[key].length}
                        handleReaction={handleReaction}
                        userId={userId}
                    />
                })
            }

            <ReactionTrigger
                contentId={contentId}
                userId={userId}
                reactionsGrp={reactionsGrp}
                handleAddRemoveReaction={handleAddRemoveReaction}
            />
        </div>
    )
}

export default Reactions
