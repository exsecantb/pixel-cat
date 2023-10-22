import React from 'react';

class SpeechBubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            current: 0
        };
        this.speeches = [
            ["I feel a bit lonely today...",
            "Gotta be careful here",
            "Bye-bye, yummy creatures!"],

            ["It seems that level is not created yet..."],

            ["It seems that level is not created yet..."],

            ["It seems that level is not created yet..."]
        ];
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentLevel !== this.props.currentLevel) {
            this.setState({ current: 0 });
        }
    }

    hardShutdown = () => {
        this.setState({ isShown: false });
    }

    showBubble = () => {
        this.setState((prevState) => ({
            isShown: true,
            current: prevState.current + 1
        }));
        console.log(this.props.currentLevel + ' ' + this.state.current)
        // Animated text
        let message = this.speeches[this.props.currentLevel][this.state.current];
        const delay = 115;
        const elem = document.getElementById("speech");
        elem.innerHTML = '';
        let print_text = (message, elem, delay) => {
            if (message.length > 0) {
                elem.innerHTML += message[0];
                setTimeout(
                    function() {
                        print_text(message.slice(1), elem, delay); 
                    },
                delay);
            } else {
                setTimeout(() => this.setState({ isShown: false }), 1000);
            }
        }
        print_text(message, elem, delay);
    };
    
    render() {
        return (
        <div className="bubble" style={{transform: `translate(${this.props.moveValue}px, 0px)`, opacity: (this.props.isAlive && this.state.isShown) ? '100' : '0'}}>
            <div id="speech"></div>
        </div>)
    }
}

export default SpeechBubble;