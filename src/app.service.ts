import {Injectable} from '@nestjs/common';
import {SpotifyScraper} from "./utils/scraper/SpotifyScraper";
import {SpotifyEntity} from "./app.model";

@Injectable()
export class AppService {
    URL = 'https://jobs.lever.co/spotify/';

    async scrapeSpotifyData(): Promise<SpotifyEntity[]> {
        const scraper = new SpotifyScraper(this.URL);
        return await scraper.scrape();
    }
}
