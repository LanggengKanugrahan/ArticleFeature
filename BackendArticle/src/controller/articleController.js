const {
  getArticle,
  getArticleById,
  postArticle,
  putArticle,
  deleteArticleById
} = require("../model/articleModel");

const cloudinary = require("../config/photo");

const articleController = {
  getData: async (req, res, next) => {
    let dataArticle = await getArticle();

    if (!dataArticle.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data article data not found",
        data: [],
      });
    }
    if (dataArticle) {
      res.status(200).json({
        status: 200,
        message: "get data article success",
        data: dataArticle.rows,
      });
    }
  },
  getDataById: async (req, res, next) => {
    const { id } = req.params;

    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
    }
    let dataArticleId = await getArticleById(parseInt(id));

    if (!dataArticleId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data article data not found",
        data: [],
      });
    }
    if (dataArticleId) {
      res.status(200).json({
        status: 200,
        message: "get data article success",
        data: dataArticleId.rows,
      });
    }
  },
  postData: async (req, res, next) => {
    const { article_name, article_detail, article_photo } = req.body;

    if (!req.isFileValid) {
      return res.status(404).json({ message: req.isFileValidMessage });
    }

    const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "be-project",
    });

    if (!ImageCloud) {
      return res.status(404).json({ message: "upload photo fail" });
    }

    if (!article_name || !article_detail) {
      return res.status(404).json({
        message: "input correctly",
      });
    }

    let dataArticle = {
      article_name,
      article_detail,
      article_photo: ImageCloud.secure_url,
    };

    let data = await postArticle(dataArticle);

    return res
      .status(200)
      .json({ status: 200, message: "data article success", data });
  },
  putData: async (req, res, next) => {
    const { id } = req.params;
    const { article_name, article_detail, article_photo } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataArticleId = await getArticleById(parseInt(id));

    if (!dataArticleId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data article data not found",
        data: [],
      });
    }

    if (!req.file) {
      let data = {
        article_name: article_name || dataArticleId.rows[0].article_name,
        article_detail: article_detail || dataArticleId.rows[0].article_detail,
        article_photo: dataArticleId.rows[0].article_photo,
      };

      let result = await putArticle(parseInt(id), data);
      let after = await getArticleById(parseInt(id));
      return res.status(200).json({
        status: 200,
        message: "update data article success",
        data,
        after: after.rows[0],
      });
    } else {
      if (!req.isFileValid) {
        return res.status(404).json({ message: req.isFileValidMessage });
      }

      const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "be-project",
      });

      if (!ImageCloud) {
        return res.status(404).json({ message: "upload photo fail" });
      }

      let data = {
        article_name: article_name || dataArticleId.rows[0].article_name,
        article_detail: article_detail || dataArticleId.rows[0].article_detail,
        article_photo: ImageCloud.secure_url,
      };

      let result = await putArticle(parseInt(id), data);
      let after = await getArticleById(parseInt(id));
      return res.status(200).json({
        status: 200,
        message: "update data article success",
        data,
        after: after.rows[0],
      });
    }
  },

  deleteDataById: async (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
    }
    let dataArticleId = await getArticleById(parseInt(id));

    if (!dataArticleId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data article data not found",
        data: [],
      });
    }

    let deleteArticleId = await deleteArticleById(parseInt(id));

    if (deleteArticleId) {
      res.status(200).json({
        status: 200,
        message: "delete data article success",
        data: dataArticleId.rows,
        dataDelete: deleteArticleId.rows,
      });
    }
  },
};

module.exports = articleController;
