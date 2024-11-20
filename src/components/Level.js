import React, { useEffect, useMemo } from 'react';
import Tip from './Tip';

import start from '../icon/elements/day/start.svg';
import start_ from '../icon/elements/night/start.svg';
import finish from '../icon/elements/day/finish.svg';
import finish_ from '../icon/elements/night/finish.svg';
import sign from '../icon/elements/day/river.png';
import sign_ from '../icon/elements/night/river.png';
import bench from '../icon/elements/day/bench.png';
import bench_ from '../icon/elements/night/bench.png';
import bucket from '../icon/elements/day/bucket.png';
import bucket_ from '../icon/elements/night/bucket.png';
import fish1 from '../icon/elements/day/fish.gif';
import fish2 from '../icon/elements/day/fish2.gif';
import fish1_ from '../icon/elements/night/fish.gif';
import fish2_ from '../icon/elements/night/fish2.gif';
import flowers from '../icon/elements/day/flowers.png';
import flowers_ from '../icon/elements/night/flowers.png';
import sunflowers from '../icon/elements/day/sunflowers.png';
import sunflowers_ from '../icon/elements/night/sunflowers.png';
import donttouch from '../icon/elements/day/donttouch.png';
import donttouch_ from '../icon/elements/night/donttouch.png';
import honey from '../icon/elements/day/honey.png';
import honey_ from '../icon/elements/night/honey.png';
import bees from '../icon/elements/day/bees.gif';
import bees_ from '../icon/elements/night/bees.gif';
import forsale from '../icon/elements/day/forsale.png';
import forsale_ from '../icon/elements/night/forsale.png';
import beeflow from '../icon/elements/day/beeflow.png';
import beeflow_ from '../icon/elements/night/beeflow.png';


const Level = ({ number, setLevelCount, isDay }) => {
    const elementsKit = useMemo(() => {
        if (isDay) {  // Day theme
            return {
                "start": start,
                "finish": finish,
                "grass": "grass",
                "riverSign": sign,
                "bench": bench,
                "bucket": bucket,
                "fish": [fish1, fish2],
                "flowers": flowers,
                "sunflowers": sunflowers,
                "donttouch": donttouch,
                "honey": honey,
                "bees": bees,
                "forsale": forsale,
                "beeflow": beeflow
            };
        } else { // Night theme
            return {
                "start": start_,
                "finish": finish_,
                "grass": "grass night_grass",
                "riverSign": sign_,
                "bench": bench_,
                "bucket": bucket_,
                "fish": [fish1_, fish2_],
                "flowers": flowers_,
                "sunflowers": sunflowers_,
                "donttouch": donttouch_,
                "honey": honey_,
                "bees": bees_,
                "forsale": forsale_,
                "beeflow": beeflow_
            };
        }
    }, [isDay]);

    /*
        All the decorations should be positioned relative to the boundaries of their platform.
        The relative positioning rule does not apply to start and finish flags.
    */

    const level1 = (<div className="elements_line">
        <div className={elementsKit["grass"]} style={{width: "6000px"}}>
            <img alt="Start" className="checkpoint start" src={elementsKit["start"]}></img>
            <div className="show-bubble" style={{left: "220px"}}>?</div>
            <Tip leftValue="calc(70vw - 200px)" tipText="START→" size="30px"/>
            <img alt="Flowers" className="decor" style={{left: "2000px", maxWidth: "950px"}} src={elementsKit["flowers"]}></img>
            <div className="show-bubble" style={{left: "2514px"}}>?</div>
            <img alt="Sunflowers" className="decor" style={{left: "2050px", maxWidth: "290px"}} src={elementsKit["sunflowers"]}></img>
            <img alt="Don't touch" className="decor" style={{left: "2060px", maxWidth: "90px"}} src={elementsKit["donttouch"]}></img>
            <img alt="Sunflowers" className="decor" style={{left: "2070px", maxWidth: "290px"}} src={elementsKit["sunflowers"]}></img>
            <img alt="For Sale" className="decor" style={{left: "2200px", maxWidth: "65px"}} src={elementsKit["forsale"]}></img>
            <img alt="Honey" className="decor" style={{left: "2220px", maxWidth: "140px"}} src={elementsKit["honey"]}></img>
            <img alt="Safe Bees" className="decor" style={{left: "2115px", bottom: "110px", maxWidth: "70px"}} src={elementsKit["bees"]}></img>
            <Tip leftValue="2215px" tipText="PRESS SHIFT→" size="30px"/>
            <div className="show-bubble" style={{left: "4677px"}}>?</div>
            <img alt="Flowers" className="decor" style={{left: "2250px", maxWidth: "950px"}} src={elementsKit["flowers"]}></img>
            <img alt="Flower for Bees" className="decor" style={{left: "1670px", bottom: "23px", maxWidth: "60px"}} src={elementsKit["beeflow"]}></img>
            <img alt="Bees" id="bee1" className="decor bee" style={{left: "1605px", bottom: "125px", maxWidth: "70px"}} src={elementsKit["bees"]}></img>
            <img alt="Flower for Bees" className="decor" style={{left: "1950px", bottom: "23px", maxWidth: "60px"}} src={elementsKit["beeflow"]}></img>
            <img alt="Bees" id="bee2" className="decor bee" style={{left: "1885px", bottom: "125px", maxWidth: "70px"}} src={elementsKit["bees"]}></img>
            <img alt="Sign" className="decor" style={{left: "2120px", maxWidth: "80px"}} src={elementsKit["riverSign"]}></img>
            <img alt="Bench" className="decor" style={{left: "2170px", maxWidth: "200px"}} src={elementsKit["bench"]}></img>
            <div className="show-bubble" style={{left: "5935px"}}>?</div>
        </div>
        <div className="water" style={{ width: 120 }}>
            <img className="fish" src={elementsKit["fish"][0]} alt="Fish"></img>
        </div>
        <div className={elementsKit["grass"]} style={{ width: 90 }}>
            <img className="decor" id="bucket" style={{left: "10px", maxWidth: "120%"}} src={elementsKit["bucket"]} alt="Bucket"></img>
        </div>
        <div className="water" style={{ width: 120 }}>
            <img className="fish" src={elementsKit["fish"][1]} alt="Fish"></img>
        </div>
        <div className={elementsKit["grass"]} style={{ width: 600 }}>
            <div className="show-bubble" style={{left: "6400px"}}>?</div>
            <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
        </div>
    </div>);

    const level2 = (<div className="elements_line">
        <div className={elementsKit["grass"]} id="first_platform" style={{ width: "70vw" }}>
            <img className="checkpoint start" src={elementsKit["start"]} alt="Start"></img>
            <div className="show-bubble" style={{left: "220px"}}>?</div>
            <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
        </div>
    </div>);

    const level3 = (<div className="elements_line">
        <div className={elementsKit["grass"]} id="first_platform" style={{ width: "70vw" }}>
            <img className="checkpoint start" src={elementsKit["start"]} alt="Start"></img>
            <div className="show-bubble" style={{left: "220px"}}>?</div>
            <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
        </div>
    </div>);

    const level4 = (<div className="elements_line">
        <div className={elementsKit["grass"]} id="first_platform" style={{ width: "70vw" }}>
            <img className="checkpoint start" src={elementsKit["start"]} alt="Start"></img>
            <div className="show-bubble" style={{left: "220px"}}>?</div>
            <img className="checkpoint finish" src={elementsKit["finish"]} alt="Finish"></img>
        </div>
    </div>);

    const levels = [level1, level2, level3, level4];

    useEffect(() => {
        setLevelCount(levels.length);
    }, [setLevelCount, levels.length]);

    return levels[number];
}

export default Level;