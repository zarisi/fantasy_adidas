export type Player = {
    id: number;
    name: string;
    position?: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker';
    dateOfBirth: string;
    role: 'COACH' | 'PLAYER';
    team?: string;
}
