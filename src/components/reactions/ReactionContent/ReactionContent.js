import React, { useCallback, useMemo } from 'react';

import './style.css';

const ReactionContent = ({
    userId,
    contentId,
    reactionId,
    emojiName,
    emoji,
    emojiCount,
    reactionGrp,
    handleDeleteReaction,
    handleAddReaction,

}) => {
    const userLiked = useMemo(() => {
        return reactionGrp.find(item => userId === item.user_id);
    }, [reactionGrp, userId]);


    const handleAddRemoveReaction = useCallback(() => {
        if (typeof userLiked === 'undefined') {
            // add reaction
            handleAddReaction({
                user_id: userId,
                reaction_id: reactionId,
                content_id: contentId
            })
        } else {
            // remove reaction
            handleDeleteReaction(userLiked.id);
        }
    }, [handleAddReaction, handleDeleteReaction, contentId, reactionId, userLiked, userId])

    return (
        <div
            className={`btnSty ${userLiked ? 'liked' : ''}`}
            onClick={handleAddRemoveReaction}
        >
            <span title={emojiName} className="emoji">{emoji}</span>
            <span className="dotSeparator">.</span>
            <span>{emojiCount}</span>
        </div>
    )
}

export default ReactionContent
