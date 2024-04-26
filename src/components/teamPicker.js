import React, { useState, useEffect } from 'react';

export default function TeamPicker({ pickerMessage, teamList, updateKey, setTeam}) {

    const [selectedTeamId, setSelectedTeamId] = useState(teamList[0].team.id);

    useEffect(() => setSelectedTeamId(teamList[0].team.id), [teamList]);

    function changeTeamSelect(event) {
        setSelectedTeamId(event.target.value);
    };

    function teamSubmit() {
        setTeam(updateKey, selectedTeamId);
    };

    return (
        <div className="picker-container my-border">
            <div className="picker-header">
                { pickerMessage }
            </div>
            <div className="picker">
                <select size="8"
                    value={ selectedTeamId } 
                    onChange={ changeTeamSelect } 
                >
                    {teamList.map(team => <option key = { team.team.id } value={ team.team.id }>{ team.team.name }</option>)}
                </select>
                <br></br>
                <button type="button" className="team-select-submit-button" onClick={ teamSubmit }>Submit</button>
            </div>
        </div>
    )
} 