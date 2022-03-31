import {Injectable} from '@nestjs/common';
import {NestCrawlerService} from "nest-crawler";
import axios from "axios";
import * as cheerio from 'cheerio';
import {SpotifyScraper} from "./utils/scraper/SpotifyScraper";
import {SpotifyEntity} from "./app.model";


interface ISpotifyScrapedEntity {
    title: string;
    description?: string;
    location: string;
    applyButtonURL: string;
}

@Injectable()
export class AppService {
    URL = 'https://jobs.lever.co/spotify/';

    constructor(private readonly crawler: NestCrawlerService) {
    }

    async scrapeSpotifyData(): Promise<SpotifyEntity[]> {
        const scraper = new SpotifyScraper(this.URL);
        return await scraper.scrape();
    }
}
