import {Args, Query, Resolver} from "@nestjs/graphql";
import {Position} from "./position.model";
import {PositionService} from "./position.service";
import {NotFoundException} from "@nestjs/common";

@Resolver(of => Position)
export class PositionResolver {
    constructor(private readonly positionService: PositionService) {}

    @Query(of => Position)
    async getPositionById(@Args('id') id: number): Promise<Position> {
        const position = await this.positionService.getById(id);

        if (!position) {
            throw new NotFoundException();
        }

        return position;
    }

    @Query(of => [Position])
    async getAllPositions(): Promise<Position[]> {
        return await this.positionService.getAllPositions();
    }
}