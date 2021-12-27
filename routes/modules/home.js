const express = require('express')
const router = express.Router()
const URL = require("./models/URL")
const shortenURL = require("./utils/shortenURL")


router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  //沒輸入網址則不動作
  if (!req.body.url) return res.redirect('/')

  //產生五碼亂數字元
  const shortURL = generateURL(5)
  //輸入網址是否已存在 回傳第一個符合條件的結果
  URL.findOne({ originalURL: req.body.url })
    .then(data =>
      data ? data : URL.create({ shortURL, originalURL: req.body.url })
    )
    .then(data =>
      res.render("index", {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(error => console.error(error))
})

//新增縮網址的路由
router.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params

  URL.findOne({ shortURL })
    .then(data => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        })
      }

      res.redirect(data.originalURL)
    })
    .catch(error => console.error(error))
})

module.exports = router