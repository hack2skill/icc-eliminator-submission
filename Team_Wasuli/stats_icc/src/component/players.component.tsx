import React from 'react'
import data from "../australianCricketer.json"
const Players = () => {
    const player = data.players;
    return (
        <div className="player-container">
            {
                player.map((plr) => {
                    return (<div className="player">
                        <div>
                            <img src={plr.photo} />
                        </div>
                        <div className="player-desc">
                            <span>{plr.name}</span>
                            <span style={{ opacity: '0.3', fontSize: '10px' }}>{plr.role}</span>
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

export default Players