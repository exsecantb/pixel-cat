import React from 'react';
import day from '../icon/elements/day/day.svg';
import night from '../icon/elements/night/night.svg';
import winter from '../icon/elements/night/winter.svg';


function setTheme(theme) {
    const root = document.getElementsByTagName('html')[0];
    if (theme === "day") {
        // Setting color variables
        root.style.setProperty('--main-color', '#fff');
        root.style.setProperty('--accent-color', '#000');
        root.style.setProperty('--transparent-color', '#ffffff96');
        root.style.setProperty('--hover-color', '#eaeaea');
    } else {
        if (theme === "night") {
            root.style.setProperty('--main-color', '#222222');
            root.style.setProperty('--transparent-color', '#22222296');
            root.style.setProperty('--hover-color', '#383838');
        } else {
            root.style.setProperty('--main-color', '#141d27');
            root.style.setProperty('--transparent-color', '#141d2796');
            root.style.setProperty('--hover-color', '#1d2a38');
        }
        root.style.setProperty('--accent-color', '#b9b9b9');
    }
}

class ThemeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDay: !!(localStorage.getItem("isDay") ?? true),
            theme: localStorage.getItem("theme") ?? "day"
        };
        this.icons = {
            "day": day,
            "night": night,
            "winter": winter
        }
    }

    componentDidMount() {
        if (!this.state.isDay) {
            setTheme(this.state.theme);
        } else {
            localStorage.setItem("isDay", "1");
            localStorage.setItem("theme", "day");
        }
    }

    handleClick = () => {
        switch (this.state.theme) {
            case "day":
                this.setState((prevState) => ({
                    isDay: !prevState.isDay,
                    theme: "night"
                }));
                setTheme("night");
                localStorage.setItem("isDay", "");
                localStorage.setItem("theme", "night");
                this.props.onThemeChange(!this.state.isDay);
                break;
            case "night":
                this.setState({ theme: "winter" });
                setTheme("winter");
                localStorage.setItem("theme", "winter");
                break;
            case "winter":
                this.setState((prevState) => ({
                    isDay: !prevState.isDay,
                    theme: "day"
                }));
                setTheme("day");
                localStorage.setItem("isDay", "1");
                localStorage.setItem("theme", "day");
                this.props.onThemeChange(!this.state.isDay);
                break;
            default:
                break;
        }
    };
    
    render() {
        return (<div className="slider" onClick={this.handleClick}>
            <img src={this.icons[localStorage.getItem("theme")] ?? day} alt="Theme"/>
        </div>)
    }
}

export default ThemeSlider;
