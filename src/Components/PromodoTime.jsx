import React, { useState, useEffect} from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Meme from '../assets/NoStart.png';

const PromodoTime = ( {isStart = false}) => {



    const totalTime = 25 * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(()=> {
        if(!isStart || timeLeft === 0 ) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);            
        }, 1000);
        return () => clearInterval(timer);
    }, [isStart]);

    const percentage = ((totalTime - timeLeft) / totalTime) * 100;

    const formatTime = second => {
        const m  = String(Math.floor(second / 60)).padStart(2, '0');
        const s = String(second % 60).padStart(2, '0');
        return `${m}:${s}`
    };


  return (
    
    <div style={{width: 250, height: 200}}>
      {isStart ? (
            <CircularProgressbarWithChildren
                value={percentage}
                text={formatTime(timeLeft)}
                    styles={buildStyles({
                    pathColor: '#8b5cf6',
                    textColor: '#ffffff',
                    trailColor: '#4b5563',
                    backgroundColor: '#1f2937',
                    })}
                
                >
                </CircularProgressbarWithChildren>
      ) : (
            <div>
                <img style={{ width: 500, height: 300, marginTop: -10 }} src={Meme} alt="Not Starter Meme" />
            </div>
      )}
     
    </div>
  )
}

export default PromodoTime
