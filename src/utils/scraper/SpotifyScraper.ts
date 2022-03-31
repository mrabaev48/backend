import {IScraper} from "./IScraper";
import {SpotifyEntity} from "../../app.model";

import axios from "axios";
import * as cheerio from 'cheerio';

export class SpotifyScraper implements IScraper<Promise<SpotifyEntity[]>> {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async scrape(): Promise<SpotifyEntity[]> {
        return await this.getPosts();
    }

    private static scrapeMainPage(cheerioElem: cheerio.Element, $: cheerio.CheerioAPI) {
        const applyButtonURL = $('.posting-btn-submit', cheerioElem).attr('href');
        const title = $('h5', cheerioElem).text();
        const location = $('.sort-by-location', cheerioElem).text();
        return {
            applyButtonURL,
            title,
            location,
        } as SpotifyEntity;
    }

    private async getPosts(): Promise<SpotifyEntity[]> {
        let promisesToResolve: Array<Promise<SpotifyEntity>> = []
        try {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);
            const postElems = $('.posting').toArray();
            postElems.forEach(post => {
                const entity = SpotifyScraper.scrapeMainPage(post, $);
                promisesToResolve.push(SpotifyScraper.getPostDescription(entity));
            });

        } catch (error) {
            console.log(error)
        }
        return await Promise.all(promisesToResolve);
    }

    private static async getPostDescription(entity: SpotifyEntity): Promise<SpotifyEntity> {
        try {
            const response = await axios.get(entity.applyButtonURL);
            const $ = cheerio.load(response.data);
            const scriptBody = $('script[type="application/ld+json"]').html();
            entity.description = JSON.parse(scriptBody)['description'];
        } catch (error) {
            console.log(error)
        }

        return entity;
    }
}