import {React, useEffect, useState} from 'react';
import {TeamTile} from '../components/TeamTile';

import './HomePage.scss';

export const HomePage = () => {

  {/* Creating a state to make data available in the component.
  JSX can refer to this state and show the data */}

  const[teams, setTeams] = useState([]); {/* {} empty object will initialise Team state with empty object. It will handle undefine error*/}
  useEffect(
    () => {
      const fetchAllTeams = async() => {
        const response = await fetch(`http://localhost:8080/team`);
        const data = await response.json();
        setTeams(data);
      };
      fetchAllTeams();
    },[]       
  );    {/* Earlier an [] empty array is passed so that call will be made to useEffect only when things inside this array will change 
           Now we are passing teamName, because we want hook to be called when teamName changes  */}


    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name">IPL Dashboard</h1>
            </div>

            <div className="team-grid">
                {teams.map(team => <TeamTile teamName={team.teamName}/>)}
            </div>
        </div>

    );
}
