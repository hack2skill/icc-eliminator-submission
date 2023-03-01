import React from 'react'
import { TransactionGraph } from './graph.component';
import "./mainframe.component.css";
import Players from './players.component';


const MainFrame = () => {
    return (
        <div className='mainframe-container'>
            <div className="title">
                Final: New Zealand vs Australia
            </div>
            <div className="desc">
                Australia won by 8 wickets
            </div>
            <Players />
            <div className="title" style={{ margin: '20px 0' }}>Runs Scored Overwise </div>
            <div className="desc">
                Runs Vs OverPeriod
            </div>
            <TransactionGraph />

        </div>
    )
}

export default MainFrame