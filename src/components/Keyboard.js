import React from 'react';

class Keyboard extends React.Component {
    render() {
        return (<div className="keyboard">
            <label><div className="key" id="shift">Shift</div><span id="shift_l">Speed up</span></label>
            <label><div className="key" id="space">SPACE</div><span id="space_l">Jump</span></label>
            <label><div className="arrows">
                <div className="key" id="arrow_left">🠔</div>
                <div className="key" id="arrow_right">🠖</div>
            </div><span  id="arrow_l">Walking</span></label>
            <div id="hide_keyboard"></div>
        </div>);
    }
}

export default Keyboard;
