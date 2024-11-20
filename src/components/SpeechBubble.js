import React from 'react';

/* Speeches are displayed sequentially according to
   the locations of their classes on the tip_line.  */

class SpeechBubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            current: 0
        };
        this.speeches = [
            ["I feel a bit lonely today...&I haven't seen my dear friend for a long time...",
            "What a wonderful field and...&her favorite sunflowers",
            "These bees don't seem safe at all!",
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
        // Animated text
        let message = this.speeches[this.props.currentLevel][this.state.current];
        const elem = document.getElementById("speech");
        elem.innerHTML = '';
        let print_text = (message, elem, delay) => {
            if (message.length > 0) {
                if (message[0] !== "&"){
                    elem.innerHTML += message[0];
                    setTimeout(
                        function() {
                            print_text(message.slice(1), elem, 85); 
                        },
                    delay);
                } else {  // Doubled speech
                    setTimeout(() => {
                        elem.innerHTML = message[1];
                        setTimeout(
                            function() {
                                print_text(message.slice(2), elem, 85); 
                            },
                        delay);
                    }, 800);
                }
                
            } else {
                setTimeout(() => this.setState({ isShown: false }), 1000);
            }
        }
        print_text(message, elem, 85);
    };
    
    render() {
        return (
        <div className="bubble" style={{transform: `translate(${this.props.moveValue}px, 0px)`, opacity: (this.props.isAlive && this.state.isShown) ? '100' : '0'}}>
            <div id="speech"></div>
        </div>)
    }
}

export default SpeechBubble;