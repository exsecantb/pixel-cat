import React from 'react';
import Cat from './Cat';
import Level from './Level';

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRestart: false,
            isFinish: false,
            distance: 0,
            maxDistance: null,
            currentLevel: 1
        };
        this.restartText = null;
        this.timeText = null;
        this.restartScore = null;
        this.scoreTable = [];
        this.levelCount = 0;
    }

    setLevelCount = (count) => {
        this.props.setLevelCount(count);
        this.levelCount = count;
    };

    handleDistanceChange = (newValue) => {
        this.setState({ distance: newValue });
    };

    handleDeath = (text) => {
        this.setState({
            isRestart: true
        });
        document.getElementById("hide_keyboard").style.opacity = 100;
        this.restartText = text;
        this.timeText = 'Your time';
        this.props.timer.stopStopwatch();
        this.restartScore = this.props.timer.formatTime(this.props.timer.state.time);
    };

    finishMessages = ["Level complete! Well done :)", "Nice work! Level accomplished.", "Skillfully done! Level finished.", "You're faster than a caffeinated squirrel!"];

    handleFinish = () => {
        this.setState({
            isRestart: true,
            isFinish: true
        });
        this.props.timer.stopStopwatch();
        if (this.props.timer.checkRecord()) {
            this.props.timer.setNewRecord();
            this.scoreTable = [];
            for (let i = 0; i < this.props.timer.records.length; i++) {
                if (this.props.timer.records[i] !== "00:00:00") {
                    this.scoreTable.push(this.props.timer.records[i]);
                } else { break; }
            }
            this.timeText = 'New record';
        } else {
            this.timeText = 'Your time';
        }
        this.restartScore = this.props.timer.formatTime(this.props.timer.state.time);
        document.getElementById("hide_keyboard").style.opacity = 100;
        this.restartText = this.finishMessages[Math.floor(Math.random() * this.finishMessages.length)];
    };

    callRestart = () => {
        this.setState({
            isRestart: false,
            distance: 0
        });
        document.getElementById("hide_keyboard").style.opacity = 0;
        this.childComponent.restartGame();
        setTimeout(() => {
            this.setState({
                isFinish: false
            });
        }, 500);
        this.props.timer.resetStopwatch();
        this.props.timer.startStopwatch();
    };

    callFinish = () => {
        document.getElementById("hide_keyboard").style.opacity = 0;
        this.props.updateLevel();
        this.setState((prevState) => ({
            currentLevel: prevState.currentLevel + 1,
            isRestart: false,
            distance: 0
        }));
        this.childComponent.restartGame();
        setTimeout(() => {
            this.setState({
                isFinish: false
            });
        }, 500);
        this.props.timer.resetStopwatch();
        this.props.timer.startStopwatch();
    };

    componentDidMount() {
        this.setState({
            maxDistance: document.getElementsByClassName('floor')[0].getBoundingClientRect().width - 0.7 * document.getElementsByClassName('field')[0].getBoundingClientRect().width + 5
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentLevel !== this.props.currentLevel) {
            this.setState({ currentLevel: this.props.currentLevel });
            this.callRestart();
            document.getElementById("tip_text").innerHTML = `Level ${this.props.currentLevel}`;
            document.getElementById("tip_text").style.opacity = 100;
            setTimeout(() => {
                document.getElementById("tip_text").style.opacity = 0;
            }, 2000);
        }
    }
    
    render() {
        return (<div className="field">
            <Cat currentCharacter={this.props.currentCharacter} maxFloorShift={this.state.maxDistance} onDistanceChange={this.handleDistanceChange} onDeath={this.handleDeath} onFinish={this.handleFinish} ref={ref => this.childComponent = ref}/>
            <div className="floor" style={{transform: `translate(-${this.state.distance}px)`}}>
                <Level isDay={this.props.isDay} number={this.state.currentLevel - 1} setLevelCount={this.setLevelCount}/>
            </div>

            {/* Shown only if game over */}
            <div className="restart_block" style={{ opacity: this.state.isRestart ? 100 : 0 }}>
                <div className="restart_text">
                    {this.restartText}
                    <div className="restart_score">{this.timeText} – {this.restartScore}</div>
                </div>
                <table className="score_table" style={{ display: this.state.isFinish ? "table" : "none"}}>
                    <thead>
                        <tr>
                            <td>Level</td>
                            <td>Best time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.scoreTable.map((record, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{record}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="restart_buttons">
                    <div className="restart_button" onClick={this.callRestart} style={{ pointerEvents: this.state.isRestart ? "auto" : "none" }}>Restart</div>
                    <div className="restart_button" onClick={this.callFinish} style={{ pointerEvents: this.state.isRestart ? "auto" : "none", display: this.state.isFinish && this.state.currentLevel < this.levelCount ? "flex" : "none"}}>Explore next</div>
                </div>
            </div>
        </div>)
    }
}

export default Field;
