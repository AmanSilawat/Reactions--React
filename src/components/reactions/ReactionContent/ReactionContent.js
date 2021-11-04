import React, { useMemo, useRef, useState } from 'react';

import './style.css';

const ReactionContent = ({
    userId,
    contentId,
    reactionId,
    emojiName,
    emoji,
    totEmoji,
    reactionGrp,
    handleReaction
}) => {
    const userLikedObj = useMemo(() => {
        return reactionGrp.find(item => userId === item.user_id);
    }, [reactionGrp, userId]);

    const [isLiked, setIsLiked] = useState(userLikedObj ? true : false);
    const [emojiCount, setEmojiCount] = useState(totEmoji);
    const timer = useRef(null);

    return (
        <div
            className={`btnSty ${isLiked ? 'liked' : ''}`}
            onClick={() => handleReaction({ userLikedObj, timer, isLiked, reactionId, setIsLiked, emojiCount, setEmojiCount, contentId })}
        >
            <span title={emojiName} className="emoji">{emoji}</span>
            <span className="dotSeparator"></span>
            <span>{emojiCount}</span>
        </div>
    )
}

export default ReactionContent
