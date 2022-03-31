import { Injectable } from '@nestjs/common';
import { SpotifyScraper } from './utils/scraper/SpotifyScraper';
import { Position } from './position/position.model';

@Injectable()
export class AppService {
  URL = 'https://jobs.lever.co/spotify/';

  async scrapeSpotifyData(): Promise<Position[]> {
    const scraper = new SpotifyScraper(this.URL);
    return await scraper.scrape();
  }
}
