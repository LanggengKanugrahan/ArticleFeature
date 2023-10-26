const pg = require("../config/db");

const getArticle = () => {
  return new Promise((resolve, reject) => {
    pg.query("SELECT * FROM article;", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getArticleById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT * FROM article WHERE article.id=${id}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const postArticle = async (data) => {
  const { article_name, article_detail, article_photo } = data;
  return new Promise((resolve, reject) =>
    pg.query(
      `INSERT INTO article (article_name, article_detail, article_photo) VALUES('${article_name}','${article_detail}', '${article_photo}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );
};

const putArticle = async (id, data) => {
  const {
    article_name,
    article_detail,
    article_photo,
  } = data;
  return new Promise((resolve, reject) =>
    pg.query(
      `UPDATE article SET article_name='${article_name}', article_detail='${article_detail}', article_photo='${article_photo}' WHERE article.id=${id}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );
};

const deleteArticleById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`DELETE FROM article WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getArticle, getArticleById, postArticle, putArticle, deleteArticleById };
