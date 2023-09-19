import React, { useEffect, useMemo } from 'react';
import Tip from './Tip';

import start from '../icon/start.svg';
import startNight from '../icon/start_night.svg';
import finish from '../icon/finish.svg';
import finishNight from '../icon/finish_night.svg';
import sign from '../icon/river.png';
import signNight from '../icon/river_night.png';
import bench from '../icon/bench.png';
import benchNight from '../icon/bench_night.png';
import bucket from '../icon/bucket.png';
import bucketNight from '../icon/bucket_night.png';
import fish1 from '../icon/fish.gif';
import fish2 from '../icon/fish2.gif';
import fishNight1 from '../icon/fish_night.gif';
import fishNight2 from '../icon/fish_night2.gif';


const Level = ({ number, setLevelCount, isDay }) => {
    const elementsKit = useMemo(() => {
        if (isDay) {
            return {
                "start": start,
                "finish": finish,
                "grass": "grass",
                "riverSign": sign,
                "bench": bench,
                "bucket": bucket,
                "fish": [fish1, fish2]
            };
        } else {
            return {
                "start": startNight,
                "finish": finishNight,
                "grass": "grass night_grass",
                "riverSign": signNight,
                "bench": benchNight,
                "bucket": bucketNight,
                "fish": [fishNight1, fishNight2]
            };
        }
    }, [isDay]);

    const level1 = (<div>
        <div className="tip_line">
            <Tip leftValue="calc(70vw - 180px)" tipText="START→" size="30px"/>
            <Tip leftValue="200px" tipText="Oh..." size="24px"/>
        </div>
        <div className="obstacles_line">
            <div className={elementsKit["grass"]} style={{width: "calc(70vw + 800px)"}}>
                <img className="checkpoint start" src={elementsKit["start"]} alt="Start"></img>
                <img className="decor" id="sign" style={{left: "1250px", width: "80px"}} src={elementsKit["riverSign"]} alt="Sign"></img>
                <img className="decor" id="bench" style={{left: "1380px", width: "200px"}} src={elementsKit["bench"]} alt="Bench"></img>
            </div>
            <div className="water" style={{ width: 140 }}>
                <img className="fish" style={{left: "1720px"}} src={elementsKit["fish"][0]} alt="Fish"></img>
            </div>
            <div className={elementsKit["grass"]} style={{ width: 90 }}>
                <img className="decor" id="bucket" style={{left: "1855px", width: "100px"}} src={elementsKit["bucket"]} alt="Bucket"></img>
            </div>
            <div className="water" style={{ width: 140 }}>
                <img className="fish" style={{left: "1950px"}} src={elementsKit["fish"][1]} alt="Fish"></img>
            </div>
            <div className={elementsKit["grass"]} style={{ width: 400 }}>
                <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
            </div>
        </div>
    </div>);

    const level2 = (<div>
        <div className="tip_line">
            
        </div>
        <div className="obstacles_line">
            <div className={elementsKit["grass"]} id="first_platform">
                <img className="checkpoint start" src={elementsKit["start"]} alt="Start"></img>
                <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
            </div>
        </div>
    </div>);

    const level3 = (<div>
        <div className="tip_line">
            
        </div>
            <div className="obstacles_line">
                <div className={elementsKit["grass"]} id="first_platform">
                    <img className="checkpoint start" src={elementsKit["start"]} alt="Start"></img>
                    <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
                </div>
            </div>
    </div>);

    const level4 = (<div>
        <div className="tip_line">
            
        </div>
            <div className="obstacles_line">
                <div className={elementsKit["grass"]} id="first_platform">
                    <img className="checkpoint start" src={elementsKit["start"]} alt="Start"></img>
                    <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
                </div>
            </div>
    </div>);

    const levels = [level1, level2, level3, level4];

    useEffect(() => {
        setLevelCount(levels.length);
    }, [setLevelCount, levels.length]);

    return levels[number];
}

export default Level;