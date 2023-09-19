import React from 'react';
import day from '../icon/day.svg';
import night from '../icon/night.svg';

function setNightTheme() {
    const root = document.getElementsByTagName('html')[0];
    // Setting color variables
    root.style.setProperty('--main-color', '#222222');
    root.style.setProperty('--accent-color', '#b9b9b9');
    root.style.setProperty('--transparent-color', '#22222296');
    root.style.setProperty('--hover-color', '#383838');
}

function setDayTheme() {
    const root = document.getElementsByTagName('html')[0];
    // Setting color variables
    root.style.setProperty('--main-color', '#fff');
    root.style.setProperty('--accent-color', '#000');
    root.style.setProperty('--transparent-color', '#ffffff96');
    root.style.setProperty('--hover-color', '#eaeaea');
}

class ThemeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDay: true
        };
    }

    handleClick = () => {
        this.setState((prevState) => ({
            isDay: !prevState.isDay
        }));
        this.props.onThemeChange(!this.state.isDay);
        
        if (this.state.isDay) {
            setNightTheme();
        } else {
            setDayTheme();
        }
    };
    
    render() {
        return (<div className="slider" onClick={this.handleClick}>
            <img src={this.state.isDay ? day : night} alt="Theme"/>
        </div>)
    }
}

export default ThemeSlider;
