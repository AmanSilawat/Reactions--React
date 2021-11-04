import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Tooltip from '../../Tooltip/Tooltip';

import './style.css'

const ReactionPopupItem = ({
    reactionId,
    emoji,
    emojiName,
    userId,
    reactionGrp,
    handleAddRemoveReaction,
}) => {
    const [isHover, setIsHover] = useState(false);

    const userLikedObj = useMemo(() => {
        return reactionGrp.find(item => userId === item.user_id);
    }, [reactionGrp, userId]);

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`reactionItem ${isHover ? 'hoverOnEmoji' : ''}`}
            onClick={() => handleAddRemoveReaction({ reactionId, userLikedObj })}
        >
            <span>{emoji}</span>
            {isHover && <Tooltip title={emojiName} direction="top" distance={20} />}
        </div>
    )
}


const ReactionPopup = ({
    handleEmojiModal,
    contentId,
    reactionsGrp,
    handleAddRemoveReaction
}) => {
    const { id: userId } = useSelector(state => state.currentUser);
    const { items: reactions } = useSelector(state => state.reactions);

    useEffect(() => {
        document.addEventListener('click', () => handleEmojiModal(false))
        return () => document.removeEventListener('click', handleEmojiModal);
    }, [handleEmojiModal]);

    return (
        <div className="reactionPopup">
            {reactions?.map((item, itemIndex) => {
                return (
                    <React.Fragment key={item.id}>
                        <ReactionPopupItem
                            itemIndex={itemIndex}
                            reactionId={item.id}
                            emojiName={item.name}
                            emoji={item.emoji}
                            userId={userId}
                            contentId={contentId}
                            handleAddRemoveReaction={handleAddRemoveReaction}
                            reactionGrp={reactionsGrp[item?.id] || []}
                        />
                    </React.Fragment>
                )
            }
            )}
        </div>
    )
}

export default ReactionPopup
