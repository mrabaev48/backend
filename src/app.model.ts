import {Model} from "sequelize";

interface SpotifyEntityCreation {
    title: string;
    location: string;
    applyButtonUrl: string;
    description: string;
}

export class SpotifyEntity extends Model<SpotifyEntity, SpotifyEntityCreation>{
    title: string;
    description?: string;
    location: string;
    applyButtonURL: string;
}