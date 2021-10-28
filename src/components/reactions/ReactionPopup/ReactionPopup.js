import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addUserContentReactions } from '../../../redux/actions';
import Tooltip from '../../Tooltip/Tooltip';

import './style.css'

const ReactionPopupItem = ({
    reactionId,
    emoji,
    emojiName,
    handleReactionsAdd,
    contentId,
    userId
}) => {
    const [isHover, setIsHover] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`reactionItem ${isHover ? 'hoverOnEmoji' : ''}`}
            onClick={() => handleReactionsAdd({
                user_id: userId,
                reaction_id: reactionId,
                content_id: contentId
            })}
        >
            <span>{emoji}</span>
            {isHover && <Tooltip title={emojiName} direction="top" distance={20} />}
        </div>
    )
}


const ReactionPopup = ({
    handleEmojiModal,
    contentId,
    reactionsFiltered
}) => {
    const { id: userId } = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    const handleReactionsAdd = useCallback(({ user_id, reaction_id, content_id }) => {
        dispatch(addUserContentReactions({ user_id, reaction_id, content_id }))
    }, [dispatch]);

    useEffect(() => {
        document.addEventListener('click', () => handleEmojiModal(false))
        return () => document.removeEventListener('click', handleEmojiModal);
    }, [handleEmojiModal]);

    return (
        <div className="reactionPopup">
            {reactionsFiltered?.map((item, itemIndex) => (
                <React.Fragment key={item.id}>
                    <ReactionPopupItem
                        itemIndex={itemIndex}
                        reactionId={item.id}
                        emojiName={item.name}
                        emoji={item.emoji}
                        userId={userId}
                        contentId={contentId}
                        handleReactionsAdd={handleReactionsAdd}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export default ReactionPopup
