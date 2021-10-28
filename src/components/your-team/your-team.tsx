import React from 'react';
import { selectSelectedPlayers} from "../../store/teams-slice";
import {useAppSelector} from "../../utils/hooks/hooks";
import {splitPlayerList} from "../../utils/player-helper";
import {PlayerCard} from "../player-card/player-card";

export function YourTeam() {

    const selectedPlayers = useAppSelector(selectSelectedPlayers);

    const splittedPlayers = splitPlayerList(selectedPlayers);

    return (
        <div className='player-list'>
            <div className='player-divider'>
                <span>Coachs</span>
                <span>{splittedPlayers.coachs.length}/1</span>
            </div>
            {splittedPlayers.coachs.map((player) => <PlayerCard key={player.id} player={player} canRemoveFromTeam={true}/>)}
            {splittedPlayers.coachs.length === 0 && <div className='player-data__row'>No coachs selected</div>}
            <div className='player-divider'>
                <span>Goalkeepers</span>
                <span>{splittedPlayers.goalkeepers.length}/4</span>
            </div>
            {splittedPlayers.goalkeepers.map((player) => <PlayerCard key={player.id} player={player} canRemoveFromTeam={true}/>)}
            {splittedPlayers.goalkeepers.length === 0 &&
            <div className='player-data__row'>No goalkeepers selected</div>}
            <div className='player-divider'>Defenders
                <span>Coachs</span>
                <span>{splittedPlayers.defenders.length}/4</span>
            </div>
            {splittedPlayers.defenders.map((player) => <PlayerCard key={player.id} player={player} canRemoveFromTeam={true}/>)}
            {splittedPlayers.defenders.length === 0 &&
            <div className='player-data__row'>No defenders selected</div>}
            <div className='player-divider'>
                <span>Midfielders</span>
                <span>{splittedPlayers.midfielders.length}/4</span>
            </div>
            {splittedPlayers.midfielders.map((player) => <PlayerCard key={player.id} player={player} canRemoveFromTeam={true}/>)}
            {splittedPlayers.midfielders.length === 0 &&
            <div className='player-data__row'>No midfielders selected</div>}
            <div className='player-divider'>
                <span>Attackers</span>
                <span>{splittedPlayers.attackers.length}/4</span>
            </div>
            {splittedPlayers.attackers.map((player) => <PlayerCard key={player.id} player={player} canRemoveFromTeam={true}/>)}
            {splittedPlayers.attackers.length === 0 &&
            <div className='player-data__row'>No attackers selected</div>}
        </div>
    );
}
