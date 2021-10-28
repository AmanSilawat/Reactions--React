import React, { useState } from 'react';

import svg from './fill.svg'
import ReactionPopup from '../ReactionPopup/ReactionPopup';

import './style.css';

const ReactionTrigger = ({ contentId, reactionsFiltered }) => {
    const [isReactionTrigger, setIsReactionTrigger] = useState(false);

    const handleEmojiModal = (bool) => {
        setIsReactionTrigger(bool);
    }

    return (
        <button className="btnSty" onClick={(e) => {
            e.stopPropagation()
            handleEmojiModal(!isReactionTrigger)
        }}>
            {isReactionTrigger && <ReactionPopup
                handleEmojiModal={handleEmojiModal}
                contentId={contentId}
                reactionsFiltered={reactionsFiltered}
            />}
            <img src={svg} alt="smile_trigger" />
        </button>
    )
}

export default ReactionTrigger
