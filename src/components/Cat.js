import React from 'react';
import SpeechBubble from './SpeechBubble';

import blackIdle from '../icon/cat/black_idle_8fps.gif';
import blackWalking from '../icon/cat/black_walk_8fps.gif';
import blackJump from '../icon/cat/black_run_8fps.gif';
import blackRun from '../icon/cat/black_walk_fast_8fps.gif';
import blackStuck from '../icon/cat/black_swipe_8fps.gif';
import brownIdle from '../icon/cat/brown_idle_8fps.gif';
import brownWalking from '../icon/cat/brown_walk_8fps.gif';
import brownJump from '../icon/cat/brown_run_8fps.gif';
import brownRun from '../icon/cat/brown_walk_fast_8fps.gif';
import brownStuck from '../icon/cat/brown_swipe_8fps.gif';
import grayIdle from '../icon/cat/gray_idle_8fps.gif';
import grayWalking from '../icon/cat/gray_walk_8fps.gif';
import grayJump from '../icon/cat/gray_run_8fps.gif';
import grayRun from '../icon/cat/gray_walk_fast_8fps.gif';
import grayStuck from '../icon/cat/gray_swipe_8fps.gif';
import lightbrownIdle from '../icon/cat/lightbrown_idle_8fps.gif';
import lightbrownWalking from '../icon/cat/lightbrown_walk_8fps.gif';
import lightbrownJump from '../icon/cat/lightbrown_run_8fps.gif';
import lightbrownRun from '../icon/cat/lightbrown_walk_fast_8fps.gif';
import lightbrownStuck from '../icon/cat/lightbrown_swipe_8fps.gif';
import whiteIdle from '../icon/cat/white_idle_8fps.gif';
import whiteWalking from '../icon/cat/white_walk_8fps.gif';
import whiteJump from '../icon/cat/white_run_8fps.gif';
import whiteRun from '../icon/cat/white_walk_fast_8fps.gif';
import whiteStuck from '../icon/cat/white_swipe_8fps.gif';

class Cat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlive: true,
            isRight: true,
            isIdle: true,
            isWalking: false,
            isRunning: false,
            isJump: false,
            isStuck: false,
            isLimit: false,
            isFalling: false,
            currentCharacter: "Black",
            stamina: 100,
            distance: 0,
            shift: 0, // Platform distance to move
            speed: 7
        };
        this.moveStartTimestamp = null;
        this.moveId = null;
        this.staminaId = null;
        this.characterIcon = {
            "Black": {
                "Idle": blackIdle,
                "Walking": blackWalking,
                "Jump": blackJump,
                "Run": blackRun,
                "Stuck": blackStuck
            },
            "Brown": {
                "Idle": brownIdle,
                "Walking": brownWalking,
                "Jump": brownJump,
                "Run": brownRun,
                "Stuck": brownStuck
            },
            "Gray": {
                "Idle": grayIdle,
                "Walking": grayWalking,
                "Jump": grayJump,
                "Run": grayRun,
                "Stuck": grayStuck
            },
            "Lightbrown": {
                "Idle": lightbrownIdle,
                "Walking": lightbrownWalking,
                "Jump": lightbrownJump,
                "Run": lightbrownRun,
                "Stuck": lightbrownStuck
            },
            "White": {
                "Idle": whiteIdle,
                "Walking": whiteWalking,
                "Jump": whiteJump,
                "Run": whiteRun,
                "Stuck": whiteStuck
            }
        }
    }

    restartGame = () => {
        this.setState({
            isAlive: true,
            isRight: true,
            isIdle: true,
            isWalking: false,
            isRunning: false,
            isJump: false,
            isStuck: false,
            isLimit: false,
            isFalling: false,
            stamina: 100,
            distance: 0,
            shift: 0,
            speed: 7
        });
        this.moveStartTimestamp = null;
        this.moveId = null;
        this.staminaId = null;
        this.speechBubble.hardShutdown();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.currentCharacter !== this.props.currentCharacter) {
            this.setState({ currentCharacter: this.props.currentCharacter });
        }
    }

    handleKeyDown = (event) => {
        // Key is arrow
        if ((event.keyCode === 39 || event.keyCode === 37) && !this.state.isWalking && this.state.isAlive) {
            this.setState({
                isWalking: true,
                isIdle: false,
                speed: 7,
                isRight: (event.keyCode === 39)
            });
            this.moveStartTimestamp = performance.now();
            const direction = (event.keyCode === 39) ? "right" : "left"; // Check arrow direction
            this.moveId = requestAnimationFrame((timestamp) => this.moveCat(timestamp, direction));
        }
        // Key is space
        if (event.keyCode === 32 && !this.state.isJump && this.state.isAlive) {
            this.setState({
                isJump: true,
                isIdle: false
            });
            setTimeout(() => {
                this.setState({
                    isJump: false,
                    isIdle: true
                });
                // Checking if falling
                this.checkIfFalling(true);
            }, 1000);
        }
        // Key is shift
        if (event.keyCode === 16 && this.state.isWalking && !this.state.isJump && !this.state.isRunning) {
            this.setState({
                isRunning: true,
                speed: 4
            });
            cancelAnimationFrame(this.staminaId);
            this.animateStaminaDecrease();
        }
        // Adding active class
        if (event.keyCode === 39) {
            document.getElementById("arrow_right").classList.add('active');
            document.getElementById("arrow_l").style.opacity = 100;
        } else if (event.keyCode === 37) {
            document.getElementById("arrow_left").classList.add('active');
            document.getElementById("arrow_l").style.opacity = 100;
        } else if (event.keyCode === 32) {
            document.getElementById("space").classList.add('active');
            document.getElementById("space_l").style.opacity = 100;
        } else if (event.keyCode === 16) {
            document.getElementById("shift").classList.add('active');
            document.getElementById("shift_l").style.opacity = 100;
        }
    };
    
    handleKeyUp = (event) => {
        // Key is arrow
        if (event.keyCode === 39 || event.keyCode === 37) {
            this.setState({
                isWalking: false,
                isRunning: false,
                isIdle: true
            });
            cancelAnimationFrame(this.moveId);
            cancelAnimationFrame(this.staminaId);
            this.animateStaminaIncrease();
        }
        // Key is shift
        if (event.keyCode === 16 && this.state.isWalking) {
            this.setState({
                isRunning: false,
                speed: 7
            });
            cancelAnimationFrame(this.staminaId);
            this.animateStaminaIncrease();
        }
        // Removing active class
        if (event.keyCode === 39) {
            document.getElementById("arrow_right").classList.remove('active');
            document.getElementById("arrow_l").style.opacity = 0;
        } else if (event.keyCode === 37) {
            document.getElementById("arrow_left").classList.remove('active');
            document.getElementById("arrow_l").style.opacity = 0;
        } else if (event.keyCode === 32) {
            document.getElementById("space").classList.remove('active');
            document.getElementById("space_l").style.opacity = 0;
        } else if (event.keyCode === 16) {
            document.getElementById("shift").classList.remove('active');
            document.getElementById("shift_l").style.opacity = 0;
        }
    };
    
    moveCat = (timestamp, direction) => {
        if (this.state.isWalking && !this.state.isStuck && this.state.isAlive) {
            // Calculating needed values
            const control = document.getElementById('control');
            const elementLeft = calculateElementLeft(control);
            const elementRight = calculateElementRight(control);
            const borderLeft = 0.15 * window.innerWidth + 3;
            const borderRight = 0.85 * window.innerWidth - 40;
            const centerPosition = 0.5 * window.innerWidth;
            // Checking if is stuck on the border
            if ((elementLeft < borderLeft && !this.state.isRight) || (elementRight > borderRight && this.state.isRight)) {
                this.setState({
                    isStuck: true,
                    isWalking: false,
                    isRunning: false,
                    isJump: false
                });
                setTimeout(() => {
                    this.setState({
                        isStuck: false,
                        isWalking: false,
                        isRunning: false,
                        isIdle: true
                    });
                }, 1000);
                return;
            }
            // 1.1 Beginning - Grass should move right
            if (elementRight >= centerPosition && this.state.shift === 0 && !this.state.isLimit && direction === "right") {
                this.setState({
                    isLimit: true
                });
            }
            // 1.2 Beginning - Grass should stop moving
            if (this.state.shift === 0 && this.state.isLimit && direction === "left") {
                this.setState({
                    isLimit: false
                });
                this.props.onDistanceChange(0);
            }
            // 2.1 Ending - Grass should stop moving
            if (this.state.shift === this.props.maxFloorShift && this.state.isLimit && direction === "right") {
                this.setState({
                    isLimit: false
                });
                this.props.onDistanceChange(this.state.shift);
            }
            // 2.2 Ending - Grass should move left
            if (elementLeft <= centerPosition && this.state.shift === this.props.maxFloorShift && !this.state.isLimit && direction === "left") {
                this.setState({
                    isLimit: true
                });
            }
            // Not stuck case
            const timeElapsed = (timestamp - this.moveStartTimestamp) / this.state.speed;
            let distanceToMove = timeElapsed;
            if (direction === "left") { // Setting direction
                distanceToMove = -timeElapsed;
            }
            if (this.state.isLimit) { // Platform is moving
                let newShift = this.state.shift + distanceToMove;
                if (newShift < 0) {
                    newShift = 0;
                } else if (newShift > this.props.maxFloorShift) {
                    newShift = this.props.maxFloorShift;
                }
                this.setState({
                    shift: newShift
                });
                this.props.onDistanceChange(newShift);
            } else { // Cat is moving
                this.setState((prevState) => ({
                    distance: prevState.distance + distanceToMove
                }));
            }
            // Checking if falling
            this.checkIfFalling();
            // Checking if win
            this.checkIfWin(elementRight);
            this.moveStartTimestamp = timestamp;
            this.moveId = requestAnimationFrame((timestamp) => this.moveCat(timestamp, direction));
        }
    };
    
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        animateKeys();
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        cancelAnimationFrame(this.moveId);
        cancelAnimationFrame(this.staminaId);
    }

    checkIfFalling(isNotJumping) {
        const condition = isNotJumping ?? !this.state.isJump;
        const control = document.getElementById("control");
        let catCenter = calculateElementCenter(control);
        for (let water of document.getElementsByClassName("water")) {
            let waterLeft = calculateElementLeft(water);
            let waterRight = calculateElementRight(water);
            if (catCenter > waterLeft && catCenter < waterRight && condition) {
                // Checking if cat fits area
                if (catCenter - waterLeft <= control.getBoundingClientRect().width / 2) {
                    this.setState((prevState) => ({
                        distance: prevState.distance + control.getBoundingClientRect().width / 2
                    }));
                } else if (waterRight - catCenter <= control.getBoundingClientRect().width / 2) {
                    this.setState((prevState) => ({
                        distance: prevState.distance - control.getBoundingClientRect().width / 1.5
                    }));
                }
                this.setState({
                    isFalling: true,
                    isAlive: false
                });
                this.speechBubble.hardShutdown();
                this.props.onDeath("What happens if you mix cat and water?");
            }
        }
    }

    checkIfWin(catRight) {
        const finish = document.getElementsByClassName("checkpoint finish")[0];
        const finishCenter = calculateElementCenter(finish);
        if (catRight >= finishCenter) {
            this.setState({
                isAlive: false
            });
            this.speechBubble.hardShutdown();
            this.props.onFinish();
        } else {
            // Checking if bubble should be displayed
            this.checkBubble(catRight);
        }
    }

    checkBubble(catRight) {
        const bubbles = document.getElementsByClassName("show-bubble");
        if (bubbles.length > this.speechBubble.state.current) {
            const bubbleCenter = calculateElementCenter(bubbles[this.speechBubble.state.current]);
            if (catRight >= bubbleCenter && !this.speechBubble.state.isShown) {
                this.speechBubble.showBubble();
            }
        }
    }

    animateStaminaDecrease = () => {
        if (this.state.stamina <= 0) {
            this.setState({
                isRunning: false,
                speed: 7,
                stamina: 0
            });
            cancelAnimationFrame(this.staminaId);
            return;
        }
        this.setState((prevState) => ({
            stamina: prevState.stamina - 1,
        }));
        this.staminaId = requestAnimationFrame(this.animateStaminaDecrease);
    };
    
    animateStaminaIncrease = () => {
        if (this.state.stamina >= 100) {
            cancelAnimationFrame(this.staminaId);
            this.setState({
                stamina: 100
            });
            return;
        }    
        this.setState((prevState) => ({
            stamina: prevState.stamina + 1,
        }));
        this.staminaId = requestAnimationFrame(this.animateStaminaIncrease);
    };
    
    render() {
        const styleCat = {
            transform: `translate(${this.state.distance}px, 0px) scale(${this.state.isRight ? '1' : '-1'}, 1)`,
            bottom: `${
                this.state.isFalling ? '7px' : 
                this.state.isJump ? '60px' : '55px'
            }`
        };
        const controlJump = {
            height: '45px',
            bottom: '15px'
        };
        const controlWalk = {
            height: '45px'
        };

        return (<div>
            <SpeechBubble currentLevel={this.props.currentLevel} ref={ref => this.speechBubble = ref} moveValue={this.state.distance} isAlive={this.state.isAlive}/>
            <div className="cat" style={styleCat}>
                <div className="stamina_bar" style={{
                    background: `linear-gradient(90deg, var(--accent-color) 0%, var(--accent-color) ${this.state.stamina}%, var(--main-color) ${this.state.stamina}%, var(--main-color) 100%)`,
                    opacity: this.state.stamina === 100 ? '0' : '100'
                }}></div>
                <img src={
                    this.state.isStuck ? this.characterIcon[this.state.currentCharacter]["Stuck"] :
                    this.state.isJump ? this.characterIcon[this.state.currentCharacter]["Jump"] :
                    this.state.isRunning ? this.characterIcon[this.state.currentCharacter]["Run"] :
                    this.state.isWalking ? this.characterIcon[this.state.currentCharacter]["Walking"] : this.characterIcon[this.state.currentCharacter]["Idle"]
                } alt="Cat"/>
                <div id="control" style={
                    this.state.isJump ? controlJump : 
                    this.state.isWalking ? controlWalk : null
                }></div>
            </div>
        </div>)
    }
}

function calculateElementLeft(element) {
    const elementRect = element.getBoundingClientRect();
    const elementLeft = elementRect.left;
    return elementLeft;
}

function calculateElementRight(element) {
    const elementRect = element.getBoundingClientRect();
    const elementRight = elementRect.right;
    return elementRight;
}

function calculateElementCenter(element) {
    const elementRect = element.getBoundingClientRect();
    const elementCenter = elementRect.left + elementRect.width / 2;
    return elementCenter;
}

function animateKeys() {
    setTimeout(() => {
        document.getElementById("space").classList.add('active');
        document.getElementById("space").classList.add('active_animation');
        document.getElementById("space_l").style.opacity = 100;

        setTimeout(() => {
            document.getElementById("space").classList.remove('active');
            document.getElementById("space_l").style.opacity = 0;

            document.getElementById("shift").classList.add('active');
            document.getElementById("shift").classList.add('active_animation');
            document.getElementById("shift_l").style.opacity = 100;
            setTimeout(() => {
                document.getElementById("shift").classList.remove('active');
                document.getElementById("shift_l").style.opacity = 0;

                document.getElementById("arrow_right").classList.add('active');
                document.getElementById("arrow_right").classList.add('active_animation');
                document.getElementById("arrow_l").style.opacity = 100;
                setTimeout(() => {
                    document.getElementById("arrow_right").classList.remove('active');

                    document.getElementById("arrow_left").classList.add('active');
                    document.getElementById("arrow_left").classList.add('active_animation');
                    setTimeout(() => {
                        document.getElementById("arrow_left").classList.remove('active');
                        document.getElementById("arrow_l").style.opacity = 0;
                        setTimeout(() => {
                            const elements = document.getElementsByClassName('active_animation');
                            Array.from(elements).forEach((element) => {
                                element.classList.remove('active_animation');
                            });
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 400);
}

export default Cat;