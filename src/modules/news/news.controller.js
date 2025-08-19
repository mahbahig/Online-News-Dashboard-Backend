import * as NS from "./news.service.js";

export const mostPopular = async (req, res, next) => {
    const articles = await NS.mostPopular();
    res.status(200).json({ message: "Success", data: articles });
};

export const searchNews = async (req, res, next) => {
    const { search } = req.query;
    const articles = await NS.searchNews(search);
    res.status(200).json({ message: "Success", data: articles });
};

export const favoriteArticle = async (req, res, next) => {
    const { userId, title, coverImg, author, abstract, url, source } = req.body;
    const article = await NS.favoriteArticle(userId, title, coverImg, author, abstract, url, source);
    res.status(200).json({ message: "Success", data: article });
}