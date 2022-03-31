export interface IScraper<T> {
    url: string;
    scrape(): T;
}