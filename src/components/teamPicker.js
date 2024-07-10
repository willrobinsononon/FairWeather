import React, { useState, useEffect } from 'react';

export default function TeamPicker({ pickerMessage, teamList, updateKey, setTeam}) {

    const [selectedTeamId, setSelectedTeamId] = useState(teamList[0].team.id);
    const [formError, setFormError] = useState(false);

    useEffect(() => {
        setSelectedTeamId(teamList[0].team.id);
        setFormError('');
    }, [teamList]);

    function changeTeamSelect(event) {
        setSelectedTeamId(event.target.value);
    };

    function teamSubmit() {
        if (teamList.find((team) => team.team.id === Number(selectedTeamId))) {
            setTeam(updateKey, selectedTeamId);
        }
        else {
            setFormError('Invalid selection, please try again');
        }
    };

    return (
        <div className="picker-container my-border">
            <div className="picker-header">
                { formError && <p className = "team-picker-error">{ formError }</p>}
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