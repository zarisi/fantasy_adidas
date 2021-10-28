import React from "react";
import {Player} from "../../types/player";
import {useAppDispatch} from "../../utils/hooks/hooks";
import {addPlayer, removePlayer} from "../../store/teams-slice";

export function PlayerCard({player, canAddToTeam = false, canRemoveFromTeam = false}: PlayerCardProps) {

    const dispatch = useAppDispatch();

    const addPlayerToStore = () => {
        dispatch(addPlayer(player.id))
    }

    const removePlayerToStore = () => {
        dispatch(removePlayer(player.id))
    }

    const birthDate = new Date(player.dateOfBirth);

    const birthDateString = birthDate.getUTCDate() + "/" + (birthDate.getUTCMonth() + 1) + "/" + birthDate.getUTCFullYear();

    return (
        <div className='player-data'>
            <div className='player-data__row'>
                <span className='player-data__name'>{player.name}</span>
                <span>{player.team}</span>
            </div>
            <div className='player-data__row'>
                <small>{birthDateString}</small>
                {canAddToTeam &&
                <button className='player-data__button' onClick={addPlayerToStore}>Add player to your team</button>}
                {canRemoveFromTeam &&
                <button className='player-data__button' onClick={removePlayerToStore}>Remove player from your
                    team</button>}
            </div>
        </div>
    );
}

type PlayerCardProps = {
    player: Player,
    canAddToTeam?: boolean,
    canRemoveFromTeam?: boolean,
}

export default PlayerCard;
