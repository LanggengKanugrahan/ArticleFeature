const app = require("express")
const router = app.Router()


const article = require('./articleRouter')


router.use('/articles', article)

module.exports = router