import {Player} from "../types/player";

export const isCoach = ({role}: Player) => role === 'COACH';
export const isPlayer = ({role}: Player) => role === 'PLAYER';
export const isGoalkeeper = ({role,position}: Player) => position === 'Goalkeeper' && role === 'PLAYER';
export const isMidfielder = ({role,position}: Player) => position === 'Midfielder' && role === 'PLAYER';
export const isDefender = ({role,position}: Player) => position === 'Defender' && role === 'PLAYER';
export const isAttacker = ({role,position}: Player) => position === 'Attacker' && role === 'PLAYER';
export const splitPlayerList = (playerList: Player[]) => ({
    coachs: playerList.filter(isCoach),
    players: playerList.filter(isPlayer),
    goalkeepers: playerList.filter(isGoalkeeper),
    midfielders: playerList.filter(isMidfielder),
    defenders: playerList.filter(isDefender),
    attackers: playerList.filter(isAttacker),
})
