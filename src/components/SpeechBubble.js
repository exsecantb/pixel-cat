import React from 'react';

const SpeechBubble = ({ moveValue, isAlive }) => {
    

    return (
        <div className="bubble" style={{transform: `translate(${moveValue}px, 0px)`, display: isAlive ? 'block' : 'none'}}>
            <div className="speech">I need to be careful...</div>
        </div>);
}

export default SpeechBubble;