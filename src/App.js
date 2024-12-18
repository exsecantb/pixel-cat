import React from 'react';
import OnImagesLoaded from 'react-on-images-loaded';
import Field from './components/Field';
import Keyboard from './components/Keyboard';
import LevelMenu from './components/LevelMenu';
import Timer from './components/Timer';
import ChangeCharacter from './components/ChangeCharacter';
import ThemeSlider from './components/ThemeSlider';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levelCount: 0,
            currentLevel: 1,
            isLoading: true,
            isDay: !!(localStorage.getItem("isDay") ?? true),
            currentCharacter: "Black"
        };
    }

    handleLoad = () => {
        this.setState({ isLoading: false });
    };

    setLevelCount = (count) => {
        this.setState({ levelCount: count });
    };

    handleLevelChange = (number) => {
        this.setState({ currentLevel: number });
    };

    updateLevel = () => {
        this.setState((prevState) => ({
            currentLevel: prevState.currentLevel + 1
        }));
    };

    updateCharacter = (name) => {
        this.setState({ currentCharacter: name });
    };

    handleThemeChange = (theme) => {
        this.setState({ isDay: theme });
    };

    componentDidMount() {
        document.getElementById("tip_text").innerHTML = "Tip: Use your keyboard";
        document.getElementById("tip_text").style.opacity = 100;
        setTimeout(() => {
            document.getElementById("tip_text").style.opacity = 0;
        }, 3000);
    }
    
    render() {
        return (<OnImagesLoaded onLoaded={this.handleLoad}>
            <div>
                <div className="plug">This game only works on wide screens. Please change your device.</div>
                <div className="loader_plug" style={{display: this.state.isLoading ? 'flex' : 'none'}}>
                    <div className="loader"></div>
                </div>
                <div className="header">
                    <div className="customizer">
                        <ChangeCharacter onCharacterChange={this.updateCharacter}/>
                        <ThemeSlider onThemeChange={this.handleThemeChange}/>
                    </div>
                    <LevelMenu setLevel={this.handleLevelChange} levelCount={this.state.levelCount} currentLevel={this.state.currentLevel}/>
                    <div className="right_panel">
                        <Timer ref={timerRef => this.timerComponent = timerRef} currentLevel={this.state.currentLevel} levelCount={this.state.levelCount}/>
                    </div>
                </div>
                <div className="wrapper">
                    <Field isDay={this.state.isDay} currentCharacter={this.state.currentCharacter} timer={this.timerComponent} currentLevel={this.state.currentLevel} setLevelCount={this.setLevelCount} updateLevel={this.updateLevel}/>
                    <Keyboard />
                </div>
                <div className="footer">
                    <div className="info">
                        Developed by <a href="https://github.com/exsecantb/pixel-cat" target="_blank" rel="noreferrer">@exsecantb</a>,<br/>August 2023
                    </div>
                </div>
            </div>
        </OnImagesLoaded>)
    }
}

export default App;
