import React from 'react';

const Tip = ({ leftValue, tipText, size }) => {
    const tip = (
    <div className="tip" style={{left: leftValue, fontSize: size}}>
        <div className="text">{tipText}</div>
    </div>);

    return tip;
}

export default Tip;