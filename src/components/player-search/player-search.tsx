import React, {useState} from 'react';
import './player-search.css';
import {selectSearchedPlayers, selectSelectedPlayers} from "../../store/teams-slice";
import {useAppSelector} from "../../utils/hooks/hooks";
import {splitPlayerList} from "../../utils/player-helper";
import {PlayerCard} from "../player-card/player-card";

export function PlayerSearch() {

    const searchedPlayers = useAppSelector(selectSearchedPlayers);
    const selectedPlayers = useAppSelector(selectSelectedPlayers);

    const [playerFilter, setPlayerFilter] = useState('');

    const filteredPlayers = searchedPlayers.filter(({name}) => name.includes(playerFilter));

    const splittedPlayers = splitPlayerList(filteredPlayers);

    const isSelected = (id: number) => selectedPlayers.find((e) => e.id === id) !== undefined;

    return (
        <div>
            <div className='player-list'>
                <div className="form__group">
                    <input className="form__input" id="name" placeholder="Search player..."
                           onChange={(e) => setPlayerFilter(e.target.value)}/>
                </div>
                <div className='player-divider'>Coachs</div>
                {splittedPlayers.coachs.map((player) => <PlayerCard player={player}
                                                                    key={player.id}
                                                                    canAddToTeam={!isSelected(player.id)}/>)}
                {splittedPlayers.coachs.length === 0 &&
                <div className='player-data__row'>There are no coachs available for your search</div>}
                <div className='player-divider'>Goalkeepers</div>
                {splittedPlayers.goalkeepers.map((player) => <PlayerCard player={player}
                                                                         key={player.id}
                                                                         canAddToTeam={!isSelected(player.id)}/>)}
                {splittedPlayers.goalkeepers.length === 0 &&
                <div className='player-data__row'>There are no goalkeepers available for your search</div>}
                <div className='player-divider'>Defenders</div>
                {splittedPlayers.defenders.map((player) => <PlayerCard player={player}
                                                                       key={player.id}
                                                                       canAddToTeam={!isSelected(player.id)}/>)}
                {splittedPlayers.defenders.length === 0 &&
                <div className='player-data__row'>There are no defenders available for your search</div>}
                <div className='player-divider'>Midfielders</div>
                {splittedPlayers.midfielders.map((player) => <PlayerCard player={player}
                                                                         key={player.id}
                                                                         canAddToTeam={!isSelected(player.id)}/>)}
                {splittedPlayers.midfielders.length === 0 &&
                <div className='player-data__row'>There are no midfielders available for your search</div>}
                <div className='player-divider'>Attackers</div>
                {splittedPlayers.attackers.map((player) => <PlayerCard player={player}
                                                                       key={player.id}
                                                                       canAddToTeam={!isSelected(player.id)}/>)}
                {splittedPlayers.attackers.length === 0 &&
                <div className='player-data__row'>There are no attackers available for your search</div>}
            </div>
        </div>
    );
}

export default PlayerSearch;
