import {Injectable} from '@nestjs/common';
import {Position} from "./position.model";
import {SpotifyScraper} from "./utils/scraper/SpotifyScraper";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class PositionService {
    URL = 'https://jobs.lever.co/spotify/';
    spotifyScraper: SpotifyScraper = null;

    constructor(@InjectModel(Position) private positionRepository: typeof Position) {
        this.spotifyScraper = new SpotifyScraper(this.URL);
    }

    async scrapeSpotifyData(): Promise<Position[]> {
        return await this.spotifyScraper.scrape();
    }

    async addPosition(position: Position): Promise<Position> {
        return await this.positionRepository.create(position);
    }

    async addPositions(positions: Position[]) {
        const resolve = positions.map(position => {
            return this.addPosition(position);
        });
        return await Promise.all(resolve);
    }

    async getById(id: number): Promise<Position> {
        return await this.positionRepository.findByPk(id);
    }

    async getAllPositions(): Promise<Position[]> {
        return await this.positionRepository.findAll();
    }
}
