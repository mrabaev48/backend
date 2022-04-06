import { IScraper } from './IScraper';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { Position } from '../../position.model';
import {DescriptionConstants} from "./DescriptionConstants";

export class SpotifyScraper implements IScraper<Promise<Position[]>> {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async scrape(): Promise<Position[]> {
    return await this.getPosts();
  }

  private scrapeMainData(
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
      description: '',
    } as Position;
  }

  private async getPosts(): Promise<Position[]> {
    const promisesToResolve: Array<Promise<Position>> = [];
    try {
      const response = await axios.get(this.url);
      const $ = cheerio.load(response.data);
      const postElems = $('.posting').toArray();
      postElems.forEach((post) => {
        const entity = this.scrapeMainData(post, $);
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
      const content = $('.content');
      const div = content.children('div').toArray()[1];
      const parts = $(div).children('.page-centered').slice(0, 5);
      const descriptionParts: string[] = [];
      parts.toArray().forEach(part => {
        const isHeadingExists = $('h3', part).toArray().length !== 0;

        if (!isHeadingExists) {
          $('div', part).toArray().forEach(x =>{
            descriptionParts.push($(x).text());
          });

          descriptionParts.push(DescriptionConstants.END_OF_PARAGRAPH);
        } else {
          const subtitle = $('h3', part).text();
          descriptionParts.push(subtitle);
          descriptionParts.push(DescriptionConstants.END_OF_SUBTITLE);
          $('li', part).toArray().forEach(listItem => {
            descriptionParts.push($(listItem).text())
            descriptionParts.push(DescriptionConstants.END_OF_LIST_ITEM);
          });
          descriptionParts.push(DescriptionConstants.END_OF_PARAGRAPH);
        }
      });

      entity.description = descriptionParts.join('\n');

    } catch (error) {
      console.log(error);
    }

    return entity;
  }
}
