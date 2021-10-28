import {Player} from "./player";

export type Team = {
    id: number;
    name: string;
    shortName?: string;
    tla?: string;
    crestUrl?: string;
    clubColors?: string;
    squad?: Player[];
}
