import { BaseDb } from '../interfaces/base-db.js';
import { BaseLoader } from '../interfaces/base-loader.js';
import { LLMApplication } from './llm-application.js';
import { BaseCache } from '../interfaces/base-cache.js';

export class LLMApplicationBuilder {
    private searchResultCount: number;
    private loaders: BaseLoader[];
    private vectorDb: BaseDb;
    private temperature: number;
    private queryTemplate: string;
    private cache?: BaseCache;

    constructor() {
        this.loaders = [];
        this.temperature = 0.9;
        this.searchResultCount = 7;

        this.queryTemplate = `Use all the provided context to answer the query at the end. Answer in full.
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        Query: {0}`;
    }

    async build() {
        const entity = new LLMApplication(this);
        await entity.init();
        return entity;
    }

    addLoader(loader: BaseLoader) {
        this.loaders.push(loader);
        return this;
    }

    setSearchResultCount(searchResultCount: number) {
        this.searchResultCount = searchResultCount;
        return this;
    }

    setVectorDb(vectorDb: BaseDb) {
        this.vectorDb = vectorDb;
        return this;
    }

    setTemperature(temperature: number) {
        this.temperature = temperature;
        return this;
    }

    setQueryTemplate(queryTemplate: string) {
        if (!queryTemplate.includes('{0}'))
            throw new Error('queryTemplate must include a placeholder for the query using {0}');

        this.queryTemplate = queryTemplate;
        return this;
    }

    setCache(cache: BaseCache) {
        this.cache = cache;
        return this;
    }

    getLoaders() {
        return this.loaders;
    }

    getSearchResultCount() {
        return this.searchResultCount;
    }

    getVectorDb() {
        return this.vectorDb;
    }

    getTemperature() {
        return this.temperature;
    }

    getQueryTemplate() {
        return this.queryTemplate;
    }

    getCache() {
        return this.cache;
    }
}