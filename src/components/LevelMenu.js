import React from 'react';

class LevelMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLevel: 1,
            maxLevel: 1
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentLevel !== this.props.currentLevel) {
            this.setState({
                currentLevel: this.props.currentLevel,
                maxLevel: this.props.currentLevel > this.state.maxLevel ? this.props.currentLevel : this.state.maxLevel
            });
        }
    }

    handleClick = (index) => {
        if (index > this.state.maxLevel) {
            document.getElementById("tip_text").innerHTML = "Not so fast!";
            document.getElementById("tip_text").style.opacity = 100;
            setTimeout(() => {
                document.getElementById("tip_text").style.opacity = 0;
            }, 2000);
        } else if (index === this.state.currentLevel) {
            document.getElementById("tip_text").innerHTML = "You're already on this level. Keep going!";
            document.getElementById("tip_text").style.opacity = 100;
            setTimeout(() => {
                document.getElementById("tip_text").style.opacity = 0;
            }, 2000);
        } else {
            this.setState({
                currentLevel: index
            });
            for (let bubble of document.getElementsByClassName("show-bubble")) {
                bubble.style.opacity = 1;
            }
            this.props.setLevel(index);
        }
    };

    formLevelLine = () => {
        let levels = [];
        for (let i = 0; i < this.props.levelCount; i++) {
            let level = (<div className="level" onClick={() => this.handleClick(i + 1)}>{i+1}</div>);
            if (i === this.state.currentLevel - 1) {
                level = (<div className="current level" onClick={() => this.handleClick(i + 1)}>{i+1}</div>);
            } else if (i <= this.state.maxLevel - 1) {
                level = (<div className="past level" onClick={() => this.handleClick(i + 1)}>{i+1}</div>);
            }
            levels.push(level);
        }
        const levelLine = levels.map((level, index) => (
            <div key={index}>{level}</div>
        ))
        return levelLine;
    };
    
    render() {
        return (<div className="level_container">
            <div className="menu">
                {this.formLevelLine()}
            </div>
            <div id="tip_text">Tip: Use your keyboard</div>
        </div>)
    }
}

export default LevelMenu;
