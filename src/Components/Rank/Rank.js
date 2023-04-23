import React from "react";
import './rank.css'


const Rank = ({name,entries}) =>{


    return(
        <div className="rank-section">
            <div className="white rank-text">
                {`${name}, your entry count is...`}
            </div>
            <div className="white fw6 rank-count">
                {entries}
            </div>
        </div>
    );
}

export default Rank;