import {React, useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

  {/* Creating a state to make data available in the component.
  JSX can refer to this state and show the data */}

  const[team, setTeam] = useState({matches : []}); {/* {} empty object will initialise Team state with empty object. It will handle undefine error*/}
  const{teamName} = useParams();
  {/* 
    Making REST Api call 
    We are using useEffect so that API call can be made when this component loads
  */}
  useEffect(
    () => {
      const fetchTeam = async() => {
        const response = await fetch(`http://localhost:8080/team/${teamName}`);
        const data = await response.json();
        setTeam(data);
      };
      fetchTeam();
    },[teamName]       
  );    {/* Earlier an [] empty array is passed so that call will be made to useEffect only when things inside this array will change 
           Now we are passing teamName, because we want hook to be called when teamName changes  */}

  if(!team || !team.teamName){
    return <h1>Team Not Found!</h1>
  }

    return (
      <div className="TeamPage">
        <div className="team-name-section">
          <h1 className="team-name">{team.teamName}</h1>
        </div>
        <div className="win-loss-section">
          Wins / Losses
          <PieChart
              data={[
                { title: 'Wins', value: team.totalWins, color: '#38CC77' },
                { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#E21717' }
              ]}
          />
        </div>
        <div className="match-detail-section">
          <h3>Latest Matches</h3>
          <MatchDetailCard teamName={team.teamName} match = {team.matches[0]}/>
        </div>
        {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match}/>)}
        <div className="more-link">
          <Link to ={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More &gt;</Link>
        </div>
        </div>

    );
}
