import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            currentLevel: 1,
            isRunning: false,
            isWorse: false
        };
        this.timer = null;
        this.records = ["00:00:00"];
    }

    componentDidMount () {
        if (!this.timer) {
            this.startStopwatch();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.levelCount !== this.props.levelCount) {
            for (let i = this.records.length; i < this.props.levelCount; i++) {
                this.records.push("00:00:00");
            }
        }
        if (prevProps.currentLevel !== this.props.currentLevel) {
            this.setState({
                currentLevel: this.props.currentLevel
            });
        }
        if (prevState.time !== this.state.time && !this.state.isWorse && this.state.isRunning) {
            if (!this.checkRecord()) {
                this.setState({
                    isWorse: true
                });
            }
        }
    }

    startStopwatch = () => {
        this.timer = setInterval(() => {
            this.setState((prevState) => ({ time: prevState.time + 1000 }));
        }, 1000);
        this.setState({ isRunning: true });
    };

    stopStopwatch = () => {
        clearInterval(this.timer);
        this.setState({
            isRunning: false,
            isWorse: false
        });
    };
    
    resetStopwatch = () => {
        clearInterval(this.timer);
        this.setState({ time: 0, isRunning: false, isWorse: false });
    };

    checkRecord = () => {
        if (this.records[this.state.currentLevel - 1] === "00:00:00") {
            return true;
        } else {
            // Calculating current time
            const currentTime = this.formatTime(this.state.time);
            const currentHours = parseInt(currentTime.slice(0, 2));
            const currentMinutes = parseInt(currentTime.slice(3, 5));
            const currentSeconds = parseInt(currentTime.slice(6, 8));
            const currentSecondsCount = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
            // Calculating record time
            const recordHours = parseInt(this.records[this.state.currentLevel - 1].slice(0, 2));
            const recordMinutes = parseInt(this.records[this.state.currentLevel - 1].slice(3, 5));
            const recordSeconds = parseInt(this.records[this.state.currentLevel - 1].slice(6, 8));
            const recordSecondsCount = recordHours * 3600 + recordMinutes * 60 + recordSeconds;
            if (currentSecondsCount < recordSecondsCount) {
                return true;
            } else {
                return false;
            }
        }
    };

    setNewRecord = () => {
        this.records[this.state.currentLevel - 1] = this.formatTime(this.state.time);
    };
    
    formatTime = (time) => {
        const hours = Math.floor((time / 1000 / 60 / 60) % 24);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
    
        return `${this.addLeadingZero(hours)}:${this.addLeadingZero(minutes)}:${this.addLeadingZero(seconds)}`;
    };
    
    addLeadingZero = (number) => {
        return number < 10 ? `0${number}` : number;
    };
    
    render() {
        const style = {
            animation: this.state.isWorse ? "timeIsUp 1.5s infinite linear" : "none"
        };
        return (<div className="stopwatch">
            <span className="current_time" style={style}>
                {this.formatTime(this.state.time)}</span> / {this.records[this.state.currentLevel - 1]}
        </div>)
    }
}

export default Timer;
