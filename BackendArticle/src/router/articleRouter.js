const app = require("express");
const router = app.Router();
const upload = require("../middleware/uploadFile");
const {
  getData,
  getDataById,
  postData,
  putData,
  deleteDataById,
} = require("../controller/articleController");

router.get("/", getData);
router.get("/:id", getDataById);
router.post("/", upload.single("article_photo"), postData);
router.put("/:id", upload.single("article_photo"), putData);
router.delete("/:id", deleteDataById);

module.exports = router;
