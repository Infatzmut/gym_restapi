import React from 'react';
import '../styles/Main.css';

const Main = () => {
    return (
        <div className="main-landing">
             <img src="/img/gym-guy.gif" />
             <div className="landing-title">
                 <h1 className="fitness">
                     Fitness
                 </h1>
                 <h1 className="workout">Workout</h1>
             </div>
        </div>
    )
}
export default Main;