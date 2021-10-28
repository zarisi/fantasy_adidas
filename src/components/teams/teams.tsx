import React, {useEffect, useState} from 'react';
import {getCurrentWCTeams, getTeams} from "../../utils/api/football";
import {Team} from "../../types/team";
import './teams.css';
import {useHorizontalScroll} from "../../utils/hooks/use-horizontal-scroll";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {
    renewSearchedPlayers,
    selectSelectedTeam,
    selectTeam,
} from "../../store/teams-slice";
import {Player} from "../../types/player";

export function Teams() {

    const dispatch = useAppDispatch();
    const selectedTeam = useAppSelector(selectSelectedTeam);

    const [actualTeams, setTeams] = useState([] as Team[]);

    useEffect(() => {
        getCurrentWCTeams().then((e) => setTeams(e.teams));
    }, []);

    /**
     * Hook to control horizontal Scroll
     */
    const scrollRef = useHorizontalScroll();

    const selectTeamById = (id: number) => {
        getTeams(id).then((e) => {
                dispatch(selectTeam(e))
                //adds the missing variable to the players
                const fixedSquad = e.squad.map((player: Player) => ({...player, team: e.name}))
                dispatch(renewSearchedPlayers(fixedSquad))
            }
        )
    }

    /**
     * Control if a team is selected
     * @param id the id of the team to check
     */
    const isActive = (id: number) => selectedTeam !== undefined && selectedTeam.id === id;

    /**
     * Adds 'active' to the item class if the item is selected
     * @param id the id of the item
     */
    const scrollItemClass = (id: number) => {
        let className = 'scroll-item';
        if (isActive(id)) {
            className += ' active';
        }
        return className;
    }

    return (
        <div ref={scrollRef} className='scroll-menu'>
            {actualTeams.map(({crestUrl, name, tla, id}) =>
                <div className={scrollItemClass(id)} key={id} data-testid={id.toString()} onClick={() => selectTeamById(id)}>
                     <span className='block'>
                        {crestUrl === '' || !crestUrl ?
                            <img src='https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg' alt={name}
                                 height="47px" width="70px"/>
                            :
                            <img src={crestUrl} alt={name} height="47px" width="70px"/>
                        }
                    </span>
                    <span className='block'>
                        {tla}
                    </span>
                </div>
            )}
        </div>
    );
}

export default Teams;
