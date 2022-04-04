import {Controller, Get, Param} from '@nestjs/common';
import {PositionService} from "./position.service";
import {PositionResolver} from "./position.resolver";
import {Position} from "./position.model";

@Controller('position')
export class PositionController {

    constructor(
        private readonly positionService: PositionService,
        private readonly positionResolver: PositionResolver
    ) {
    }

    @Get('/scrape')
    async scrapeData(): Promise<Position[]> {
        const positions =  await this.positionService.scrapeSpotifyData();
        return await this.positionService.addPositions(positions);
    }

    @Get()
    async getAllPositions(): Promise<Position[]> {
        return await this.positionResolver.getAllPositions();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Position> {
        return await this.positionResolver.getPositionById(id);
    }
}
