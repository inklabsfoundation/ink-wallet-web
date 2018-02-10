"use strict";
const axios = require("axios");
const _ = require("lodash");
const Boom = require("Boom");
const config = require("electrode-confippet").config;
const CacheStorage = require("./cache-storage");
const moment = require("moment");

const NEWS_KEY = "NEWS";

exports.register = (server, options, next) => {
  const getNews = async (reply) => {
    try {
      let news = CacheStorage.get(NEWS_KEY);
      if (news) {
        reply(news);
        return;
      }
      const rawNews = await axios(config.settings.sourceNewsUrl);
      news = _.sortBy(rawNews.data.map((newsItem) => {
        return {
          title: newsItem.title,
          date: moment(newsItem.news_date, "YYYY-MM-DD").unix(),
          link: newsItem.news_link
        };
      }), "date").reverse();
      CacheStorage.put(NEWS_KEY, news);
      reply(news);
    } catch (e) {
      reply().code(500);
    }
  };

  server.route({
    method: "GET",
    path: config.settings.newsUrl,
    handler: (request, reply) => Promise.resolve(getNews(reply))
  });

  next();
};

exports.register.attributes = {
  name: "news",
  version: "1.0.0"
};
