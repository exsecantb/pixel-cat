import React from 'react';
import blackIcon from '../icon/cat/black_icon.png';
import brownIcon from '../icon/cat/brown_icon.png';
import grayIcon from '../icon/cat/gray_icon.png';
import lightbrownIcon from '../icon/cat/lightbrown_icon.png';
import whiteIcon from '../icon/cat/white_icon.png';

class ChangeCharacter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentName: "Black",
            isExpanded: false
        };
        this.characters = [
            ["Black", blackIcon],
            ["Brown", brownIcon],
            ["Gray", grayIcon],
            ["Lightbrown", lightbrownIcon],
            ["White", whiteIcon]
        ];
    }

    handleDocumentClick = (event) => {
        const isCharacters = event.target.classList.contains('x');
        if (!isCharacters) {
            this.setState({
                isExpanded: false
            });
        }
    };
    
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleClick = () => {
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded
        }));
    };

    handleCharacterChange = (name) => {
        this.setState({
            currentName: name,
            isExpanded: false
        });
        document.querySelector(".cat img").style.filter = "saturate(0)";
        setTimeout(() => {
            this.props.onCharacterChange(name);
            document.querySelector(".cat img").style.filter = "saturate(1)";
        }, 700);
    };
    
    render() {
        return (<div className="x">
            <div className="choose_panel x" onClick={this.handleClick}>
                <div className="x">Character</div>
                <div className="x">▼</div>
            </div>
            <div className="characters x" style={{display: this.state.isExpanded ? "flex" : "none"}}>
                {this.characters.map((char, index) => (
                    <div className="character_name x" key={index} onClick={() => this.handleCharacterChange(char[0])}>
                        {char[0]}
                        <img src={char[1]} alt="Cat" className="x"/>
                    </div>
                ))}
            </div>
        </div>)
    }
}

export default ChangeCharacter;
