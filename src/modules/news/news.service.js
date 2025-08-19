import { News } from "../../db/models/news.model.js";

export const mostPopular = async () => {
    let articles = [];
    let res = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.NYT_API_KEY}`);
    res = await res.json();
    res = res.results;
    if (!Array.isArray(res)) {
        throw new Error("Unexpected response format from NYT API");
    }
    res.forEach((article) => {
        article = adaptMostPopularArticle(article);
        if (article.coverImg) {
            articles.push(article);
        }
    });
    return articles;
};

export const searchNews = async (query) => {
    let articles = [];
    let res = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.NYT_API_KEY}`
    );
    res = await res.json();
    res = res.response.docs;
    res.forEach((article) => {
        article = adaptSearchedArticle(article);
        articles.push(article);
    });
    return articles;
};

export const favoriteArticle = async (userId, title, coverImg, author, abstract, url, source) => {
    if ((!userId || !title || !coverImg || !author || !abstract || !url || !source)) {
        throw new Error("Article data is required");
    }
    const article = await News.create({ userId, title, coverImg, author, abstract, url, source });
    return article;
};

export const favorites = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const articles = await News.find({ userId });
    return articles;
}

const adaptSearchedArticle = (article) => {
    return {
        title: article.headline.main,
        coverImg: article.multimedia.default.url,
        author: article.byline ? article.byline.original : "Unknown",
        abstract: article.abstract,
        url: article.web_url,
        source: article.source,
    };
};

const adaptMostPopularArticle = (article) => {
    let coverImg = null;
    if (
        article.media &&
        article.media.length > 0 &&
        article.media[0]["media-metadata"] &&
        article.media[0]["media-metadata"].length > 0
    ) {
        coverImg = article.media[0]["media-metadata"][0].url;
    }
    return {
        title: article.title,
        coverImg,
        author: article.byline || "Unknown",
        abstract: article.abstract,
        url: article.url,
        source: article.source,
    };
};
