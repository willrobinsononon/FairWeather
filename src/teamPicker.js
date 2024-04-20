import React, { useState, useEffect } from 'react';

export default function TeamPicker({ pickerMessage, teamList }) {

    const [selectedTeam, setSelectedTeam] = useState(teamList[0]);

    function changeTeamSelect(event) {
        setSelectedTeam(event.target.value);
    };

    return (
        <div className="picker-container my-border">
            <div className="picker-header">
                { pickerMessage }
            </div>
            <div className="picker">
            <select size="6"
                value={ selectedTeam } 
                onChange={ changeTeamSelect } 
            >
                {teamList.map(team => <option>{ team }</option>)}
            </select>
            <button type="button">Submit</button>
            </div>

        </div>
    )
} 