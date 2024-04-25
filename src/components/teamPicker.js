import React, { useState, useEffect } from 'react';

export default function TeamPicker({ pickerMessage, teamList, updateKey, setTeam}) {

    const [selectedTeam, setSelectedTeam] = useState(teamList[0].team.id);

    useEffect(() => setSelectedTeam(teamList[0].team.id), [teamList]);

    function changeTeamSelect(event) {
        setSelectedTeam(event.target.value);
    };

    function teamSubmit() {
        setTeam(updateKey, selectedTeam);
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
                    {teamList.map(team => <option key = { team.team.id } value={ team.team.id }>{ team.team.name }</option>)}
                </select>
                <button type="button" className="team-select-submit-button" onClick={ teamSubmit }>Submit</button>
            </div>
        </div>
    )
} 