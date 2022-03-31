import { IScraper } from './IScraper';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { Position } from '../../position/position.model';

export class SpotifyScraper implements IScraper<Promise<Position[]>> {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async scrape(): Promise<Position[]> {
    return await this.getPosts();
  }

  private static scrapeMainPage(
    cheerioElem: cheerio.Element,
    $: cheerio.CheerioAPI,
  ) {
    const applyButtonURL = $('.posting-btn-submit', cheerioElem).attr('href');
    const title = $('h5', cheerioElem).text();
    const location = $('.sort-by-location', cheerioElem).text();
    return {
      applyButtonURL,
      title,
      location,
    } as Position;
  }

  private async getPosts(): Promise<Position[]> {
    const promisesToResolve: Array<Promise<Position>> = [];
    try {
      const response = await axios.get(this.url);
      const $ = cheerio.load(response.data);
      const postElems = $('.posting').toArray();
      postElems.forEach((post) => {
        const entity = SpotifyScraper.scrapeMainPage(post, $);
        promisesToResolve.push(SpotifyScraper.getPostDescription(entity));
      });
    } catch (error) {
      console.log(error);
    }
    return await Promise.all(promisesToResolve);
  }

  private static async getPostDescription(entity: Position): Promise<Position> {
    try {
      const response = await axios.get(entity.applyButtonURL);
      const $ = cheerio.load(response.data);
      const scriptBody = $('script[type="application/ld+json"]').html();
      entity.description = JSON.parse(scriptBody)['description'];
    } catch (error) {
      console.log(error);
    }

    return entity;
  }
}
